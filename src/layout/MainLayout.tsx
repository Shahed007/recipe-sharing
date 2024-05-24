import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/navbar/Navbar";
import Footer from "../pages/shared/footer/Footer";

const MainLayout = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Outlet */}
      <Box minHeight={"100vh"} component={"main"} fontFamily={"Inter"}>
        <Outlet />
      </Box>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default MainLayout;
