import {
  Box,
  Container,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import WebIcon from "@mui/icons-material/Web";

const Footer = () => {
  return (
    <Box bgcolor={"ghostwhite"} component={"footer"}>
      <Box component={"div"} borderBottom={"1px solid #ccc"}>
        <Container maxWidth="xl" sx={{ py: "3rem" }}>
          <Box
            component={"div"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            fontFamily={"Inter"}
            gap={"1rem"}
          >
            <Box
              component={"div"}
              display={"flex"}
              alignItems={"center"}
              gap="1rem"
            >
              <IconButton
                sx={{ border: "1px solid #cccc" }}
                aria-label="github"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                sx={{ border: "1px solid #cccc" }}
                aria-label="linkdin"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                sx={{ border: "1px solid #cccc" }}
                aria-label="facebook"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{ border: "1px solid #cccc" }}
                aria-label="facebook"
              >
                <WebIcon />
              </IconButton>
            </Box>
            <Box>
              <List
                id="footer-menu"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ListItemButton>Home</ListItemButton>
                <ListItemButton>About</ListItemButton>
                <ListItemButton>Recipes</ListItemButton>
              </List>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box component={"div"} pb={'.7rem'} pt={"1rem"} display={'flex'} justifyContent={'center'}>
        <Typography align="center" variant="body2">
          &copy;2024 All rights reserved by, <b>MD Shahed</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
