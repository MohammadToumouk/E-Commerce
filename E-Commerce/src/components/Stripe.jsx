import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useState } from "react";
import { Elements, CardElement } from '@stripe/react-stripe-js'; 
import axios from "axios";

const stripePromise = loadStripe('pk_test_51N2Y22KydIDbyPlEkUYJimKUkEtYf7AJD0ef5XZ5JPRbdJjsrFnKTcgDK0rw3yIT2LJK4LnLzhNXz6NF9VNwGyTn00GEMHCqtJ');
const secretkey = "sk_test_51N2Y22KydIDbyPlEtk5uN1TDRkv0gMH3o7RiafTXgF2YoUWZUzkp01HhHb6SjTb4qWa77iukwfyMKleYcdDV84xw00TBDzokiB";

export const Stripe = () => {
  const [paymentAmount, setPaymentAmount] = useState(0);

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3069/stripe/checkout/create-checkout-session',
        { amount: paymentAmount },
        {
          headers: {
            'Authorization': `Bearer ${secretkey}`,
            'Content-Type': 'application/json', 
          },
        }
      );

      const data = response.data;

      const stripe = await stripePromise;
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: CardElement, // Use CardElement directly
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else {
        // Payment success logic here
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
        width={"75px"}
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form action="http://localhost:3069/stripe/checkout/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);
    </div>
  );
};

export default Stripe;
