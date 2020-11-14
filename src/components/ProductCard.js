/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Nov 15 2020 01:55:07 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import { useState, useRef, useEffect } from "react";
import { loadScript } from "../utils";

export const ProductCard = ({ product }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  let paypalRef = useRef();

  useEffect(() => {
    // load razorpay checkout script
    loadScript(
      `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_SB_CLIENT_ID}`
    )
      .then((res) => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.description,
                    amount: {
                      currency_code: "USD",
                      value: product.price,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaidFor(true);
              // call backend
              console.log(order);
            },
            onError: (err) => {
              setError(err);
              console.error(err);
            },
          })
          .render(paypalRef.current);
      })
      .catch((err) => console.log(err));
  }, [product.description, product.price]);

  if (error) return <div>Uh oh, an error occurred! {error.message}</div>;

  return (
    <div>
      {paidFor ? (
        <>
          <h1>Congrats, you just bought {product.name}!</h1>
          <img alt={product.description} src={product.image} />
        </>
      ) : (
        <>
          <h1>
            {product.description} for ${product.price}
          </h1>

          <img
            src={product.image}
            alt={product.description}
            width="200"
            height="200"
          />
          <div ref={paypalRef}></div>
        </>
      )}
    </div>
  );
};
