import React, { useState } from "react";
import { useCheckout } from "../contexts/CheckoutContext";
import ArrowSvg from "../assets/Arrow.svg";
import Product from "../assets/product_min.svg";

interface CheckoutCartSummaryProps {
  quantity?: string;
  totalSum?: string;
}

const Summary: React.FC = () => {
  const { checkoutData } = useCheckout();

  return (
    <>
      <div className="row item-rows">
        <div className="product">
          <div className="image">
            <img src={Product} alt="Product" />
            <div className="top-quantity">{checkoutData.quantity}</div>
          </div>
        </div>
        <div className="title">LogoIpsum IPL + Warranty</div>
        <div className="sum">${checkoutData.total}</div>
      </div>

      <div className="row subtotal">
        <span>Subtotal</span>
        <span>${checkoutData.total}</span>
      </div>

      <div className="row total">
        <span>Total</span>
        <span>${checkoutData.total}</span>
      </div>
    </>
  );
};

const CheckoutCartSummary: React.FC<CheckoutCartSummaryProps> = () => {
  const { checkoutData } = useCheckout();
  const [showItemRows, setShowItemRows] = useState(false);

  const toggleItemRows = () => {
    setShowItemRows(!showItemRows);
  };

  return (
    <div className={`order-review ${showItemRows ? "" : "no-padding"}`}>
      <div className="row overview" onClick={toggleItemRows}>
        <div className="flex">
          <span className="mr-2">Order overwiev</span>
          <img
            src={ArrowSvg}
            alt="Arrow"
            className={showItemRows ? "" : "rotate"}
          />
        </div>
        <span>${checkoutData.total}</span>
      </div>
      <div className="order-review-mobile">{showItemRows && <Summary />}</div>
      <div className="order-review-desktop">
        <Summary />
      </div>
    </div>
  );
};

export default CheckoutCartSummary;
