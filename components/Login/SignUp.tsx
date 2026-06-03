import React, { useState, useRef, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import validator from 'validator';
import Loader from '@/components/Loader';
import CryptoJS from 'crypto-js';

const SIGN_ALREADY = ' Error: Email Id Already Exists';
const VALID_PASS = 'Please Enter Valid PASSWORD';
const VALID_EMAIL = 'Please Enter Valid Email';
const VALID_DETAIL = 'Please Enter Valid Details';
const CHECK_TERMS = 'Please Check Terms & Conditions';
const SIGN_SUCCESS_EMAIL = 'Account Created Successfully';
const API_URL = process.env.NEXT_PUBLIC_SD_API;
const ENCT_KEY = process.env.NEXT_PUBLIC_ENC_KEY || '';

const SignUp: React.FC = () => {
    const router = useRouter();
    const [signEmail, setSignEmail] = useState<string>('');
    const [signPassword, setSignPassword] = useState<string>('');
    const [signupError, setSignupError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [error, setError] = useState<boolean | string>('');
    const [signupEmailError, setSignupEmailError] = useState<string | null>(null);
    const [signupCheckError, setSignupCheckError] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [verifyOTPError, setVerifyOTPError] = useState<string | null>(null);
    const [verifyOTPSucess, setVerifyOTPSucess] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState<number>(0);

    // State for show/hide sections (replacing jQuery)
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showOTPSection, setShowOTPSection] = useState<boolean>(false);

    // State for resend cooldown timer
    const [resendCooldown, setResendCooldown] = useState<number>(0);

    // Refs for OTP inputs
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer for resend button
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                setResendCooldown(resendCooldown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const validationEmail = (email: string): boolean => {
        return validator.isEmail(email);
    };

    const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
        if (field === 'password') {
            setPasswordVisible(!passwordVisible);
        } else if (field === 'confirmPassword') {
            setConfirmPasswordVisible(!confirmPasswordVisible);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        !event.target.checked ? setSignupCheckError(CHECK_TERMS) : setSignupCheckError('');
    };

    const signUpWithGoogle = async () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('sign_status', 'signup');
        }
        signIn('google', { callbackUrl: '/success' });
    };

    const getOTPValue = (): number => {
        let inputCode = '';
        otpInputRefs.current.forEach((input) => {
            if (input) {
                inputCode += input.value;
            }
        });
        return parseInt(inputCode) || 0;
    };

    const handleSignUp = async (e: React.MouseEvent<HTMLInputElement>) => {
        setShowLoader(true);
        e.preventDefault();
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;

        const inputCode = getOTPValue();

        if (inputCode === verificationCode) {
            setVerifyOTPError(null);
            setVerifyOTPSucess('Code verified successfully.');
        } else {
            setVerifyOTPSucess(null);
            setVerifyOTPError('Invalid code, Please try again!');
            setShowLoader(false);
            return false;
        }

        if (signEmail !== '' && signPassword !== '' && reg.test(signPassword) === true && validationEmail(signEmail) === true) {
            setSignupError('');
            setSignupEmailError(null);
            const signup_url = API_URL + '/login/signup.php';
            const response = await axios.get(signup_url, {
                params: {
                    auth: window.btoa(signEmail),
                    t: window.btoa(signPassword),
                    p: window.btoa(''),
                },
            });
            const myObject = response.data;

            if (myObject['user_error'] === 1) {
                setSuccess(null);
                setError(true);
                setSignupError(SIGN_ALREADY);
                setShowLoader(false);
            } else {
                setVerifyOTPSucess(SIGN_SUCCESS_EMAIL);
                setError(false);
                setSignupError(' ');
                setSignPassword('');
                setConfirmPassword(null);

                const userEmail = signEmail;
                if (typeof window !== 'undefined') {
                    // setSuccess(true);
                    setError(false);
                    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userEmail), ENCT_KEY).toString();
                    localStorage.setItem('enc_email', encryptedUser);
                    localStorage.setItem('email', userEmail);

                    setInterval(() => {
                        alert('Session Time Out!');
                        localStorage.clear();
                        location.reload();
                        router.push('/');
                    }, 86400000);

                    setTimeout(() => {
                        router.push('/profile');
                        setSuccess(null);
                        setError('');
                        setShowLoader(false);
                    }, 1000);
                }
            }
        } else {
            setShowLoader(false);
            setSuccess(null);
            setError(true);
            setSignupError(VALID_DETAIL);
            setSignEmail('');
            setSignPassword('');
            setConfirmPassword(null);
        }
    };

    const SendEmailToCustomer = async (email: string, otp: number): Promise<any> => {
        const encryptedCode = btoa(otp.toString());
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_SD_API + '/SD_PRO/otp.php?email_id=' + email + '&otp=' + encryptedCode + '&nomrmaluser=true'
            );
            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const pVerifyEmail = async (e: React.MouseEvent<HTMLInputElement | HTMLButtonElement>) => {
        setShowLoader(true);
        e.preventDefault();

        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;

        if (validationEmail(signEmail) === false) {
            setSignupEmailError(VALID_EMAIL);
            setShowLoader(false);
            return false;
        } else {
            setSignupEmailError(null);
        }

        if (reg.test(signPassword) === false) {
            setSignupError(VALID_PASS);
            setShowLoader(false);
            return false;
        } else {
            setSignupError('');
        }

        if (reg.test(signPassword) === false || validationEmail(signEmail) === false) {
            setSignupEmailError('Please enter valid password');
            return false;
        }

        if (confirmPassword !== signPassword) {
            setSignupEmailError("Passwords didn't match");
            setShowLoader(false);
            return false;
        }

        const code = Math.floor(100000 + Math.random() * 900000);
        setVerificationCode(code);
        setShowLoader(false);
        setVerifyOTPError(null);
        setVerifyOTPSucess(null);

        const res = await SendEmailToCustomer(signEmail, code);

        if (res.registered === 'true') {
            setSignupEmailError(SIGN_ALREADY);
            setTimeout(() => {
                router.reload();
            }, 3000);
            return false;
        } else if (res.status === 200) {
            setShowOTPSection(true);
            setVerifyOTPSucess(res.message);
            setResendCooldown(30); // Start 30 second cooldown
            return true;
        }
    };

    // Handle OTP input auto-focus to next field
    const handleOTPInput = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length === 1 && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace in OTP inputs
    const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && index > 0 && !e.currentTarget.value) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <>

            {success && <div className="successmsg">{success}</div>}
            {signupEmailError && (
                <div className="validations">
                    <div className="errormsg">{signupEmailError}</div>
                </div>
            )}
            {error === true && <div className="errormsg">{signupError}</div>}
            {signupCheckError && (
                <div className="validations">
                    <div className="errormsg">{signupCheckError}</div>
                </div>
            )}

            {/* Sign Up Form Section */}
            <div className={`signing_inbox ${showOTPSection ? 'hidden' : ''}`}>
                <div className="googlesignin">
                    <span onClick={signUpWithGoogle}>Sign Up with Google</span>
                    <div className="ormaillogin greytxt">
                        <span>
                            <small>or Sign Up with Email</small>
                        </span>
                    </div>
                </div>
                <div className="fieldbox">
                    <label>
                        <strong>Email</strong>
                        <sup>*</sup>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={signEmail}
                        onChange={(e) => setSignEmail(e.target.value)}
                    />
                </div>
                <div className="fieldbox">
                    <label>
                        <strong>Choose Password</strong>
                        <sup>*</sup>
                    </label>
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Enter Password"
                        required
                        onChange={(e) => setSignPassword(e.target.value)}
                        className="passinfoinput smallinput"
                    />
                    <i
                        className={passwordVisible ? 'eyeico fas fa-eye' : 'eyeico fas fa-eye-slash'}
                        onClick={() => togglePasswordVisibility('password')}
                    ></i>
                </div>
                <p className="passinstruction greytxt">
                    <small>Must contain at least 8 characters including 1 number, 1 capital letter and 1 special character.</small>
                </p>
                <div className="fieldbox">
                    <input
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="passinfoinput smallinput"
                    />
                    <i
                        className={confirmPasswordVisible ? 'eyeico fas fa-eye' : 'eyeico fas fa-eye-slash'}
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                    ></i>
                </div>
                <div className="fieldbox df just-between checklink">
                    <div className="checklinkitem">
                        <input
                            style={{ display: 'none' }}
                            type="checkbox"
                            name="term"
                            id="termCheck"
                            value="yes"
                            defaultChecked={true}
                            onChange={handleChange}
                        />
                        <label htmlFor="termCheck">
                            <span>
                                I agree to the{' '}
                                <Link href="/terms-use" target="_blank">
                                    Terms & Conditions.
                                </Link>
                            </span>
                        </label>
                    </div>
                </div>
                <div>
                    <span className={`${showLoader ? '' : 'hidden'}`}>Loading ...</span>
                    <input type="submit" value="continue" onClick={pVerifyEmail} className="uppercase" />
                </div>
            </div>

            {/* OTP Verification Section */}
            <div className={`optsigninbox ${showOTPSection ? '' : 'hidden'}`}>
                <h3>Verify Your Contact Information</h3>
                <p>
                    Please Check Your Inbox. We Have Sent a 6-Digit Code to <br />
                    <strong>{signEmail}</strong>
                </p>
                <h5>
                    <strong>Enter 6-Digit Code</strong>
                </h5>
                <div id="otpinputs" className="otpinputs df fww">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                            key={index}
                            ref={(el) => { otpInputRefs.current[index] = el; }}
                            className="otpinputsbox"
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            onChange={(e) => handleOTPInput(index, e)}
                            onKeyDown={(e) => handleOTPKeyDown(index, e)}
                        />
                    ))}
                </div>
                {verifyOTPSucess && <div className="successmsg">{verifyOTPSucess}</div>}
                {verifyOTPError && <div className="errormsg">{verifyOTPError}</div>}
                <input
                    type="submit"
                    value="verify & signup"
                    className="wpcf7-form-control wpcf7-submit loginClick input uppercase otpctasubmit"
                    onClick={handleSignUp}
                />

                <p className="mt-2">
                    Didn't receive a code?
                    <button
                        id="resendOTP"
                        disabled={resendCooldown > 0}
                        className={`inline-block ml-2 ${resendCooldown > 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer text-blue opacity-50 hover:opacity-100'}`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (resendCooldown === 0) {
                                pVerifyEmail(e);
                            }
                        }}
                    >
                        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Send New Code'}
                    </button>
                </p>
            </div>

            {/* Loader */}
            <div className={`signup-loader ${showLoader ? '' : 'hidden'}`}>
                <Loader />
            </div>

            <p className="noregister">
                Already have an account? <span className="accountsigning">Sign In</span>
            </p>
        </>
    );
};

export default SignUp;

