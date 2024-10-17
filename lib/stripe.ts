import Stripe from "stripe";

// Function to create a new Stripe instance
const stripeClientSingleton = () => {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20", // Use the appropriate API version
  });
};

// Extend the global object to include the Stripe instance
declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var stripeGlobal: Stripe | undefined;
}

// Assign the Stripe instance to a global variable if not already set
const stripe =
  global.stripeGlobal || stripeClientSingleton();

// In development, prevent creating multiple instances due to hot-reloading
if (process.env.NODE_ENV !== "production") {
  global.stripeGlobal = stripe;
}

export default stripe;
