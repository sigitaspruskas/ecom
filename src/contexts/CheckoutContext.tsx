// src/contexts/CheckoutContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CheckoutData {
  quantity: number;
  total: number;
  // formData: Record<string, string>;
  // formData: {
  //   email: string;
  //   name: string;
  //   surname: string;
  //   address: string;
  //   city: string;
  //   zip: string;
  //   country: string;
  //   state?: string;
  // };
}

interface CheckoutContextType {
  checkoutData: CheckoutData;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>;
}

// Create a context
const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

// Create a provider component
export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    quantity: 3,
    total: 300,
    // formData: {
    //   email: "",
    //   name: "",
    //   surname: "",
    //   address: "",
    //   city: "",
    //   state: "",
    //   zip: "",
    //   country: "",
    // },
  });
  // console.log("test");
  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook to use the CheckoutContext
export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
