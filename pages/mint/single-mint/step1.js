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
import { mintSingleStep2 } from "/components/Routes/constants";
import CaptionHeading from "/components/shared/headings/CaptionHeading";
const SingleMint = () => {
  const router = useRouter();

  const [mintFile, setMintFile] = useState(null);
  const [mintFileFormat, setMintFileFormat] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onSelectFile = ({ currentTarget: input }) => {
    if (input.files && input.files[0]) {
      const files = input.files[0];
      setMintFile(files);
      const name = files?.name.toLowerCase();
      if (name.match(/\.(jpg|jpeg|png|gif)$/)) {
        setMintFileFormat("image");
      } else if (name.match(/\.(mp3)$/)) {
        setMintFileFormat("audio");
      } else if (name.match(/\.(mp4)$/)) {
        setMintFileFormat("video");
      } else {
        setMintFileFormat("invalid");
      }
    }
  };

  const onNextButton = async () => {
    if (mintFile !== null && mintFileFormat != "invalid") {
      setIsUploading(true);
      try {
        const projectId = "2IAoACw6jUsCjy7i38UO6tPzYtX";
        const projectSecret = "136393a5b7f4e47a9e153a88eb636003";
        const auth = `Basic ${Buffer.from(
          `${projectId}:${projectSecret}`
        ).toString("base64")}`;
        const client = create({
          host: "ipfs.infura.io",
          port: 5001,
          protocol: "https",
          headers: {
            authorization: auth,
          },
        });
        const uploaded_image = await client.add(mintFile);
        console.log(uploaded_image);
        if (uploaded_image) {
          Toast("success", "Uploaded Successfully");
          setIsUploading(false);
          window.localStorage.setItem("img", uploaded_image.path);
          window.localStorage.setItem("file_mimeType", mintFile.type);
          router.push(mintSingleStep2);
        }
      } catch (error) {
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
          {!isUploading ? (
            <>
              <Grid container spacing={{ md: 3, xs: 3 }}>
                <Grid item md={4} xs={12}>
                  <Box
                    className="upload_panel"
                    sx={{ height: { xs: "auto", md: "100%" } }}
                  >
                    <img src="/images/Upload_icon.png" alt="mint" />
                  </Box>
                  <Box
                    sx={{ py: 3, display: "flex", justifyContent: "center" }}
                  >
                    <Button className="btn2" component="label">
                      <input
                        hidden
                        type="file"
                        onChange={(e) => onSelectFile(e)}
                      />
                      Select File
                    </Button>
                  </Box>
                </Grid>
                <Grid item md={4} xs={12}></Grid>
                <Grid item md={4} xs={12}>
                  <Box
                    className="upload_panel bg"
                    sx={{ height: { xs: "auto", md: "100%" } }}
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
            </>
          ) : (
            <Box className="flex" sx={{ flexDirection: "column" }}>
              <CircularProgress sx={{ color: "#fff" }} />
              <Box sx={{ py: 3 }}>
                <CaptionHeading heading="Please wait for a while ..." />
              </Box>
            </Box>
          )}
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
