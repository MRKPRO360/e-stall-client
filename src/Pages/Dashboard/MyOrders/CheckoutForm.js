import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function CheckoutForm({ booking }) {
  const { _id, price, purchaserName, email, productId } = booking;

  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch("https://e-stall-server-mrkpro360.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error(err));
  }, [price]);

  const handleSubmit = async function (e) {
    e.preventDefault();
    setSuccess("");
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: purchaserName,
            email: email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        email,
        transactionId: paymentIntent.id,
        bookingId: _id,
        productId,
      };

      fetch("https://e-stall-server-mrkpro360.vercel.app/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("eStore-token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("Congrats! Your payment is completed");
            setTransactionId(paymentIntent.id);
          }
        });
    }
  };

  return (
    <div className="p-8 bg-white rounded">
      <form>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#42770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        <div className="flex items-center gap-4 mt-8">
          <h3 className="text-lg font-semibold">
            Your service charge will be ${price}
          </h3>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn-sm btn-process"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}

      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p>
            Your transactionId:{" "}
            <span className="font-bold">{transactionId}</span>{" "}
          </p>
        </div>
      )}
    </div>
  );
}
