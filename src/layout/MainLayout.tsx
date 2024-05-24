import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      {/* Navbar */}
      {/* Outlet */}
      <Box component={"main"}>
        <Outlet />
      </Box>
      {/* Footer */}
    </>
  );
};

export default MainLayout;
