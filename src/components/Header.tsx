import React from "react";
import Logo from "../assets/logo.svg";
import Bag from "../assets/bag.svg";

const Header: React.FC = () => {
  return (
    <header>
      <div className="header-wrapper">
        <a href="#">
          <img src={Logo} alt="Logo" />
        </a>
        <a href="#" className="text-[#333333]">
          <img src={Bag} alt="Bag" />
        </a>
      </div>
    </header>
  );
};

export default Header;
