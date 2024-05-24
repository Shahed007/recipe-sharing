import { Box, Button, Container, Typography } from "@mui/material";

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
        display={"flex"}
        alignItems={"center"}
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
          <Typography mt={'1.2rem'} color={'white'} width={'50%'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            incidunt dolores magni repudiandae voluptate repellat nulla, rem,
            reiciendis corporis minus ea beatae dolorum. Hic consequatur error
            dolor, explicabo quae voluptates!
          </Typography>
          <Box mt={'1.8rem'} component={'div'} display={'flex'} alignItems={'center'} gap={'1.6rem'}>
            <Button size="large"  variant="outlined">Button 1</Button>
            <Button sx={{bgcolor: '#c64600', color: 'text.secondary'}} size="large" variant="contained">Button 1</Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;
