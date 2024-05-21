import React, { createContext, useContext, useState, ReactNode } from "react";

interface CheckoutData {
  quantity: number;
  total: number;
}

interface CheckoutContextType {
  checkoutData: CheckoutData;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    quantity: 3,
    total: 300,
  });

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
