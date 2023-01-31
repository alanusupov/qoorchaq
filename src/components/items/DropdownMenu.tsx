import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  data?: string[];
  link: string;
  children?: any;
}

const DropdownMenu = ({ title, data, link, children }: Props): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="nav-dropdown">
      <div onClick={() => setOpen(!open)} className="nav-mobile-link">
        <Link to={link}>{title}</Link>
      </div>
      <ul
        className={
          open ? "nav-dropdown-open nav-dropdown-small" : "nav-dropdown-small"
        }>
        {data &&
          data.length > 0 &&
          data.map(x => {
            return <li>x</li>;
          })}
        {children}
      </ul>
    </div>
  );
};

export default DropdownMenu;
