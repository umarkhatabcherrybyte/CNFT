import React, { useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  Button,
  FormHelperText,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import { useFormik } from "formik";
import { addCollectioneListingSchema } from "../../schema/Index";
import { useRouter } from "next/router";
import { listCollectionRoute } from "/components/Routes/constants";
import { setListing } from "../../redux/listing/ListingActions";
import { useDispatch, useSelector } from "react-redux";
const AddImage = ({ heading, desc, width, formik, name }) => {
  return (
    <>
      <Typography className="bold text_white">{heading}</Typography>
      <Typography
        variant="caption"
        className="text_white"
        sx={{ opacity: "0.7" }}
      >
        {desc}
      </Typography>

      <Box
        sx={{
          my: 2,
          //   background: "#FFFFFF33 ",
          border: "3px dashed #fff",
          maxWidth: width,
          height: "12rem",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          component="label"
          sx={{
            width: "100%",
            height: "100%",
            background: "#FFFFFF33 ",

            "&:hover": {
              background: "#FFFFFF33",
            },
          }}
        >
          {formik.values[name] ? (
            <img
              className="br_15"
              src={URL.createObjectURL(formik.values[name])}
              alt="no image"
              style={{
                width: "98%",
                height: "90%",
              }}
            />
          ) : (
            <Image sx={{ color: "#fff", width: "4em", height: "4em" }} />
          )}
          <input
            hidden
            accept="image/*"
            type="file"
            name={name}
            onChange={(e) => {
              formik.setFieldValue(name, e.currentTarget.files[0]);
            }}
          />
        </Button>
      </Box>
      <FormHelperText sx={{ color: "#d32f2f" }}>
        {formik.touched[name] && formik.errors[name]}
      </FormHelperText>
    </>
  );
};
const ListCollection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const data = useSelector((state) => state.listing.data);
  // console.log(data);
  const formik = useFormik({
    initialValues: {
      type: "collection",
      logo_image: null,
      feature_image: null,
      banner_image: null,
      name: "",
      description: "",
    },
    validationSchema: addCollectioneListingSchema,
    onSubmit: (values) => {
      console.log(values);
      // dispatch(setListing(values));
      // window.localStorage.setItem("listing", JSON.stringify(values));

      // ======================

      const reader = new FileReader();

      // Read file1 as data URL
      reader.readAsDataURL(values.logo_image);
      reader.onload = () => {
        const file1DataURL = reader.result;

        // Read file2 as data URL
        reader.readAsDataURL(values.feature_image);
        reader.onload = () => {
          const file2DataURL = reader.result;

          // Read file3 as data URL
          reader.readAsDataURL(values.banner_image);
          reader.onload = () => {
            const file3DataURL = reader.result;

            // Create a new object with the form data and file data URLs
            const dataWithFiles = {
              ...values,
              logo_image: file1DataURL,
              feature_image: file2DataURL,
              banner_image: file3DataURL,
            };

            // Store the object in local storage
            localStorage.setItem("listing", JSON.stringify(dataWithFiles));
            router.push(listCollectionRoute);
          };
        };
      };
    },
  });
  // console.log(formik);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography
        variant="caption"
        sx={{ color: "#fff", opacity: "0.7", py: 2 }}
      >
        Required fields*
      </Typography>

      <AddImage
        formik={formik}
        name="logo_image"
        heading="Logo Image*"
        desc="This  image will also be used for navigation. 350 x 350 recommendation."
        width="15rem"
      />
      <FormHelperText sx={{ color: "#d32f2f" }}>
        {formik.touched.file && formik.errors.file}
      </FormHelperText>
      <AddImage
        formik={formik}
        name="feature_image"
        heading="Featured Image"
        desc="This image will be used for featuring your collection on homepage, category page, or other promotional areas of CNFT Genie. 600 x 600 recommendation."
        width="35rem"
      />
      <AddImage
        formik={formik}
        name="banner_image"
        heading="Banner Image"
        desc="This image will be appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 400 recommendation."
        width="100%"
      />
      <Box sx={{ py: 1 }}>
        <TextField
          fullWidth={true}
          name="name"
          placeholder="Name*"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{
            maxWidth: "400px",
            fieldset: {
              border: "none",
            },
            input: {
              color: "#fff",
              background: "var(--light-white-color)",
              borderRadius: "15px",
              padding: "15px 10px",
              "&::placeholder": {
                color: "#fff",
              },
            },
          }}
        />
      </Box>
      <Box sx={{ py: 1 }}>
        <Typography
          variant="caption"
          className="bold text_white montserrat"
          component="div"
        >
          Description
        </Typography>
        <Typography
          variant="caption"
          className="text_white montserrat"
          component="div"
          sx={{ opacity: "0.7", pb: 1 }}
        >
          Tell us about your collection. 0 of 1000 characters used. (Optional)
        </Typography>
        <TextField
          fullWidth={true}
          multiline
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          rows={4}
          sx={{
            maxWidth: "400px",
            "& .MuiInputBase-root": {
              padding: "0",
            },
            fieldset: {
              border: "none",
            },
            textarea: {
              color: "#fff",
              background: "var(--light-white-color)",
              borderRadius: "15px",
              padding: "15px 10px",
              "&::placeholder": {
                color: "#fff",
              },
            },
          }}
        />
      </Box>
      <Button type="submit" className="btn2" sx={{ width: "200px", my: 3 }}>
        Create
      </Button>
    </form>
  );
};

export default ListCollection;
