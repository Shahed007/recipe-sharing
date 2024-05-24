import { Box, Container, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box position={"relative"} component={"header"} height={"90vh"}>
      <video
        muted
        autoPlay
        loop
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          zIndex: 10,
        }}
        src="/assets/Pizza - Promo Video.mp4"
      ></video>
      <Box
        zIndex={20}
        bgcolor={"secondary.main"}
        sx={{ opacity: 0.7 }}
        component={"div"}
        position={"absolute"}
        top={0}
        left={0}
        height={"100%"}
        width={"100%"}
      ></Box>
      <Box
        zIndex={30}
        position={"absolute"}
        top={0}
        left={0}
        height={"100%"}
        width={"100%"}
        display={'flex'}
        alignItems={'center'}
      >
        <Container maxWidth="xl">
          <Typography
            fontFamily={"Playfair Display"}
            variant="h1"
            color={"white"}
            fontWeight={900}
          >
            Title
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;
