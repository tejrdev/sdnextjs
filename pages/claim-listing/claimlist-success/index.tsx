import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import look from './claimsuccess.module.scss';

const ClaimListSuccess = () => {
    const router = useRouter();
    const [ListingUrl, setListingUrl] = useState<string>('');

    useEffect(() => {
        if (router && !router.isReady) {
            return;
        }
        const { listingUrl } = router.query;
        if (listingUrl && typeof listingUrl === 'string') {
            setListingUrl(listingUrl.replace('' + process.env.NEXT_PUBLIC_FRONTEND_URL, window.location.origin));
        }
    }, [router.query, router.isReady]);

    return (
        <section className={look.claimsuccess + ' secspace text-center'}>
            <div className='container'>
                <div className={look.claimthanks + ' claimthanks'}>
                    <h1>Thank You for Submitting Your Claim</h1>
                    <p>Your claim is being reviewed. You will receive an email with the status of this review.</p>
                    <Link type='submit' className={look.nexbtn + ' btn uppercase'} href={ListingUrl}>
                        Go to Listing
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ClaimListSuccess;

