import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/coins"}>coins</Link>

      <Link to={"/exchanges"}>Exchanges</Link>
    </>
  );
};

export default Header;
