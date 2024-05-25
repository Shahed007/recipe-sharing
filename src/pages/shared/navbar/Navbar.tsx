import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import scrollTop from "../../../utility/scrollTop";
import { useAuth } from "../../../hooks/useAuth";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<
    Element | (() => Element) | null
  >(null);
  const [anchorElUser, setAnchorElUser] = useState<
    Element | (() => Element) | null
  >(null);
  const { pathname } = useLocation();
  const [isActiveRoute, setIsActiveRoute] = useState<boolean>(false);
  const { user, loagout, loginAndRegistration } = useAuth();

  const handleActiveRoute = (path: string = "/") => {
    setIsActiveRoute(path === pathname);
    scrollTop();
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget);
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ background: "background", zIndex: 200 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "Playfair Display",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((item) => (
                <MenuItem key={item.name} onClick={handleCloseNavMenu}>
                  <Typography
                    onClick={() => handleActiveRoute(item.path)}
                    sx={{
                      color: isActiveRoute ? "primary.main" : "",
                    }}
                    textAlign="center"
                  >
                    {item.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box display={"flex"} alignItems={"center"} component={"div"}>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "center",
                gap: "1.625rem",
              },
            }}
          >
            {pages.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleActiveRoute(item.path)}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "text.primary",
                    display: "block",
                    bgcolor: isActiveRoute ? "primary.main" : "",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "text.secondary",
                    },
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>

          {user?.email ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  sx={{
                    width: "200px",
                    "&:hover": { backgroundColor: "white" },
                  }}
                >
                  Coins{" "}
                  <Typography sx={{ color: "primary.main" }}>
                    {" "}
                    ({"50"})
                  </Typography>
                </MenuItem>
                {settings.map((setting) => (
                  <>
                    <MenuItem
                      sx={{ width: "200px" }}
                      key={setting}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  </>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button
              sx={{ display: { sm: "block", xs: "none" } }}
              color="secondary"
              variant="contained"
            >
              Google Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

const pages: { name: string; path: string }[] = [
  { name: "Home", path: "/" },
  { name: "Recipes", path: "/recipes" },
  { name: "Add-Recipes", path: "/add-recipes" },
];
const settings = ["MD Shahed", "Logout"];
