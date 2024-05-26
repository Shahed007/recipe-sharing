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

export interface RecipeProps {
  recipe_name: string | null;
  details: string | null;
  video: string | null;
  country: string | null;
  category: string | null;
  image: string | null;
}

const AddRecipes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [video, setVideo] = useState<string | null>(null);
  const [confirmVideo, setConfirmVideo] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  // recipe details
  const [recipe, setRecipe] = useState<RecipeProps>({
    recipe_name: null,
    details: null,
    video: null,
    country: null,
    category: null,
    image: null,
  });

  const handleAddVideo = () => {
    setIsModalOpen(false);
    setConfirmVideo(video);
  };

  const handleDeleteVideo = () => {
    setConfirmVideo(null);
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
                  <Autocomplete
                    fullWidth
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(option: MovieOption) => option.label}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select category" />
                    )}
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
                    options={top100Films}
                    getOptionLabel={(option: MovieOption) => option.label}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select countery" />
                    )}
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

interface MovieOption {
  label: string;
  year: number;
}

const top100Films: MovieOption[] = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },
  {
    label: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { label: "City of God", year: 2002 },
  { label: "Se7en", year: 1995 },
  { label: "The Silence of the Lambs", year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: "Life Is Beautiful", year: 1997 },
  { label: "The Usual Suspects", year: 1995 },
  { label: "Léon: The Professional", year: 1994 },
  { label: "Spirited Away", year: 2001 },
  { label: "Saving Private Ryan", year: 1998 },
  { label: "Once Upon a Time in the West", year: 1968 },
  { label: "American History X", year: 1998 },
  { label: "Interstellar", year: 2014 },
  { label: "Casablanca", year: 1942 },
  { label: "City Lights", year: 1931 },
  { label: "Psycho", year: 1960 },
  { label: "The Green Mile", year: 1999 },
  { label: "The Intouchables", year: 2011 },
  { label: "Modern Times", year: 1936 },
  { label: "Raiders of the Lost Ark", year: 1981 },
  { label: "Rear Window", year: 1954 },
  { label: "The Pianist", year: 2002 },
  { label: "The Departed", year: 2006 },
  { label: "Terminator 2: Judgment Day", year: 1991 },
  { label: "Back to the Future", year: 1985 },
  { label: "Whiplash", year: 2014 },
  { label: "Gladiator", year: 2000 },
  { label: "Memento", year: 2000 },
  { label: "The Prestige", year: 2006 },
  { label: "The Lion King", year: 1994 },
  { label: "Apocalypse Now", year: 1979 },
  { label: "Alien", year: 1979 },
  { label: "Sunset Boulevard", year: 1950 },
  {
    label:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { label: "The Great Dictator", year: 1940 },
  { label: "Cinema Paradiso", year: 1988 },
  { label: "The Lives of Others", year: 2006 },
  { label: "Grave of the Fireflies", year: 1988 },
  { label: "Paths of Glory", year: 1957 },
  { label: "Django Unchained", year: 2012 },
  { label: "The Shining", year: 1980 },
  { label: "WALL·E", year: 2008 },
  { label: "American Beauty", year: 1999 },
  { label: "The Dark Knight Rises", year: 2012 },
  { label: "Princess Mononoke", year: 1997 },
  { label: "Aliens", year: 1986 },
  { label: "Oldboy", year: 2003 },
  { label: "Once Upon a Time in America", year: 1984 },
  { label: "Witness for the Prosecution", year: 1957 },
  { label: "Das Boot", year: 1981 },
  { label: "Citizen Kane", year: 1941 },
  { label: "North by Northwest", year: 1959 },
  { label: "Vertigo", year: 1958 },
  {
    label: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { label: "Reservoir Dogs", year: 1992 },
  { label: "Braveheart", year: 1995 },
  { label: "M", year: 1931 },
  { label: "Requiem for a Dream", year: 2000 },
  { label: "Amélie", year: 2001 },
  { label: "A Clockwork Orange", year: 1971 },
  { label: "Like Stars on Earth", year: 2007 },
  { label: "Taxi Driver", year: 1976 },
  { label: "Lawrence of Arabia", year: 1962 },
  { label: "Double Indemnity", year: 1944 },
  {
    label: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { label: "Amadeus", year: 1984 },
  { label: "To Kill a Mockingbird", year: 1962 },
  { label: "Toy Story 3", year: 2010 },
  { label: "Logan", year: 2017 },
  { label: "Full Metal Jacket", year: 1987 },
  { label: "Dangal", year: 2016 },
  { label: "The Sting", year: 1973 },
  { label: "2001: A Space Odyssey", year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: "Toy Story", year: 1995 },
  { label: "Bicycle Thieves", year: 1948 },
  { label: "The Kid", year: 1921 },
  { label: "Inglourious Basterds", year: 2009 },
  { label: "Snatch", year: 2000 },
  { label: "3 Idiots", year: 2009 },
  { label: "Monty Python and the Holy Grail", year: 1975 },
];
