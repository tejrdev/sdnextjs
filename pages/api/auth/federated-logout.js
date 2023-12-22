// /api/auth/federated-logout
import jwt from 'next-auth/jwt';

const DEFAULT_URL = process.env.NEXT_PUBLIC_LOGIN_URL;
export default async function federatedLogout(req, res) {
  try {
    const token = await jwt.getToken({ req, secret: process.env.SECRET, encryption: true });
    if (!token) {
      console.log('No JWT token found when calling /federated-logout endpoint');
      //return res.redirect(DEFAULT_URL)
    }
    if (!token.idToken) console.log("Without an id_token the user won't be redirected back from the IdP after logout.");

    const endsessionURL = `https://${process.env.PROVIDER_DOMAIN}/connect/endsession`;
    const endsessionParams = new URLSearchParams({
      id_token_hint: token.idToken,
      post_logout_redirect_uri: '/',
    });
    //return res.redirect(`${endsessionURL}?${endsessionParams}`)
  } catch (error) {
    console.log(error);
    res.redirect('/');
    //res.redirect(process.env.NEXT_PUBLIC_PUBLIC_URL)
  }
}
