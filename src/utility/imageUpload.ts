import axios from "axios";

const imageUpload = async (image: File,) => {

    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGEBB_API_KEY
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      return res.data.data;
    } catch (error) {
      return error;

    }
  
};

export default imageUpload;
