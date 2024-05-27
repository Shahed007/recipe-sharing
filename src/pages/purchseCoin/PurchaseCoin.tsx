import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

const PurchaseCoin = () => {
  return (
    <Box component={"section"} py={"5rem"}>
      <Container maxWidth="xl">
        <Typography
          textAlign={"center"}
          fontFamily={"Playfair Display"}
          textTransform={"uppercase"}
          variant="h3"
        >
          Select your plan
        </Typography>
        <Grid container spacing={"1.625rem"} mt={"3rem"}>
          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid #cccc",

                p: "1rem",
              }}
            >
              <Box
                component={"div"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                <Typography
                  fontSize={"1.6rem"}
                  fontFamily={"Playfair Display"}
                  variant="body1"
                >
                  Starter
                </Typography>
                <Typography
                  variant="h1"
                  component={"div"}
                  fontFamily={"Playfair Display"}
                >
                  <Typography component={"span"} variant="h5">
                    Price
                  </Typography>
                  /$1
                </Typography>
                <Typography
                  textAlign={"center"}
                  mt={"1rem"}
                  variant="h6"
                  display={"flex"}
                  alignItems={"center"}
                >
                  Get 500 coins <img src="/assets/coin.png" />
                </Typography>
              </Box>

              <Box component={"div"} mt={"1rem"}>
                <Button size="medium" variant="outlined" fullWidth>
                  Buy Now
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper
              elevation={3}
              sx={{
                border: "1px solid #cccc",
                height: "350px",
                p: "1rem",
                bgcolor: "secondary.main",
                color: "#fff",
              }}
            >
              <Box
                component={"div"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                <Typography
                  fontSize={"1.6rem"}
                  fontFamily={"Playfair Display"}
                  variant="body1"
                >
                  Premium
                </Typography>
                <Typography
                  variant="h1"
                  component={"div"}
                  fontFamily={"Playfair Display"}
                >
                  <Typography component={"span"} variant="h5">
                    Price
                  </Typography>
                  /$10
                </Typography>
                <Typography
                  textAlign={"center"}
                  mt={"1rem"}
                  variant="h6"
                  display={"flex"}
                  alignItems={"center"}
                >
                  Get 1000 coins <img src="/assets/coin.png" />
                </Typography>
              </Box>

              <Box component={"div"} mt={"1rem"}>
                <Button size="medium" variant="outlined" fullWidth>
                  Buy Now
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid #cccc",

                p: "1rem",
              }}
            >
              <Box
                component={"div"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                <Typography
                  fontSize={"1.6rem"}
                  fontFamily={"Playfair Display"}
                  variant="body1"
                >
                  Basic
                </Typography>
                <Typography
                  variant="h1"
                  component={"div"}
                  fontFamily={"Playfair Display"}
                >
                  <Typography component={"span"} variant="h5">
                    Price
                  </Typography>
                  /$5
                </Typography>
                <Typography
                  textAlign={"center"}
                  mt={"1rem"}
                  variant="h6"
                  display={"flex"}
                  alignItems={"center"}
                >
                  Get 500 coins <img src="/assets/coin.png" />
                </Typography>
              </Box>

              <Box component={"div"} mt={"1rem"}>
                <Button size="medium" variant="outlined" fullWidth>
                  Buy Now
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PurchaseCoin;
