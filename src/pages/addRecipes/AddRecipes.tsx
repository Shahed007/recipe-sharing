import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
  Button,
  styled,
  Autocomplete,
  Tooltip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SpringModal from "../../components/modal/SpringModal";
import React, { useState } from "react";
import axios from "axios";
import imageUpload from "../../utility/imageUpload";
import Select, { MultiValue } from "react-select";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

 interface RecipeProps {
  recipe_name: string | null;
  details: string | null;
  video: string | null;
  image: string | null;
}

const AddRecipes = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [video, setVideo] = useState<string | null>(null);
  const [confirmVideo, setConfirmVideo] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);

  const handleChange = (
    newValue: MultiValue<{ value: string; label: string }>
  ) => {
    setSelectedOption(newValue);
  };
  // recipe details
  const [recipe, setRecipe] = useState<RecipeProps>({
    recipe_name: null,
    details: null,
    video: null,
    image: null,
  });

  const handleAddVideo = () => {
    setIsModalOpen(false);
    setConfirmVideo(video);
  };

  const handleDeleteVideo = () => {
    setConfirmVideo(null);
  };

  const handleChangeCountry = (
    event: React.SyntheticEvent,
    newValue: CountryOption | null
  ) => {
    setSelectedCountry(newValue);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageList = event.target.files;
    const image = imageList?.[0];
    setImageLoading(true);
    if (image) {
      const res = await imageUpload(image);
      setRecipe({ ...recipe, image: res.display_url });
      setImageLoading(false);
    }
  };

  const handlePublishRecipe = async () => {
    const data = {
      recipe_name: recipe.recipe_name || "not found",
      recipe_details: recipe.details || "not found",
      video: confirmVideo || "not found",
      country: selectedCountry || "not found",
      category: selectedOption || "not found",
      creatorEmail: "lorem@gmail.com" || "not found",
      watchCount: 0,
      purchased_by: [],
    };
    console.log(data);
  };

  return (
    <>
      <Box component={"section"} py={"5rem"}>
        <Container component={"div"} maxWidth="xl">
          <Grid spacing={"1.625rem"} container>
            {/*Description Start  */}
            <Grid item xs={12} lg={8}>
              <Box borderRadius={"5px"} border={"1px solid #ccc"} p={"1rem"}>
                <FormControl fullWidth>
                  <Typography mb={".5rem"} component={"h4"}>
                    Recipes Name
                  </Typography>
                  <TextField
                    onChange={(e) =>
                      setRecipe({ ...recipe, recipe_name: e.target.value })
                    }
                    fullWidth
                    placeholder="Enter recipes name"
                    id="outlined-basic"
                    variant="outlined"
                  />
                </FormControl>
              </Box>
              <Box
                mt={"1.625rem"}
                borderRadius={"5px"}
                border={"1px solid #ccc"}
                p={"1rem"}
              >
                <Typography mb={".5rem"} component={"h4"}>
                  Recipes Details
                </Typography>
                <CKEditor
                  onChange={(event, editor) =>
                    setRecipe({ ...recipe, details: editor.getData() })
                  }
                  editor={ClassicEditor}
                ></CKEditor>
              </Box>
              <Box
                mt={"1.625rem"}
                borderRadius={"5px"}
                border={"1px solid #ccc"}
                p={confirmVideo ? "" : "1rem"}
                minHeight={"350px"}
                display={confirmVideo ? "" : "flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {confirmVideo ? (
                  <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                    <Box component={"div"} p={"1rem"}>
                      <Button
                        endIcon={<DeleteIcon />}
                        variant="outlined"
                        color="secondary"
                        onClick={handleDeleteVideo}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Box
                      height={"350px"}
                      width={"100%"}
                      sx={{
                        "& iframe": {
                          width: "100%",
                          height: "100%",
                          border: "1px solid #ccc",
                          borderBottomLeftRadius: "5px",
                          borderBottomRightRadius: "5px",
                        },
                      }}
                      component={"div"}
                      dangerouslySetInnerHTML={{ __html: confirmVideo ?? "" }}
                    ></Box>
                  </Box>
                ) : (
                  <Tooltip title="Embed video using html iframe tag">
                    <Button
                      color="error"
                      startIcon={<YouTubeIcon />}
                      onClick={() => setIsModalOpen(true)}
                      variant="outlined"
                    >
                      Embed youtube video
                    </Button>
                  </Tooltip>
                )}
              </Box>
            </Grid>
            {/* Description end */}

            {/* Side bar start */}
            <Grid item xs={12} lg={4}>
              <Box borderRadius={"5px"} border={"1px solid #ccc"} p={"1rem"}>
                <Box
                  component={"div"}
                  pb={"1rem"}
                  borderBottom={"1px solid #ccc"}
                >
                  <LoadingButton
                    onClick={handlePublishRecipe}
                    size="large"
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Publish Now
                  </LoadingButton>
                </Box>
                <Box
                  component={"div"}
                  py={"1rem"}
                  borderBottom={"1px solid #ccc"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    mb={".5rem"}
                    variant="body1"
                    fontWeight={500}
                    component={"h3"}
                  >
                    Recipe Image
                  </Typography>

                  <LoadingButton
                    loading={imageLoading}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload image
                    <VisuallyHiddenInput
                      onChange={handleFileChange}
                      type="file"
                    />
                  </LoadingButton>
                </Box>
                {recipe.image && (
                  <Box
                    component={"div"}
                    py={"1rem"}
                    borderBottom={"1px solid #ccc"}
                    height={"300px"}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src={recipe.image ?? ""}
                      alt={recipe.recipe_name ?? ""}
                    />
                  </Box>
                )}
                <Box
                  component={"div"}
                  py={"1rem"}
                  borderBottom={"1px solid #ccc"}
                  display={"flex"}
                  alignItems={"start"}
                  justifyContent={"space-between"}
                  flexDirection={"column"}
                  gap={"1rem"}
                >
                  <Typography fontWeight={500} variant="body1" component={"h3"}>
                    Category
                  </Typography>
                  <Select
                    className="category"
                    isMulti
                    defaultValue={selectedOption}
                    onChange={handleChange}
                    options={option}
                  />
                </Box>
                <Box
                  component={"div"}
                  py={"1rem"}
                  borderBottom={"1px solid #ccc"}
                  display={"flex"}
                  alignItems={"start"}
                  justifyContent={"space-between"}
                  flexDirection={"column"}
                  gap={"1rem"}
                >
                  <Typography fontWeight={500} variant="body1" component={"h3"}>
                    Country
                  </Typography>
                  <Autocomplete
                    fullWidth
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={country}
                    getOptionLabel={(option: CountryOption) => option.label}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select country" />
                    )}
                    onChange={handleChangeCountry}
                  />
                </Box>
              </Box>
            </Grid>
            {/* Side bar end */}
          </Grid>
        </Container>
      </Box>
      {/* This modal for youtube video embed */}
      <SpringModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        customWidth={1040}
      >
        <Grid fontFamily={"Inter"} container spacing={"1.625rem"}>
          <Grid item xs={12} lg={8}>
            <Box
              width={"100%"}
              height={"100%"}
              dangerouslySetInnerHTML={{ __html: video ?? "" }}
              sx={{
                "& iframe": {
                  width: "100%",
                  minHeight: "200px",
                  borderRadius: "10px",
                  boxShadow: "1px 2px 5px #ccc",
                },
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} lg={4} component={"div"}>
            <Typography variant="body1" fontWeight={500} mb={".5rem"}>
              Embed
            </Typography>
            <textarea
              name="embed_video"
              onChange={(e) => setVideo(e.target.value)}
              placeholder="Embed your video here"
            ></textarea>
            <Box
              mt={"1rem"}
              component={"div"}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Button
                onClick={handleAddVideo}
                variant="contained"
                color="secondary"
              >
                Confirm
              </Button>
            </Box>
          </Grid>
        </Grid>
      </SpringModal>
    </>
  );
};

