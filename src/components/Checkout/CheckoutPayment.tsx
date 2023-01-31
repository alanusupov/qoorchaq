import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

type Props = {
  checkoutPrice: number;
};

function CheckoutPayment({ checkoutPrice }: Props) {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  useEffect(() => {
    fetch("/config").then(async r => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ fee: checkoutPrice }),
    }).then(async r => {
      const { clientSecret } = await r.json();
      setClientSecret(clientSecret);
    });
  }, []);
  return (
    <>
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret as string }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default CheckoutPayment;
