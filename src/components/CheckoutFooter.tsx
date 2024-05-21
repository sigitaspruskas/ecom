import React from "react";

import FooterA from "../assets/footer_1.svg";
import FooterB from "../assets/footer_2.svg";
import FooterC from "../assets/footer_3.svg";

const CheckoutFooter: React.FC = () => {
  return (
    <footer>
      <div className="footer-title-wrapper">
        <div className="footer-title">Why Choose LogoIpsum</div>
      </div>
      <div className="footer-item">
        <img src={FooterA} alt="Footer Icon" />
        <div className="footer-description">
          <div className="item-title">90-Day Money Back Guarantee</div>
          <div className="item-text">
            We love our products and we're confident you will too! If you're not
            in love with your LogoIpsum product, our easy return and refund
            policy is designed to make things as easy as possible for you.
          </div>
        </div>
      </div>
      <div className="footer-item">
        <img src={FooterB} alt="Footer Icon" />
        <div className="footer-description">
          <div className="item-title">Over 75,000+ Happy Customer</div>
          <div className="item-text">
            Everyone that tries LogoIpsum says it’s a must-have. We invest a lot
            of love and care into making our products, so you can enjoy seeing
            results when using it.
          </div>
        </div>
      </div>
      <div className="footer-item">
        <img src={FooterC} alt="Footer Icon" />
        <div className="footer-description">
          <div className="item-title">Professional Customer Support</div>
          <div className="item-text">
            Our customer service works 24/7 for your satisfaction. Feel free to
            reach out to us anytime.
          </div>{" "}
        </div>
      </div>
    </footer>
  );
};

export default CheckoutFooter;
