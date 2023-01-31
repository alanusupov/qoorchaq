import React, { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";
import { IOrderForm } from "../../pages/Checkout";
import Input from "../items/Input";
import CheckoutPayment from "./CheckoutPayment";

type Props = {
  orderForm: IOrderForm;
  setOrderForm: any;
  checkoutPrice: number;
};

function CheckoutOrderForm({ checkoutPrice, orderForm, setOrderForm }: Props) {
  const [step, setStep] = useState<"address" | "payment">("payment");
  const options = useMemo(() => countryList().getData(), []);
  console.log(orderForm);

  const checkForm = () => {
    return !Object.values(orderForm).every(x => {
      if (typeof x === "object") {
        return x.label.length > 0;
      } else {
        return x.length > 0;
      }
    });
  };

  console.log(checkForm());

  return (
    <div className="checkout-orderform">
      <h3 className="checkout-orderform-title">
        {step === "address" ? "Shipping Address" : "Payment"}
      </h3>
      {step === "address" ? (
        <div className="checkout-orderform-form">
          <Select
            placeholder="Select country"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: "none",
                outline: "none",
                width: "200px",
                marginTop: "15px",
              }),
              valueContainer: baseStyles => ({
                ...baseStyles,
                padding: 0,
              }),
              input: baseStyles => ({
                ...baseStyles,
                margin: 0,
                marginLeft: "-3px",
              }),
              singleValue: baseStyles => ({
                ...baseStyles,
                fontSize: "14px",
                fontWeight: "normal",
                marginLeft: "-0.5px",
              }),
              placeholder: baseStyles => ({
                ...baseStyles,
                fontSize: "14px",
                marginLeft: "-0.5px",
                fontWeight: "normal",
              }),
            }}
            options={options}
            value={orderForm.country}
            onChange={(value: any) =>
              setOrderForm((prev: IOrderForm) => ({
                ...prev,
                country: value,
              }))
            }
          />
          <Input
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOrderForm((prev: IOrderForm) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Email"
            value={orderForm.email}
          />
          <Input
            name="firstName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOrderForm((prev: IOrderForm) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="First name"
            value={orderForm.firstName}
          />
          <Input
            name="lastName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOrderForm((prev: IOrderForm) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Last name"
            value={orderForm.lastName}
          />
          <Input
            name="address"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOrderForm((prev: IOrderForm) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Address"
            value={orderForm.address}
          />
          <Input
            name="postalCode"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOrderForm((prev: IOrderForm) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Postal code"
            value={orderForm.postalCode}
          />
          <Input
            name="city"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOrderForm((prev: IOrderForm) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="City"
            value={orderForm.city}
          />
          <Input
            name="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOrderForm((prev: IOrderForm) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Phone number"
            value={orderForm.number}
          />
          <button
            disabled={checkForm()}
            onClick={() => setStep("payment")}
            className="checkout-orderform-btn">
            Next
          </button>
        </div>
      ) : (
        <CheckoutPayment checkoutPrice={checkoutPrice} />
      )}
    </div>
  );
}

export default CheckoutOrderForm;
