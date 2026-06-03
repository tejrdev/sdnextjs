// API endpoint to verify reCAPTCHA token with Google
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'reCAPTCHA token is required' });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return res.status(500).json({ 
      success: false, 
      message: 'reCAPTCHA secret key is not configured' 
    });
  }

  try {
    // Verify the token with Google's reCAPTCHA API
    const verificationResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      }),
    });

    const verificationResult = await verificationResponse.json();

    if (verificationResult.success) {
      // Optional: Check score for reCAPTCHA v3 (if using v3)
      // For reCAPTCHA v2, success is sufficient
      return res.status(200).json({ 
        success: true, 
        message: 'reCAPTCHA verification successful',
        score: verificationResult.score, // For v3
        action: verificationResult.action // For v3
      });
    } else {
      console.error('reCAPTCHA verification failed:', verificationResult['error-codes']);
      return res.status(400).json({ 
        success: false, 
        message: 'reCAPTCHA verification failed',
        errors: verificationResult['error-codes']
      });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error during reCAPTCHA verification' 
    });
  }
}
