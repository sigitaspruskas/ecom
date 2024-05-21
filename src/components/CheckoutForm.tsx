import React, { useState, useEffect, ChangeEvent } from "react";
import country from "country-list-js";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import Input from "./Input";
import MaskedInput from "./MaskedInput";

import { useCheckout } from "../contexts/CheckoutContext";

import Lock from "../assets/lock.svg";
import Visa from "../assets/visa.svg";
import Mastercard from "../assets/mastercard.svg";
import Amex from "../assets/Amex.svg";
import Diners from "../assets/diners-club.svg";
import Discover from "../assets/discover.svg";

interface FormState {
  email: string;
  name: string;
  surname: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  state?: string;
  card_type?: string;
  card_nr?: string;
  card_expiration?: string;
  card_code?: string;
  card_name?: string;
}

const initialValues: FormState = {
  email: "",
  name: "",
  surname: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  card_type: "",
  card_nr: "",
  card_expiration: "",
  card_code: "",
  card_name: "",
};

// Card selection logic not implemented, so I just hardcoded this.
const MockRadioInput: React.FC = () => {
  return (
    <div className="input-wrapper card_type">
      <input
        id="card_type"
        name="card_type"
        type="radio"
        checked
        value="visa"
        onChange={() => {}}
      />
      <label htmlFor="card_type">
        Credit Card
        <div className="logos">
          <img src={Visa} alt="Visa" />
          <img src={Mastercard} alt="Mastercard" />
          <img src={Amex} alt="Amex" />
          <img src={Diners} alt="Diners" />
          <img src={Discover} alt="Discover" />
        </div>
      </label>
    </div>
  );
};

const CheckoutForm: React.FC = () => {
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const { setFieldValue } = useFormikContext<FormState>();

  useEffect(() => {
    const countryOptions = country.names().map((country) => ({
      label: country,
      value: country,
    }));
    setCountries(countryOptions);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const statesData =
        country.findByName(selectedCountry)?.provinces?.map((state) => ({
          label: state.name,
          value: state.name,
        })) || [];
      setStates(statesData);
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  return (
    <div className="form-wrapper">
      <Form>
        <div className="form-section form-section--email">
          <div className="section-title">Contact</div>
          <Input name="email" type="email" placeholder="Enter Email" />
        </div>

        <div className="form-section form-section--info">
          <div className="section-title">Delivery</div>
          <Input name="name" placeholder="Enter Name" />

          <Input name="surname" placeholder="Enter Surname" />

          <Input name="address" placeholder="Enter Address" />

          <Input name="city" placeholder="Enter City" />

          <Input
            name="state"
            customLabel="State/Province"
            placeholder="Enter State/Province"
            options={states.map((state, id) => (
              <option key={id} value={state.value}>
                {state.value}
              </option>
            ))}
            disabled={!states.length && countries.length > 0 && true}
          />

          <Input name="zip" placeholder="Enter Zip/Postal Code" />

          <div className="input-wrapper country label-modifier">
            <div className="custom-label">Country</div>
            <Field
              name="country"
              as="select"
              placeholder="Enter Country"
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                const selectedValue = event.target.value;
                setFieldValue("country", selectedValue);
                setSelectedCountry(selectedValue);
                setFieldValue("state", "");
              }}
              className=""
            >
              <option value="">Select country</option>
              {countries.map((option, id) => (
                <option key={id} value={option.value}>
                  {option.value}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="country"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
        </div>

        <div className="form-section form-section--payment">
          <div className="section-title">Payment</div>
          <div className="section-subtitle">
            All transactions are secure and encrypted
          </div>
          <MockRadioInput />
          <div className="form-section--payment-container">
            <MaskedInput
              name="card_nr"
              mask="9999 9999 9999 9999"
              placeholder="Card Number"
            />
            <MaskedInput
              name="card_expiration"
              mask="99/99"
              placeholder="Expiration (MM/YY)"
            />
            <MaskedInput
              name="card_code"
              mask="999"
              placeholder="Security Code"
            />
            <Input name="card_name" placeholder="Name on card" />
          </div>

          <button type="submit">Submit Order</button>
          <div className="text">
            <img src={Lock} alt="Lock" className="mr-2" />
            <span>All transactions are secure and encrypted</span>
          </div>
        </div>
      </Form>
    </div>
  );
};

const CheckoutFormWrapper: React.FC = () => {
  const { checkoutData } = useCheckout();

  const validate = (values: FormState) => {
    const errors: Partial<FormState> = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.surname) {
      errors.surname = "Surname is required";
    }

    if (!values.address) {
      errors.address = "Address is required";
    }

    if (!values.city) {
      errors.city = "City is required";
    }

    if (!values.zip) {
      errors.zip = "Zip/Postal code is required";
    }

    if (!values.country) {
      errors.country = "Country is required";
    }

    if (!country.findByName(values.country)?.provinces?.length) {
      return errors;
    }

    if (values.country && !values.state) {
      errors.state = "State/Province is required";
    }

    if (!values.card_type) {
      // mock, as there's no card selection implemented
      // errors.card_type = "Credit card type is required";
    }

    if (!values.card_nr) {
      errors.card_nr = "Card number is required";
    } else {
      const cleanedCardNr = values.card_nr.replace(/\s+/g, "");

      if (!/^\d{16}$/.test(cleanedCardNr)) {
        errors.card_nr = "Invalid card number. Must be 16 digits.";
      }
    }

    if (!values.card_expiration) {
      errors.card_expiration = "Expiration date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.card_expiration)) {
      errors.card_expiration = "Invalid expiration date. Must be MM/YY.";
    }

    if (!values.card_code) {
      errors.card_code = "Security code is required";
    } else if (!/^\d{3}$/.test(values.card_code)) {
      errors.card_code = "Invalid security code. Must be 3 digits.";
    }

    if (!values.card_name) {
      errors.card_name = "Name on card is required";
    }

    return errors;
  };

  const onSubmit = (values: FormState) => {
    // mock card type select
    values.card_type = "visa";

    localStorage.setItem(
      "checkoutData",
      JSON.stringify({ ...values, ...checkoutData })
    );

    console.log("saved to localStorage");
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      <CheckoutForm />
    </Formik>
  );
};

export default CheckoutFormWrapper;
