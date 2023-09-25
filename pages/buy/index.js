import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Tab, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Strips from "../../components/Design/Strips";
import BreadCrumHeader from "../../components/shared/BreadCrumHeader";
import ContainerLayout from "../../components/shared/ContainerLayout";
import Filter from "../../components/shared/Filter";
import BuyCards from "../../components/Buy/BuyCards";
import { useRouter } from "next/router";
import FullScreenLoader from "../../components/shared/FullScreenLoader";
import { INSTANCE } from "../../config/axiosInstance";
import NftCard from "../../components/shared/NftCard";
import { listMarket, getAssetDetail, getDatum } from "/scripts/blockfrost";
import * as database from "../../scripts/database";
import {
  decodeAssetName,
  listProviders,
  callKuberAndSubmit,
  transformNftImageUrl,
  renderLovelace,
} from "../../scripts/wallet";
import { Buffer } from "buffer";

const Buy = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState("single");
  const [isLoading, setIsLoading] = useState(true);
  const [utxos, setUtxos] = useState([]);
  const [message, setMessage] = useState("Loading");
  const [hasIndexDb, setHasIndexDb] = useState(false);
  const [buy, setBuy] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [filter, setFilter] = useState({
    price_range: {
      min: "0",
      max: "99999999999999999999999999999",
    },
    sort: "",
    type: "",
  });
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const res = await INSTANCE.post("/list/find/single/fixed", {
          mint_type: tabValue,
          ...filter,
        });
        // console.log("filter");

        setBuy([...res?.data?.data]);
        setIsLoading(false);
      } catch (e) {
        setBuy([]);
        setIsLoading(false);

        // console.log("filter error");
      }
    };
    getData();
  }, [tabValue, filter]);
  const onTabChange = (event, newValue) => {
    setTabValue(newValue);
    // if (newValue === "collections") {
    //   router.push(MycollectionRoute);
    // }
  };

  useEffect(() => {
    let db;

    const fetchData = async () => {
      try {
        db = await database.openDB();
        setHasIndexDb(true);

        const response = await listMarket();
        // console.log("All Market Utxos", response);

        const utxos = response.filter((utxo) => {
          const amount_ = utxo.amount.filter((x) => x.unit !== "lovelace");
          if (amount_.length == 1 && amount_[0].quantity == 1) {
            const nft = amount_[0].unit;
            const policy = nft.substring(0, 56);
            const asset = nft.substring(56);
            const assetUtf8 = decodeAssetName(asset);
            utxo.policy = policy;
            utxo.assetName = assetUtf8;
            utxo.detail = {};
            utxo.nft = nft;
            utxo.id = utxo.tx_hash + "#" + utxo.tx_index;

            return true;
          } else {
            return false;
          }
        });

        const readHandle = db && database.getReadHandle(db);
        const promises = utxos.map(async (utxo) => {
          try {
            const v = await database.getUtxo(readHandle, utxo.id);
            return v;
          } catch (e) {
            console.log("Error returned from db", e);

            const dataResponse = await getDatum(utxo.data_hash);
            utxo.datum = dataResponse.json_value;

            const nftDetail = await getAssetDetail(utxo.nft);

            if (nftDetail.onchain_metadata) {
              if (nftDetail.onchain_metadata.name) {
                nftDetail._name = nftDetail.onchain_metadata.name;
              }
              if (nftDetail.onchain_metadata.image) {
                nftDetail._imageUrl = transformNftImageUrl(
                  nftDetail.onchain_metadata.image
                );
              }
            }

            nftDetail.utxo = utxo.id;
            nftDetail.datum = utxo.datum;

            setTimeout(() => {
              database.saveUtxos(db, [nftDetail]);
            });
            console.log(nftDetail, "nftDetailnftDetailnftDetail");
            return nftDetail;
          }
        });

        const settledPromises = await Promise.allSettled(promises);

        const lookup = {};
        settledPromises
          .filter((v) => v.value && v.value.datum)
          .forEach((x) => {
            lookup[x.value.utxo] = x.value;
          });

        utxos.forEach((v) => (v.detail = lookup[v.id]));

        const validUtxos = utxos.filter((v) => v.detail);
        console.log("Valid market utxos", validUtxos);
        // Group items by policy
        const policyGroups = {};

        // Categorize the data into policy groups
        validUtxos.forEach((item) => {
          const policy = item.policy;
          if (!policyGroups[policy]) {
            policyGroups[policy] = [];
          }
          policyGroups[policy].push(item);
        });

        // Convert the policyGroups object into an array of arrays
        setNfts(Object.values(policyGroups));
        setUtxos(validUtxos);
        if (validUtxos.length > 0) {
          setMessage("");
        }
        if (validUtxos.length === 0) {
          setMessage("Marketplace is empty");
        }
      } catch (e) {
        if (e.status_code === 404) {
          setMessage("Marketplace is empty");
        } else {
          alert(e.message);
        }
      }
    };

    fetchData();
  }, []);
  return (
    <BuyStyled>
      {isLoading && <FullScreenLoader />}

      <Box>
        <img
          src="/images/balloon-right-1.png"
          alt="no img"
          className="buy_ballon"
        />
      </Box>
      <Strips />
      <ContainerLayout>
        <BreadCrumHeader heading=" Buy our tokens" />
        {/* Tabs and filter  */}
        <TabContext value={tabValue}>
          <Box sx={{ pb: 4, pt: 10 }}>
            <Grid container spacing={2} alignItems="center ">
              <Grid item xs={12} md={4}>
                <TabList
                  onChange={onTabChange}
                  aria-label="lab API tabs example"
                  sx={{
                    "& .MuiTabs-indicator": {
                      background: "none",
                    },
                    "& 	.Mui-selected": {
                      color: "var(--secondary-color) !important",
                      fontWeight: "bold",
                    },
                    "& 	.MuiTabs-flexContainer": {
                      flexWrap: { xs: "wrap", lg: "nowrap" },
                    },
                    "& .tab_btn": {
                      color: "#ffff",
                      minHeight: "40px",
                      marginRight: "50px",
                      border: "none !important",
                      fontSize: "12px",
                      // alignItems: "start",
                      padding: 0,
                    },
                  }}
                >
                  <Tab
                    label="Items"
                    value="single"
                    className="tab_btn initialcase"
                  />
                  <Tab
                    label="Collections "
                    value="collection"
                    className="tab_btn initialcase"
                  />
                  {/* <Tab
                    label="Trending"
                    value="trending"
                    className="tab_btn initialcase"
                  /> */}
                </TabList>
              </Grid>
              <Grid item xs={12} md={8}>
                <Filter setFilter={setFilter} filter={filter} />
              </Grid>
            </Grid>
          </Box>
          {message != "Loading" && (
            <>
              <TabPanel value="single">
                <BuyCards buy={buy} nfts={nfts[0]} />
              </TabPanel>
              <TabPanel value="collection">
                <BuyCards buy={buy} nfts={nfts[1]} />
              </TabPanel>
            </>
          )}

          {/* <TabPanel value="trending">
            <BuyCards tabValue={tabValue} />
          </TabPanel> */}
        </TabContext>

        <div className="ml-2">
          {utxos.length === 0 ? (
            <div className="text-gray-400 font-semibold text-center my-5">
              {message}
            </div>
          ) : (
            utxos.map((utxo) => (
              <div key={utxo.id} className="p-2 flex">
                <img
                  alt={utxo.assetName + "_img"}
                  className="inline-block h-32 w-32 mr-4 border-red-300 border-2"
                  style={{ width: "100px", height: "80px" }}
                  src={utxo.detail._imageUrl}
                />
                <div className="flex flex-col justify-between pb-2">
                  <div>
                    {utxo.detail._name ? (
                      <React.Fragment>
                        <a
                          href={
                            "https://testnet.cardanoscan.io/token/" + utxo.nft
                          }
                        >
                          {" "}
                          &#x29c9;{" "}
                        </a>
                        <span className="text-blue-900 text-xl font-extrabol">
                          {utxo.detail._name}
                        </span>
                        {utxo.detail?.onchain_metadata?.artist && (
                          <span className="text-gray-400 text-xs">
                            &nbsp; by {utxo.detail.onchain_metadata.artist}
                          </span>
                        )}
                      </React.Fragment>
                    ) : (
                      <span className="text-blue-700 font-extrabold">
                        {utxo.policy.substring(0, 8)}...{utxo.assetName}
                      </span>
                    )}
                    {utxo.detail?.onchain_metadata && (
                      <div>
                        {utxo.detail.onchain_metadata.description && (
                          <div className="text-gray-500">
                            {
                              utxo.detail.onchain_metadata.description
                            }
                          </div>
                        )}
                        {utxo.detail.onchain_metadata.copyright && (
                          <div className="text-gray-500">
                            Copyright: {utxo.detail.onchain_metadata.copyright}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => buy(utxo)}
                      className="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-blue-200 rounded"
                    >
                      {renderLovelace(utxo.detail?.datum?.fields[1]?.int)} Ada
                      (Buy)
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <div>
            <h2>Items with the Same Policy:</h2>
            {/* {nfts.length != 0 &&
              nfts.map((item) => (
                <div key={item.id}>
                  <p>{item.assetName}</p>
                </div>
              ))} */}
          </div>
          <div>
            <h2>Items with Different Policies:</h2>
            {/* {nftcollection.map((item) => (
              <div key={item.id}>
                <p>{item.assetName}</p>
              </div>
            ))} */}
          </div>
        </div>
      </ContainerLayout>
    </BuyStyled>
  );
};

export default Buy;

const BuyStyled = styled.section`
  .buy_ballon {
    position: absolute;
    z-index: -1;
    top: 7%;
    right: -2%;
  }
`;
