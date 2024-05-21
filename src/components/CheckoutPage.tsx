import React from "react";
import Header from "./Header";
import CheckoutForm from "./CheckoutForm";
import CheckoutCartSummary from "./CheckoutCartSummary";
import CheckoutFooter from "./CheckoutFooter";
import { CheckoutProvider } from "../contexts/CheckoutContext";

const Checkout: React.FC = () => {
  return (
    <>
      <Header />
      <CheckoutProvider>
        <div className="checkout-page">
          <div className="checkout-form-content">
            <CheckoutForm />
          </div>
          <div className="checkout-cart-summary">
            <CheckoutCartSummary />
          </div>
          <div className="checkout-footer">
            <CheckoutFooter />
          </div>
        </div>
      </CheckoutProvider>
    </>
  );
};

export default Checkout;
