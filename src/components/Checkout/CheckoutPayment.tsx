import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { IOrderForm } from "../../pages/Checkout";
import Spinner from "../items/Spinner";
import CheckoutForm from "./CheckoutForm";

type Props = {
  checkoutPrice: number;
  orderForm: IOrderForm;
};

function CheckoutPayment({ checkoutPrice, orderForm }: Props) {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://qoorchaq-server.vercel.app/config").then(async r => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("https://qoorchaq-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fee: checkoutPrice,
        customerEmail: orderForm.email,
        customerName: orderForm.firstName + orderForm.lastName,
      }),
    })
      .then(async r => {
        const { clientSecret } = await r.json();
        setClientSecret(clientSecret);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <>
      {loading && <Spinner />}
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
