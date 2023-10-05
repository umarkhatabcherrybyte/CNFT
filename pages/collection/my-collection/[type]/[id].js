import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import MainCard from "/components/Collection/My Collection/MainCard";
import CaptionHeading from "/components/shared/headings/CaptionHeading";
import Heading from "/components/shared/headings/Heading";
import { INSTANCE } from "/config/axiosInstance";
import { useRouter } from "next/router";
import FullScreenLoader from "/components/shared/FullScreenLoader";
import { BlockfrostProvider } from "@meshsdk/core";
import { blockfrostApiKey } from "../../../../config/blockfrost";
export async function fetchAssetsByPolicy(policy_id, setter) {
  if (!policy_id) return;

  try {
    const blockfrostProvider = new BlockfrostProvider(blockfrostApiKey);
    let latestAssets = await blockfrostProvider.fetchCollectionAssets(
      policy_id
    );
    latestAssets = latestAssets.assets;
    console.log({ latestAssets });
    let _nfts = [];
    for (let index = 0; index < latestAssets.length; index++) {
      const item_ = latestAssets[index];
      const main = await blockfrostProvider.fetchAssetMetadata(item_.unit);
      _nfts.push({
        detail: { onchain_metadata: main },
        ...main,
        policy: policy_id,
        unit: item_.unit,
        type: 0,
      });
    }
    console.log("assets are", _nfts);
    if (setter) {
      // setNfts(_nfts);
      setter(_nfts);
    }
    return _nfts;
  } catch (e) {
    console.log(e);
  }
}
const MyCollection = () => {
  const router = useRouter();
  const { id, type } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [policyNFTs, setPolicyNFTs] = useState([]);
  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await INSTANCE.get(`/list/get/single/${id}`);
      setDetail(res?.data?.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setDetail([]);
      console.log(e);
    }
  };
  useEffect(() => {
    if (id) {
      if (type !== "Fixed") {
        getData();
      } else {
        setIsLoading(true);
        fetchAssetsByPolicy(id, (assets) => {
          setPolicyNFTs(assets);
          setIsLoading(false);
        });
      }
    }
  }, [id]);
  console.log({ policyNFTs });
  let firstNFT = null;
  if (policyNFTs.length > 0) {
    firstNFT = policyNFTs[0];
  }

  return !isLoading && Object.keys(detail).length > 0 ? (
    <>
      {isLoading && <FullScreenLoader />}

      <Box sx={{ pt: { md: 5, xs: 20 } }}>
        <img
          src={detail?.list.feature_image}
          alt=""
          className="w_100"
          style={{
            height: "21rem",
            objectFit: "cover",
          }}
        />
        <Box
          className="flex_align text_center"
          position="relative"
          sx={{
            flexDirection: "column",
            "& img": {
              borderRadius: "50%",
              border: "3px solid var(--secondary-color)",
              position: "absolute",
              top: "-39px",
              height: "74px",
              width: "74px",
              objectFit: "cover",
            },
          }}
        >
          <img src={detail?.list.logo_image} alt="" />
          <Box sx={{ py: 5 }}>
            {/* <CaptionHeading heading="Created by@Julian" /> */}
            <Heading heading={detail.list.name} />
            <Box
              className="flex"
              sx={{
                "& .fw": {
                  fontSize: "10px",
                  marginLeft: "5px",
                  color: "#fff",
                },
              }}
            >
              <Box className="flex_align">
                <Heading heading={detail.list.collection_id.total_supply} />
                <Typography
                  className="fw"
                  sx={{ color: "var(--secondary-color)" }}
                >
                  items
                </Typography>
              </Box>
              {/* <Box className="flex_align" sx={{ pl: 2 }}>
                <Typography
                  variant="h6"
                  className=" bold"
                  component="div"
                  sx={{ color: "var(--secondary-color)" }}
                >
                  1500
                </Typography>
                <Typography
                  className="fw"
                  sx={{ color: "var(--secondary-color) !important" }}
                >
                  ADA
                </Typography>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ pt: { md: 2, xs: 3 }, minHeight: "5rem" }}>
        {!isLoading && Object.keys(detail).length > 0 && (
          <Container maxWidth="xl">
            <MainCard
              data={detail?.list?.collection_id?.assets}
              id={id}
              type={type}
            />
          </Container>
        )}
      </Box>
    </>
  ) : (
    <>
      {isLoading && <FullScreenLoader />}
      {policyNFTs.length > 0 && (
        <>
          <Box sx={{ pt: { md: 5, xs: 20 } }}>
            <img
              src={"https://ipfs.io/ipfs/"+firstNFT.detail.onchain_metadata.feature_image}
              alt="Featured image"
              className="w_100"
              style={{
                height: "21rem",
                objectFit: "cover",
              }}
            />
            <Box
              className="flex_align text_center"
              position="relative"
              sx={{
                flexDirection: "column",
                "& img": {
                  borderRadius: "50%",
                  border: "3px solid var(--secondary-color)",
                  position: "absolute",
                  top: "-39px",
                  height: "74px",
                  width: "74px",
                  objectFit: "cover",
                },
              }}
            >
              <img src={"https://ipfs.io/ipfs/"+firstNFT.detail.onchain_metadata.logo_image} alt="Collection Logo" />
              <Box sx={{ py: 5 }}>
                {/* <CaptionHeading heading="Created by@Julian" /> */}
                <Heading
                  heading={
                    firstNFT.name
                      ? firstNFT.name
                      : firstNFT.detail.onchain_metadata?.asset_name
                      ? firstNFT.detail.onchain_metadata?.asset_name
                      : firstNFT.detail.onchain_metadata?.assetName
                  }
                />
                <Box
                  className="flex"
                  sx={{
                    "& .fw": {
                      fontSize: "10px",
                      marginLeft: "5px",
                      color: "#fff",
                    },
                  }}
                >
                  <Box className="flex_align">
                    <Heading heading={firstNFT.length} />
                    <Typography
                      className="fw"
                      sx={{ color: "var(--secondary-color)" }}
                    >
                      items
                    </Typography>
                  </Box>
                  {/* <Box className="flex_align" sx={{ pl: 2 }}>
                <Typography
                  variant="h6"
                  className=" bold"
                  component="div"
                  sx={{ color: "var(--secondary-color)" }}
                >
                  1500
                </Typography>
                <Typography
                  className="fw"
                  sx={{ color: "var(--secondary-color) !important" }}
                >
                  ADA
                </Typography>
              </Box> */}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ pt: { md: 2, xs: 3 }, minHeight: "5rem" }}>
            {!isLoading && policyNFTs.length > 0 && (
              <Container maxWidth="xl">
                <MainCard data={policyNFTs} id={id} type={type} />
              </Container>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default MyCollection;
