import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./payment.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51PKtxvAn8WFfCvKdvRChzrF0WzcaQLzp1eXDx1Lu0t6wk4TRwstyFULvtEJ3FznB3ojOEwssOVNmIy7pDvmIagXL00cP0CGRWM"
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getPrice: string | null = localStorage.getItem("price");
    const priceString = getPrice ?? "0"; // Provide a default value if getPrice is null
    const convertStringToNumber = JSON.parse(priceString);
    const price = parseInt(convertStringToNumber);
    console.log(price);
    // Create PaymentIntent as soon as the page loads
    if (price) {
      fetch("http://localhost:500/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: price }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
