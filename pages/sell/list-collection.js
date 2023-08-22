import React, { useState, useEffect, useRef } from "react";
import ContainerLayout from "/components/shared/ContainerLayout";
import Header from "/components/Mint/shared/Header";
import Layout from "/components/Mint/Layout";
import styled from "styled-components";
import UploadService from "/services/upload-files.service";
import { Toast } from "/components/shared/Toast";
import download from "js-file-download";
import { Delete } from "@mui/icons-material";
import ExcelSpreadSheet from "/components/Mint/Mint Collection/ExcelSpreadSheet";
import { Box, Button, Grid } from "@mui/material";
import CaptionHeading from "/components/shared/headings/CaptionHeading";
import LightText from "/components/shared/headings/LightText";
import { useRouter } from "next/router";
import { create } from "ipfs-http-client";
import { INSTANCE } from "../../config/axiosInstance";
import { setStep } from "../../redux/listing/ListingActions";
import { useDispatch, useSelector } from "react-redux";
import { useLovelace, useWallet } from "@meshsdk/react";
import { Lucid, fromText, Blockfrost } from "lucid-cardano";
import { getObjData } from "../../helper/localStorage";
import { transactionErrorHanlder } from "../../helper/transactionError";
import { seedPhraseMainnet } from "../../config/utils";
import { seedPhrasePreprod } from "../../config/utils";
import { getClientIp } from "../../helper/clientIP";
import { network_name, network_url, network_key } from "../../base_network";
const ListCollectionStep2 = () => {
  const lovelace = useLovelace();

  const dispatch = useDispatch();
  const { step } = useSelector((store) => store.listing);
  const router = useRouter();
  const [selectedFiles, setSeletedFiles] = useState([]);
  const [metaFile, setMetaFile] = useState(undefined);
  const [metaData, setMetaData] = useState([]);
  const [progressInfos, setProgressInfos] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [connectedWallet, setConnectedWallet] = useState("");
  const [isWebform, setIsWebform] = useState(false);
  const [metadataFileUploaded, setMetadataFileUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [metadataObjects, setMetadataObjects] = useState([]);
  const [metadataObjectsFromFile, setMetadataObjectsFromFile] = useState([]);
  const [metadataObjectProperties, setMetadataObjectProperties] = useState([]);
  let _progressInfos = [];

  const metaFileInputRef = useRef(null);
  const hiddenFileInputRef = useRef(null);
  const metaFileLabelRef = useRef(null);
  const selectedFilesLabelRef = useRef(null);

  const { wallet, connected } = useWallet();
  const [currentAddr, setCurrentAddr] = useState("");
  const [selectedValue, setSelectedValue] = React.useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.getItem("connectedWallet", imagePaths);
      // window.localStorage.getItem("metadataObjects", metadataObjects);
    }
  }, []);

  const onDeleteFile = (index_num) => {
    const files = selectedFiles.filter((item, index) => {
      return index !== index_num;
    });
    const imagePathObjs = imagePaths.filter((item, index) => {
      return index !== index_num;
    });
    setSeletedFiles(files);
    setImagePaths(imagePathObjs);
  };
  const onSelectedFiles = (e) => {
    if (e.target.files) {
      var temp = selectedFiles ? [...selectedFiles] : [];
      for (let i = 0; i < e.target.files.length; i++) {
        const files = e.target.files[i];
        temp.push(files);
      }
      // console.log(e.target.files.length, temp.length, "length");
      setSeletedFiles(temp);
      setMetadataFileUploaded(false);
      selectedFilesLabelRef.current.innerHTML = `${temp.length} files choosen`;
    } else {
      selectedFilesLabelRef.current.innerHTML = `No file choosen`;
    }
  };

  const onSelectMetaFile = (e) => {
    if (e.target.files) {
      metaFileLabelRef.current.innerHTML = `${e.target.files[0].name}`;
    } else {
      metaFileLabelRef.current.innerHTML = `No file choosen`;
    }

    metaFileLabelRef.current.innerHTML = metaFileInputRef.current.value;
    setMetaFile(e.target.files[0]);
  };

  function uploadMeta() {
    if (metaFile == undefined || metaFile == null) {
      Toast("error", "Select A File And Try Again");
    } else {
      const file = metaFile;
      const path = connectedWallet + "_" + walletAddress;
      UploadService.uploadMeta(file, path, (event) => {})
        .then((response) => {
          if (response.data.data.length > 0) {
            setMetadataObjectsFromFile(response.data.data || []);
            window.localStorage.setItem(
              "metadataObjects",
              JSON.stringify(response.data.data)
            );
            setMetadataFileUploaded(true);
            metaFileInputRef.current.value = null;
            metaFileLabelRef.current.innerHTML = "No file choosen";
            // setMetaFile(null);
            Toast("success", "Uploaded Metadata Successfully");
          }
        })
        .catch((e) => {
          console.log(e);
          setMetadataFileUploaded(false);
        });
    }
  }

  const uploadFilesIPFS = async () => {
    if (selectedFiles.length > 0) {
      setImagePaths([]);
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
        let arr = [];
        for (let index = 0; index < selectedFiles.length; index++) {
          const uploaded_image = await client.add(selectedFiles[index]);
          console.log(uploaded_image, selectedFiles[index], "img");
          if (uploaded_image) {
            arr.push({
              path: uploaded_image.path,
              file_mimeType: selectedFiles[index].type,
            });
          }
        }
        setImagePaths(arr);
        // console.log()
        setMetadataFileUploaded(true);
        Toast("success", "Files Uploaded Successfully");
      } catch (error) {
        console.log(error, "err");
        setIsUploading(false);
        Toast("error", "Uploading failed.");
      }
    } else {
      Toast("error", "Select A File And Try Again.");
      setIsUploading(false);
    }
  };

  function upload(path, idx, file) {
    _progressInfos = [..._progressInfos];
    UploadService.upload(file, path, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos(_progressInfos);
    })
      .then((response) => {
        setMetaData([]);
        t();
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos(_progressInfos);
      });

    function t() {
      UploadService.getFiles(connectedWallet + "_" + walletAddress).then(
        (files) => {
          setFileInfos(files.data);
        }
      );
    }
  }

  async function onNextStep() {
    console.log(metaFile, "dasd");
    if (!isWebform && metaFile && metadataObjectsFromFile.length > 0) {
      mintCollection(metadataObjectsFromFile);
      return;
    } else if (!isWebform && metaFile && !metadataFileUploaded) {
      Toast("error", "Please Upload Metadata File First");
      return;
    } else if (isWebform && imagePaths.length == 0) {
      Toast("error", "Please Upload NFT Files1");
      return;
    } else if (isWebform && imagePaths.length > metadataObjects.length) {
      Toast("error", "You Need To Add More Metadata");
      return;
    } else if (isWebform && imagePaths.length < metadataObjects.length) {
      Toast("error", "You Need To Add More NFT Files");
      return;
    }
    let objs = convertMetadataObjects();
    // console.log(objs, "onjs");
    if (imagePaths.length == 0) {
      Toast("error", "Please Upload NFT Files2");
      return;
    } else if (!validateCollectionData(objs)) {
      console.log("here");
      return;
    } else if (isWebform && objs.length != imagePaths.length) {
      Toast("error", "missing metadata of some Files");
      return;
    } else if (!isWebform && metadataObjects.length != imagePaths.length) {
      Toast("error", "missing metadata of some Files");
      return;
    } else if (
      !isWebform &&
      metadataObjects.length == imagePaths.length &&
      metadataFileUploaded
    ) {
      mintCollection(objs);
    } else if (isWebform) {
      mintCollection(objs);
    }
  }

  function onBackStep() {
    navigate("/mint");
  }

  function onRemoveImage(fileName) {
    const path = connectedWallet + "_" + walletAddress;
    UploadService.remove(fileName, path)
      .then((response) => {
        Toast("success", response.data.message);
        return UploadService.getFiles(path);
      })
      .then((response) => {
        setFileInfos(response.data);
      })
      .catch((e) => {
        Toast("error", "Remove images failed. " + e.message);
      });
  }

  const convertMetadataObjects = () => {
    let metadataObjectPropertiesClone = metadataObjects;
    let metadataArr = [];
    for (let index = 0; index < metadataObjectPropertiesClone.length; index++) {
      let obj = {};
      const element = metadataObjectPropertiesClone[index];
      for (let index = 0; index < metadataObjectProperties.length; index++) {
        obj[metadataObjectProperties[index]] =
          element[Object.keys(element)[index]];
      }
      obj["ipfs"] = imagePaths[index].path;
      obj["image"] = `ipfs://${imagePaths[index].path}`;
      obj["mediaType"] = imagePaths[index].file_mimeType;
      // ipfs: uploaded_image.path
      metadataArr.push(obj);
    }
    // console.log(metadataArr, "arr");
    return metadataArr;
  };

  const convertToJson = () => {
    const excelData = excelRef.current.convertToJson();
    const objectKey = excelData[0];
    let convertedJson = {
      Metadata: [],
    };
    excelData.map((row, index) => {
      if (index !== 0) {
        let oneObject = {
          ImageName: row[1],
          attributes: {},
        };
        row.map((value, indexAttr) => {
          if (indexAttr > 1) {
            oneObject.attributes[objectKey[indexAttr]] = value;
          }
        });
        convertedJson.Metadata = [...convertedJson.Metadata, oneObject];
      }
    });

    // const path = connectedWallet + "_" + walletAddress;
    // UploadService.uploadWebExcelMeta(
    //   JSON.stringify(convertedJson),
    //   path,
    //   (event) => {}
    // )
    //   .then((response) => {
    //     Toast("success", "Upload Metadata successed.");
    //     setMetaDataURL(
    //       `/resources/static/assets/uploads/meta/${path}/metadata.json`
    //     );
    //   })
    //   .catch((e) => {
    //     Toast("error", e.message);
    //   });
  };

  const metaFileDown = () => {
    const path = connectedWallet + "_" + walletAddress;
    UploadService.downloadMetafile(path, (event) => {})
      .then((response) => {
        const metadata = JSON.stringify(response.data, null, 2);
        download(metadata, "metadata.json");
      })
      .catch((e) => {
        Toast("error", e.message);
      });
  };

  const onFileInputButton = () => {
    // console.log("onFileInputButton");
    hiddenFileInputRef.current.click();
  };

  const onMetaFileInputButton = () => {
    metaFileInputRef.current.click();
  };

  const viewImagesPaths = () => {
    console.log(imagePaths, "o");
  };

  const validateCollectionData = (objs) => {
    if (objs.length > 0) {
      for (let index = 0; index < objs.length; index++) {
        if (
          !(
            Object.keys(objs[index]).includes("name") ||
            Object.keys(objs[index]).includes("Name")
          ) ||
          !(
            Object.keys(objs[index]).includes("price") ||
            Object.keys(objs[index]).includes("Price")
          )
        ) {
          Toast(
            "error",
            "You need to have both name and price properties in the webform"
          );
          return false;
        }
      }

      var valueArr = objs.map(function (item) {
        return item.name;
      });
      var isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) != idx;
      });
      // console.log(isDuplicate, "dup");
      if (isDuplicate) {
        Toast("error", "You have duplicate names in the webform!");
        // console.log(isDup)
        return false;
      } else {
        return true;
      }
    } else {
      // console.log('no itemsd')
      Toast("error", "No Metadata Objects Found");
      return false;
    }
  };

  const mintCollection = async (metadataObjects) => {
    const listing_previous = getObjData("listing");
    try {
      let connectedWallet = window.localStorage.getItem("connectedWallet");
      if (connected) {
        if (lovelace < 1000000) {
          Toast(
            "error",
            "You do not have enough Ada to complete this transaction"
          );
          return;
        } else {
          // const transferLucid = await Lucid.new(
          //   new Blockfrost(
          //     "https://cardano-mainnet.blockfrost.io/api/v0",
          //     "mainnetbKUUusjHiU3ZmBEhSUjxf3wgs6kiIssj"
          //   ),
          //   "Mainnet"
          // );
          const transferLucid = await Lucid.new(
            new Blockfrost(network_url, network_key),

            network_name
          );
          transferLucid.selectWalletFromSeed(seedPhraseMainnet);

          // const lucid = await Lucid.new(
          //   new Blockfrost(
          //     "https://cardano-mainnet.blockfrost.io/api/v0",
          //     "mainnetbKUUusjHiU3ZmBEhSUjxf3wgs6kiIssj"
          //   ),
          //   "Mainnet"
          // );
          const lucid = await Lucid.new(
            new Blockfrost(network_url, network_key),

            network_name
          );

          const api = await window.cardano[String(connectedWallet)].enable();
          lucid.selectWallet(api);

          const { paymentCredential } = lucid.utils.getAddressDetails(
            await lucid.wallet.address()
          );

          const mintingPolicy = lucid.utils.nativeScriptFromJson({
            type: "all",
            scripts: [
              { type: "sig", keyHash: paymentCredential?.hash },
              {
                type: "before",
                slot: lucid.utils.unixTimeToSlot(Date.now() + 518400000),
              },
            ],
          });

          const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
          let obj,
            assetObj = {},
            metadataX = {};

          // console.log(metadataObjects, "metadasd");

          let arr = [];
          let prices = [];
          let lovelace = [];

          for (let index = 0; index < metadataObjects.length; index++) {
            const element = metadataObjects[index];
            metadataX[element.name] = element;
            // console.log(metadataX, 'dsadasd')
            assetObj[String(policyId + fromText(element.name))] = 1n;
            obj = { [policyId]: metadataX };
            prices.push(element.price);
            lovelace.push(element.price * 10000000);
            // prices.push(element.price * 10000000);
            delete element["price"];
            // element["unit"] = String(policyId + fromText(element.name))
            // arr.push(element)
          }
          // console.log(assetObj, 'onjf')
          // debugger

          const txL = await lucid
            .newTx()
            .validTo(Date.now() + 100000)
            .attachMintingPolicy(mintingPolicy)
            .mintAssets(assetObj)
            .payToAddress(await transferLucid.wallet.address(), assetObj)
            .attachMetadata("721", obj)
            .complete();

          const signedTxL = await txL.sign().complete();
          const txHashL = await signedTxL.submit();
          if (txHashL) {
            const user_id = window.localStorage.getItem("user_id");
            for (let index = 0; index < metadataObjects.length; index++) {
              const element = metadataObjects[index];
              element["unit"] = String(policyId + fromText(element.name));
              element["price"] = Number(prices[index]);

              arr.push(element);
            }
            // debugger
            const data = {
              metadata: arr,
              prices,
              user_id: user_id,
              recipient_address: await lucid.wallet.address(),
              policy_id: policyId,
              type: "collection",
              minting_policy: JSON.stringify(mintingPolicy),
              // asset_hex_name: unit,
            };
            const res = await INSTANCE.post("/collection/create", data);
            if (res) {
              window.localStorage.setItem(
                "listing",
                JSON.stringify({ ...listing_previous, ...res?.data.data })
              );
              dispatch(setStep("step2"));
              router.push({
                pathname: "/sell",
                query: {
                  type: "add-listing",
                },
              });
            }
          }
        }
      } else {
        Toast("error", "You are Not Connected");
      }
    } catch (e) {
      console.log("error", e);
      transactionErrorHanlder(e, "mint");
      const clientIp = await getClientIp();
      if (clientIp) {
        try {
          const response = await INSTANCE.post(`/log/create`, {
            error: JSON.stringify(error),
            ip: clientIp,
            type: "list-collection",
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      // console.log(e)
    }
  };

  return (
    <Step1Styled>
      <ContainerLayout>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Header heading="List Your Collection" />
          </Grid>
        </Grid>
        <Layout>
          <Box>
            <Box className="upload-files-wrapper">
              <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                  <Box className="file-input-wrapper">
                    <div
                      className="file-select-button"
                      onClick={() => {
                        onFileInputButton();
                      }}
                    >
                      <label style={{ padding: "10px", fontSize: "14px" }}>
                        Choose File
                      </label>
                      <Box sx={{ padding: "10px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17.228"
                          height="17.227"
                          viewBox="0 0 17.228 17.227"
                        >
                          <g
                            id="Group_349"
                            data-name="Group 349"
                            transform="translate(2842.371 3400.371)"
                          >
                            <path
                              id="Path_189"
                              data-name="Path 189"
                              d="M19.728,22.5v3.384a1.692,1.692,0,0,1-1.692,1.692H6.192A1.692,1.692,0,0,1,4.5,25.884V22.5"
                              transform="translate(-2845.871 -3411.72)"
                              fill="none"
                              stroke="#000"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            />
                            <path
                              id="Path_190"
                              data-name="Path 190"
                              d="M18.96,8.73,14.73,4.5,10.5,8.73"
                              transform="translate(-2848.487 -3403.871)"
                              fill="none"
                              stroke="#000"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            />
                            <path
                              id="Path_191"
                              data-name="Path 191"
                              d="M18,4.5V14.652"
                              transform="translate(-2851.758 -3403.871)"
                              fill="none"
                              stroke="#000"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            />
                          </g>
                        </svg>
                      </Box>
                    </div>
                    <div>
                      <label
                        className="upload-file-label"
                        ref={selectedFilesLabelRef}
                      >
                        {selectedFiles.length > 0
                          ? `${selectedFiles.length} files choosen`
                          : "No file chosen"}
                      </label>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={hiddenFileInputRef}
                      multiple
                      onChange={(e) => onSelectedFiles(e)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    className="btn w_100"
                    // disabled={!selectedFiles}
                    onClick={() => uploadFilesIPFS()}
                  >
                    Upload
                  </Button>
                </Grid>
                <Grid xs={12} item>
                  <Box
                    className="br_15"
                    sx={{ background: "var(--box-color)" }}
                  >
                    {selectedFiles.length > 0 &&
                      selectedFiles.map((file, index) => (
                        <Box
                          key={index}
                          className="space_between"
                          sx={{
                            py: 1,
                            px: 2,
                            borderBottom: "1px solid #fff",
                            "&:last-child": {
                              border: "none",
                            },
                          }}
                        >
                          <Box>
                            <Box className="flex_align">
                              <Box sx={{ pr: 2 }}>
                                <CaptionHeading heading={index + 1} />
                              </Box>
                              <LightText heading={`${file?.name}`} />
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              "&:hover": {
                                opacity: "0.7",
                                cursor: "pointer",
                              },
                            }}
                          >
                            <Delete onClick={() => onDeleteFile(index)} />
                          </Box>
                        </Box>
                      ))}
                  </Box>
                </Grid>
              </Grid>
              {progressInfos &&
                progressInfos.map((progressInfo, index) => (
                  <>
                    {progressInfo.percentage !== 100 && (
                      <div className="mb-2" key={index}>
                        <span>{progressInfo.fileName}</span>
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-info"
                            role="progressbar"
                            aria-valuenow={progressInfo.percentage}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: progressInfo.percentage + "%" }}
                          >
                            {progressInfo.percentage}%
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              {/* <div className="row file-list">
                {fileInfos && !metaData.length ? (
                  <table className="table text-white file-list-table">
                    <tbody>
                      {fileInfos.map((file, index) => (
                        <tr key={index}>
                          <td>{file.name}</td>
                          <td style={{ width: "50px" }}>
                            <DeleteForever
                              onClick={() => onRemoveImage(file.name)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="table text-white file-list-table">
                    <thead>
                      <tr>
                        <td>Image</td>
                        {Object.keys(metaData[0].attributes).map(
                          (attr, index) => (
                            <td key={index}>{attr}</td>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {metaData.length &&
                        metaData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.ImageName}</td>
                            {Object.values(row.attributes).map(
                              (attr, index) => (
                                <td key={index}>{attr}</td>
                              )
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div> */}
            </Box>
            <Box>
              <Header
                heading="Add Metadata"
                desc="Royalty fees may be set up to 15%; However, the lower your royalty fee, the better chance that your NFT(s) will sell. Royalty fees in excess of 10% are not recommended."
              />
            </Box>

            <Grid
              container
              spacing={3}
              sx={{
                "& .max_btn": {
                  maxWidth: { xs: "100%", md: "200px" },
                },
              }}
            >
              <Grid xs={12} md={8} item>
                <div className="col-9 file-input-wrapper">
                  <div
                    className="file-select-button"
                    onClick={() => onMetaFileInputButton()}
                  >
                    <label style={{ padding: "10px", fontSize: "14px" }}>
                      Choose File
                    </label>
                    <div style={{ padding: "10px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.228"
                        height="17.227"
                        viewBox="0 0 17.228 17.227"
                      >
                        <g
                          id="Group_349"
                          data-name="Group 349"
                          transform="translate(2842.371 3400.371)"
                        >
                          <path
                            id="Path_189"
                            data-name="Path 189"
                            d="M19.728,22.5v3.384a1.692,1.692,0,0,1-1.692,1.692H6.192A1.692,1.692,0,0,1,4.5,25.884V22.5"
                            transform="translate(-2845.871 -3411.72)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                          <path
                            id="Path_190"
                            data-name="Path 190"
                            d="M18.96,8.73,14.73,4.5,10.5,8.73"
                            transform="translate(-2848.487 -3403.871)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                          <path
                            id="Path_191"
                            data-name="Path 191"
                            d="M18,4.5V14.652"
                            transform="translate(-2851.758 -3403.871)"
                            fill="none"
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label className="upload-file-label" ref={metaFileLabelRef}>
                      No file choosen
                    </label>
                  </div>
                  <input
                    type="file"
                    accept=".xlsx, .json"
                    onChange={(e) => onSelectMetaFile(e)}
                    ref={metaFileInputRef}
                  />
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <Button
                  className="btn  w_100"
                  // disabled={!metaFile}
                  onClick={() => uploadMeta()}
                >
                  Upload
                </Button>
              </Grid>
              {/* <Grid item md={2} xs={12}>
                <Button onClick={viewImagesPaths} className="btn w_100">
                  Verify
                </Button>
              </Grid> */}
              <Grid xs={12} item>
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={isWebform}
                    onChange={() => setIsWebform(!isWebform)}
                  />
                  Use a webform
                </label>
              </Grid>

              <ExcelSpreadSheet
                metadataObjects={metadataObjects}
                setMetadataObjects={setMetadataObjects}
                metadataObjectProperties={metadataObjectProperties}
                setMetadataObjectProperties={setMetadataObjectProperties}
                isWebform={isWebform}
              />
              <Grid item xs={12} sx={{ marginTop: 5, display: "flex" }}>
                {/* <Box className="max_btn w_100" sx={{ mr: 2 }}>
                  <Button className="btn2 w_100 " onClick={() => onBackStep()}>
                    Back
                  </Button>
                </Box> */}
                <Box className="max_btn w_100">
                  <Button className="btn2 w_100" onClick={() => onNextStep()}>
                    Next
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </ContainerLayout>
    </Step1Styled>
  );
};

export default ListCollectionStep2;
const Step1Styled = styled.section`
  .file-input-wrapper {
    height: 53px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    display: flex;
    align-items: center;
    padding-left: 0 !important;
    input[type="file"] {
      display: none;
    }
  }
  .file-select-button {
    display: flex;
    align-items: center;
    color: black;
    background: white;
    border-radius: 10px;
    height: 100%;
    margin-right: 10px;
  }
  .file-input-button {
    display: flex;
    color: black;
    background: white;
    width: fit-content;
    padding: 5px;
    height: 100%;
    border-radius: 10px;
  }
  .browse {
    position: relative;
    width: max-content;
    height: auto;
    margin: 0px auto;
    margin-bottom: 55px;
    cursor: pointer;
    #upload_file {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    &:hover {
      .btn-main {
        box-shadow: 2px 2px 20px 0px rgba(131, 100, 226, 0.5);
        transition: all 0.3s ease;
      }
    }
  }
  .panel-header {
    padding-left: 1rem;
    h2 {
      color: #fff;
    }
    span {
      color: #fff !important;
      font-size: 1.2rem;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
  .CreateButton {
    color: rgba(69, 230, 189, 1);
    overflow: visible;
    width: 190px;
    height: 30px;
    margin-left: auto;
  }
  .form-label,
  .form-check-label {
    color: white;
    .form-check-input {
      margin-right: 10px;
    }
  }
  .file-table {
    max-height: 480px;
  }
  .excel-spredsheet {
    padding-left: 0px;
  }
  .SpreadsheetGrid__cell_active {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .excel-header-input {
    width: 100%;
    height: 100%;
    background-color: #827789;
    border: none;
    text-align: center;
    outline: none;
  }
  .excel-cell-input {
    width: 100%;
    height: 100%;
    border: none;
    text-align: left;
    outline: none;
  }
  .excel-header-input:focus {
    border: 1px solid orange !important;
  }
  .excel-cell-input:focus {
    border: solid 1px;
  }
  .SpreadsheetGrid__headCell {
    padding: 0;
  }
  .SpreadsheetGrid__cell {
    padding: 0;
  }
  .excel-header-div {
    height: 100%;
    width: 100%;
    display: flex;
  }
  .excel-header-button-div {
    display: flex;
    flex-direction: column;
  }
  .SpreadsheetGridInput:focus {
    border: solid 1px;
  }
  .upload-files-wrapper,
  .metafiles-wrapper {
    .file-list {
      max-height: 320px;
      overflow: auto;
      margin-top: 15px;
      td {
        border: none;
      }
      .file-list-table {
        border-radius: 15px;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 15px;
      }
    }
    table {
      padding: 0.5rem 1.5rem;
      height: 1rem !important;
      border-spacing: 0rem !important;
    }
    th,
    tr {
      border-bottom: 0.05rem solid rgba(197, 197, 197, 0.3) !important;
      height: 1rem !important;
      border-spacing: 0rem !important;
    }
    tr:last-child {
      border: none !important;
    }
    .upload-file-label {
      color: white;
    }
    .meta-button-group {
      display: flex;
      justify-content: space-around;
    }
  }
  .disabled-div {
    pointer-events: none;
    opacity: 0.4;
  }
  .step-button-group {
    display: flex;
    justify-content: center;
    gap: 30px;
  }
  .webform-spliter {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
`;
