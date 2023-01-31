import React, { useState } from "react";

type Props = {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  type?: string;
  name: string;
  placeholder: string;
};

function Input({ value, onChange, type = "text", name, placeholder }: Props) {
  const [focus, setFocus] = useState(false);
  return (
    <div className="checkout-input">
      {value.length > 0 && (
        <label
          style={{ color: focus ? "black" : "rgba(0,0,0,0.5)" }}
          className="checkout-input-label"
          htmlFor={name}>
          {placeholder}
        </label>
      )}
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="checkout-input-input"
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
