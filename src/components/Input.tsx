import React from "react";
import { Field, ErrorMessage } from "formik";

import Visa from "../assets/visa.svg";
import Mastercard from "../assets/mastercard.svg";
import Amex from "../assets/Amex.svg";
import Diners from "../assets/diners-club.svg";
import Discover from "../assets/discover.svg";

interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  options?: React.ReactNode[];
  disabled?: boolean;
  customLabel?: string;
}

const Input: React.FC<InputProps> = ({
  label = "",
  name,
  placeholder,
  type = "text",
  options,
  disabled,
  customLabel = "",
}) => {
  return (
    <>
      <div
        className={`input-wrapper ${name} ${
          customLabel ? "label-modifier" : ""
        }`}
      >
        {customLabel && <div className="custom-label">{customLabel}</div>}
        {name === "state" ? (
          <Field
            as="select"
            placeholder={placeholder}
            disabled={disabled}
            name={name}
          >
            <option value="">Select {name}</option>
            {options?.map((option) => option)}
          </Field>
        ) : (
          <Field name={name} type={type} placeholder={placeholder} required />
        )}

        {label && name === "card_type" && (
          <label htmlFor={name}>
            {label}
            <div className="logos">
              <img src={Visa} alt="Visa" />
              <img src={Mastercard} alt="Mastercard" />
              <img src={Amex} alt="Amex" />
              <img src={Diners} alt="Diners" />
              <img src={Discover} alt="Discover" />
            </div>
          </label>
        )}
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </>
  );
};

export default Input;
