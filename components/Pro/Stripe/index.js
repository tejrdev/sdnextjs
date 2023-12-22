// Create customer in stripe
export const createCustomer = async (signEmail) => {
  const res = await fetch('/api/stripe/create-customer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: signEmail }),
  });

  const response = await res.json();
  return response;
};

//create Setup Intent
export const createSetUpIntent = async (stripeCustomer) => {
  // Create the SetupIntent and obtain clientSecret
  const res = await fetch('/api/stripe/create-setup-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer: stripeCustomer }),
  });

  const response = await res.json();
  return response;
};

const StripeEvents = () => {
  return <div>StripeEvents</div>;
};

export default StripeEvents;
