import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

type Props = {
  children?: ReactNode;
};

function HeaderLayout({ children }: Props) {
  return (
    <Box>
      <Header backg="black" />
      {children ?? <Outlet />}
    </Box>
  );
}

export default HeaderLayout;