export default AddRecipes;

interface CountryOption {
  value: string;
  label: string;
}

const option = [
  { value: "biriyani", label: "Biriyani" },
  { value: "kabuli_pulao", label: "Kabuli Pulao " },
  { value: "tavë_kosi", label: "Tavë Kosi " },
  { value: "couscous", label: "Couscous " },
  { value: "escudella", label: "Escudella " },
  { value: "muamba_de_galinha", label: "Muamba de Galinha " },
  { value: "asado", label: "Asado " },
  { value: "khorovats", label: "Khorovats " },
  { value: "meat_pie", label: "Meat Pie " },
  { value: "wiener_schnitzel", label: "Wiener Schnitzel " },
  { value: "plov", label: "Plov " },
  { value: "conch_salad", label: "Conch Salad " },
  { value: "machboos", label: "Machboos " },
  {
    value: "cou-cou_and_flying_fish",
    label: "Cou-Cou and Flying Fish ",
  },
  { value: "draniki", label: "Draniki " },
  { value: "moules_frites", label: "Moules-Frites " },
  { value: "rice_and_beans", label: "Rice and Beans " },
  { value: "kuli kuli", label: "Kuli Kuli " },
  { value: "ema_datshi", label: "Ema Datshi " },
  { value: "salteñas", label: "Salteñas " },
  { value: "čevapi", label: "Ćevapi " },
  { value: "seswaa", label: "Seswaa " },
  { value: "feijoada", label: "Feijoada " },
  { value: "ambuyat", label: "Ambuyat " },
  { value: "banitsa", label: "Banitsa " },
  { value: "riz gras", label: "Riz Gras " },
  { value: "ndagala", label: "Ndagala " },
  { value: "amok_trey", label: "Amok Trey " },
  { value: "ndolé", label: "Ndolé " },
  { value: "poutine", label: "Poutine" },
  { value: "catchupa", label: "Catchupa " },
  {
    value: "cassava_leaves",
    label: "Cassava Leaves ",
  },
  { value: "banda_banda", label: "Banda Banda " },
  { value: "empanadas", label: "Empanadas " },
  { value: "peking_duck", label: "Peking Duck " },
  { value: "arepas", label: "Arepas " },
  {
    value: "langouste_a_la_vanille",
    label: "Langouste à la Vanille ",
  },
  { value: "saka_saka", label: "Saka Saka " },
  { value: "gallo_pinto", label: "Gallo Pinto " },
  { value: "pašticada", label: "Pašticada " },
  { value: "ropa_vieja", label: "Ropa Vieja " },
];

