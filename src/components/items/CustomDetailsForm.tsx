import React from "react";
import { Link } from "react-router-dom";

type Props = {
  text?: string;
};

function CustomDetailsForm({ text }: Props) {
  return (
    <div className="productDetails-customForm">
      <h4 className="productDetails-customForm-title">
        {text
          ? text
          : "Not your size? Sold? Want something similar but with custom features?"}
      </h4>
      <h4 className="productDetails-customForm-title">
        Customize your own Qoorchaq clothing now!
      </h4>
      <Link className="productDetails-customForm-link" to="/customize">
        Learn more about customization{" "}
        <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
          />
        </svg>
      </Link>
    </div>
  );
}

export default CustomDetailsForm;
