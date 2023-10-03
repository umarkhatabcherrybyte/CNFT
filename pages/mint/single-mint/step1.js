import React, { useState } from "react";
import styled from "styled-components";
import Heading from "/components/Mint/Heading";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { Toast } from "/components/shared/Toast";
import { useRouter } from "next/router";
import { create } from "ipfs-http-client";
import FullSreenLoader from "/components/shared/FullScreenLoader";
import { mintSingleStep2 } from "/components/Routes/constants";
import CaptionHeading from "/components/shared/headings/CaptionHeading";
const SingleMint = () => {
  const router = useRouter();

  const [mintFile, setMintFile] = useState(null);
  const [featureImage, setFeatureImage] = useState(null);
  const [mintFileFormat, setMintFileFormat] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  console.log(mintFileFormat, "mintFileFormat");
  const onSelectFile = ({ currentTarget: input }) => {
    if (input.files && input.files[0]) {
      const files = input.files[0];
      setMintFile(files);
      setMintFileFormat("");
      const name = files?.name.toLowerCase();
      if (name.match(/\.(jpg|jpeg|png|gif)$/)) {
        setMintFileFormat("image");
        setFeatureImage(null);
      } else if (name.match(/\.(mp3)$/)) {
        setMintFileFormat("audio");
      } else if (name.match(/\.(mp4)$/)) {
        setMintFileFormat("video");
      } else {
        setMintFileFormat("invalid");
      }
    }
  };

  const onFeatureImageSelect = ({ currentTarget: input }) => {
    if (input.files && input.files[0]) {
      const files = input.files[0];
      const name = files?.name.toLowerCase();
      if (name.match(/\.(jpg|jpeg|png|gif)$/)) {
        setFeatureImage(files);
      } else {
        Toast("error", "Please select image file");
      }
    }
  };

  const onNextButton = async () => {
    setIsUploading(true);
    const projectId = "2IAoACw6jUsCjy7i38UO6tPzYtX";
    const projectSecret = "136393a5b7f4e47a9e153a88eb636003";
    const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
      "base64"
    )}`;
    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
    if (mintFile !== null && mintFileFormat != "invalid") {
      try {
        if (mintFileFormat === "image") {
          const uploaded_image = await client.add(mintFile);
          if (uploaded_image) {
            console.log(uploaded_image);
            Toast("success", "Uploaded Successfully");
            setIsUploading(false);
            window.localStorage.setItem("img", uploaded_image.path);
            window.localStorage.setItem("file_mimeType", mintFile.type);
            window.localStorage.setItem("featured_img", null);
            window.localStorage.setItem("featured_type", null);
          }

          router.push(mintSingleStep2);
        } else if (mintFileFormat === "video" || mintFileFormat === "audio") {
          // console.log("audio ya video ha ");

          if (!featureImage) {
            console.log("feature image ni ha ");
            Toast("error", "Please Select a featured image and try again.");
            setIsUploading(false);
            return;
          } else {
            // console.log(featureImage, "featureImage");
            // console.log(mintFile, "featureImage");
            // const [uploadedFeatureFile, uploadedMintFile] = await Promise.all([
            //   client.add(featureImage),
            //   client.add(mintFile),
            // ]);
            const uploadedMintFile = await client.add(mintFile);
            const uploadedFeatureFile = await client.add(featureImage);
            if (uploadedFeatureFile && uploadedMintFile) {
              // mint asset
              window.localStorage.setItem("img", uploadedMintFile.path);
              window.localStorage.setItem("file_mimeType", mintFile.type);
              // feature image
              window.localStorage.setItem(
                "featured_img",
                uploadedFeatureFile.path
              );
              window.localStorage.setItem("featured_type", featureImage.type);
              Toast("success", "Files Uploaded Successfully");
              setIsUploading(false);
              router.push(mintSingleStep2);

              // window.localStorage.setItem("img", uploadedMintFile.path);
              // window.localStorage.setItem("file_mimeType", mintFile.type);
              // Save file paths or other necessary information
            } else {
              Toast("error", "Failed to Upload Files");
              setIsUploading(false);
            }
          }
        } else {
          // Handle unsupported formats
          Toast("error", "Unsupported File Format");
          setIsUploading(false);
        }
      } catch (error) {
        console.log(error, "errorerror");
        setIsUploading(false);
        Toast("error", "Uploading failed.");
      }
    } else {
      Toast("error", "Select a file and try again.");
      setIsUploading(false);
    }
  };

  return (
    <SingleMintStyled>
      <Container>
        {isUploading && <FullSreenLoader />}
        <Heading />
        <Box
          className="text_white"
          sx={{
            background: "rgba(0,0,0,.4)",
            borderRadius: "1.5rem",
            py: 10,
            px: 5,
            // mb: 8,
          }}
        >
          <Grid container spacing={{ md: 3, xs: 3 }}>
            <Grid item md={4} xs={12}>
              <Box
                className="upload_panel"
                // sx={{ height: { xs: "auto", md: "100%" } }}
                sx={{ height: { xs: "auto", md: "auto" } }}
              >
                <img src="/images/Upload_icon.png" alt="mint" />
              </Box>
              <Box sx={{ py: 3, display: "flex", justifyContent: "center" }}>
                <Button className="btn2" component="label">
                  <input
                    hidden
                    type="file"
                    onChange={(e) => onSelectFile(e)}
                    accept="image/*, audio/*, video/*"
                  />
                  Select File
                </Button>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              {mintFileFormat === "audio" ||
                (mintFileFormat === "video" && (
                  <>
                    <Box
                      className="upload_panel bg"
                      sx={{
                        height: {
                          xs: "auto",
                          md: "21rem",
                        },
                      }}
                    >
                      {featureImage ? (
                        <img
                          src={URL.createObjectURL(featureImage)}
                          alt="mint"
                        />
                      ) : (
                        <img src="/images/Image_icon.png" alt="mint" />
                      )}
                    </Box>
                    <Box
                      sx={{
                        py: 3,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button className="btn2" component="label">
                        <input
                          hidden
                          type="file"
                          onChange={(e) => onFeatureImageSelect(e)}
                          accept="image/*"
                        />
                        Select Feature Image
                      </Button>
                    </Box>
                  </>
                ))}
            </Grid>
            <Grid item md={4} xs={12}>
              <Box
                className="upload_panel bg"
                sx={{ height: { xs: "auto", md: "21rem" } }}
              >
                {mintFile ? (
                  <>
                    {mintFileFormat === "image" && (
                      <img src={URL.createObjectURL(mintFile)} alt="mint" />
                    )}
                    {mintFileFormat === "video" && (
                      <video controls>
                        <source
                          src={URL.createObjectURL(mintFile)}
                          type="video/mp4"
                        ></source>
                      </video>
                    )}
                    {mintFileFormat === "audio" && (
                      <audio controls>
                        <source
                          src={URL.createObjectURL(mintFile)}
                          type="audio/mp3"
                        ></source>
                      </audio>
                    )}

                    {mintFileFormat === "invalid" && (
                      <Typography variant="h6" sx={{ color: "red" }}>
                        Invalid Format
                      </Typography>
                    )}
                  </>
                ) : (
                  <img src="/images/Image_icon.png" alt="mint" />
                )}
              </Box>

              <Typography
                variant="h6"
                sx={{ py: 2, textAlign: "center" }}
                component="div"
              >
                Preview
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}>
            <Button className="btn2" onClick={onNextButton}>
              Next
            </Button>
          </Box>
        </Box>
      </Container>
    </SingleMintStyled>
  );
};

export default SingleMint;

const SingleMintStyled = styled.section`
  input {
    display: none;
  }
  .upload_panel {
    display: flex;
    align-items: center;
    justify-content: center;
    /* height: 100%; */
    padding: 30px;
    border: 2px dashed rgba(255, 255, 255, 0.45);
    border-radius: 1rem;
    &.bg {
      background: rgba(255, 255, 255, 0.3);
    }
    img,
    video {
      width: 100%;
    }
  }
`;