const country: CountryOption[] = [
  { value: "bangladesh", label: "Bangladesh" },
  { value: "afghanistan", label: "Afghanistan" },
  { value: "albania", label: "Albania" },
  { value: "algeria", label: "Algeria" },
  { value: "andorra", label: "Andorra" },
  { value: "angola", label: "Angola" },
  { value: "argentina", label: "Argentina" },
  { value: "armenia", label: "Armenia" },
  { value: "australia", label: "Australia" },
  { value: "austria", label: "Austria" },
  { value: "azerbaijan", label: "Azerbaijan" },
  { value: "bahamas", label: "Bahamas" },
  { value: "bahrain", label: "Bahrain" },
  { value: "barbados", label: "Barbados" },
  { value: "belarus", label: "Belarus" },
  { value: "belgium", label: "Belgium" },
  { value: "belize", label: "Belize" },
  { value: "benin", label: "Benin" },
  { value: "bhutan", label: "Bhutan" },
  { value: "bolivia", label: "Bolivia" },
  { value: "bosnia_and_herzegovina", label: "Bosnia and Herzegovina" },
  { value: "botswana", label: "Botswana" },
  { value: "brazil", label: "Brazil" },
  { value: "brunei", label: "Brunei" },
  { value: "bulgaria", label: "Bulgaria" },
  { value: "burkina_faso", label: "Burkina Faso" },
  { value: "burundi", label: "Burundi" },
  { value: "cambodia", label: "Cambodia" },
  { value: "cameroon", label: "Cameroon" },
  { value: "canada", label: "Canada" },
  { value: "cape_verde", label: "Cape Verde" },
  { value: "central_african_republic", label: "Central African Republic" },
  { value: "chad", label: "Chad" },
  { value: "chile", label: "Chile" },
  { value: "china", label: "China" },
  { value: "colombia", label: "Colombia" },
  { value: "comoros", label: "Comoros" },
  { value: "congo", label: "Congo" },
  { value: "costa_rica", label: "Costa Rica" },
  { value: "croatia", label: "Croatia" },
  { value: "cuba", label: "Cuba" },
];
