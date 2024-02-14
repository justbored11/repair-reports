// type layoutProps = { children: React.ReactNode };
// import Router from "./Router";
import React from "react";

import Navbar from "./components/Navbar/Navbar.tsx";
export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      {children}
    </>
  );
};
