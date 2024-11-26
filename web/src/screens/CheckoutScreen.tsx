import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useLocation } from "react-router";
import { fetchEventOrMembershipCheckoutSecret } from "../api/apiRequests";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);
let bodyData = { priceId: "price_1Pwg1ZP464csY2Up9hCiwrhp" };

function CheckoutScreen({ stripeKey }: { stripeKey?: string }) {
  if (stripeKey) {
    bodyData = { priceId: stripeKey };
  }

  const location = useLocation();
  console.log(bodyData);

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    return await fetchEventOrMembershipCheckoutSecret(bodyData);
  }, []);

  // can be null to options.clientSecret or options.fetchClientSecret if you are performing an initial server-side render or when generating a static site.
  const options = { fetchClientSecret };

  return (
    <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal min-h-screen bg-gradient-to-b">
      <div className="flex flex-col items-center text-center">
        <h1 className="my-12 text-5xl font-bold text-white">Payment</h1>
      </div>
      <div className="item flex justify-center">
        <div className="drop-shadow-all mb-12 flex w-[68rem] items-center justify-center rounded-lg bg-white p-5">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout className="flex flex-grow" />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;
