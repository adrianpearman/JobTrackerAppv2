import React from "react";
// Components
import DeskTopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  return (
    <>
      <DeskTopHeader />
      <MobileHeader />
    </>
  );
};

export default Header;
