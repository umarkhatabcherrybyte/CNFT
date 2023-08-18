import { Box } from "@mui/material";
import { useAssets, useWallet } from "@meshsdk/react";
import React, { useEffect, useState } from "react";
import { BlockfrostProvider } from "@meshsdk/core";
import { network_key } from "../../base_network";
import { market } from "../../config";
import Listing from "/components/testing/Listing.jsx"
import {
  calculatePolicyHash,
  decodeAssetName,
  listProviders,
  walletValue,
  callKuberAndSubmit,
  transformNftImageUrl,
} from "../../scripts/wallet.js";
// import {
//   Address,
//   BaseAddress,
//   ScriptPubkey,
// } from "@emurgo/cardano-serialization-lib-browser";
import { Address, BaseAddress } from "@emurgo/cardano-serialization-lib-asmjs";
const Testing = () => {
  const [nfts, setNfts] = useState([]);

  const assets = useAssets();
  const blockfrostProvider = new BlockfrostProvider(network_key);
  useEffect(() => {
    getAssets();
  }, [assets]);
  // console.log(nfts, "assets");
  const getAssets = async () => {
    if (assets && assets.length > 0) {
      const assetMetadataPromises = assets.map(async (item) => {
        const main = await blockfrostProvider.fetchAssetMetadata(item.unit);
        const url = new URL(main.image);
        const hash = url.pathname.slice(1);
        return { ...main, image: hash, isSelling: false, price: "", ...item }; // Replace the i
      });

      const data = await Promise.all(assetMetadataPromises);
      // You can now use the data array containing all the resolved results.
      setNfts(data); // Update the state with the final array
    }
  };
  const handleSellButtonClick = (index) => {
    // Set isSelling to true to show the price input field
    const updatedNfts = [...nfts];
    updatedNfts[index].isSelling = true;
    setNfts(updatedNfts);
  };
  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();
  const [instance, setInstance] = useState(null);
  // useEffect(() => {
  //   if (wallet) {
  //     setInstance(wallet);
  //   }
  // }, [wallet]);
  // console.log(instance, "wallet");
  const connectWallet = async () => {
    const api = await window.cardano.nami.enable();
    const res = await connect("Nami");
    setInstance(api);
    // const addresses = await api.getUsedAddresses();
    // console.log(addresses, "addressesaddressesaddresses");
    // console.log(api, "sellNftsellNftsellNft");
  };
  const sellNft = async (providerInstance, asset) => {
    console.log(providerInstance, "providerInstance");
    console.log(asset, "asset");
    const addresses = await providerInstance.getUsedAddresses();
    console.log(addresses, "addressesaddressesaddresses");

    console.log(
      Address.from_bytes(Uint8Array.from(Buffer.from(addresses[0], "hex")))
    );

    const sellerAddr = BaseAddress.from_address(
      Address.from_bytes(Uint8Array.from(Buffer.from(addresses[0], "hex")))
    );
    console.log("sellerAddr", sellerAddr);
    const sellerPkh = Buffer.from(
      sellerAddr.payment_cred().to_keyhash().to_bytes()
    ).toString("hex");
    const sellerStakeKey = Buffer.from(
      sellerAddr.stake_cred().to_keyhash().to_bytes()
    ).toString("hex");
    const body = {
      selections: await providerInstance.getUtxos(),
      outputs: [
        {
          address: market.address,
          value: `${asset.policyId}.${asset.name}`,
          datum: {
            fields: [
              {
                fields: [
                  { fields: [{ bytes: `${sellerPkh}` }], constructor: 0 }, // pubkeyhash
                  {
                    fields: [
                      {
                        fields: [
                          {
                            fields: [{ bytes: `${sellerStakeKey}` }],
                            constructor: 0,
                          },
                        ],
                        constructor: 0,
                      },
                    ],
                    constructor: 0,
                  }, // stakekeyHash
                ],
                constructor: 0,
              },
              // sellAmount: "",
              { int: Math.round(parseFloat(40) * 1e6) },
            ],
            constructor: 0,
          },
        },
      ],
    };
    callKuberAndSubmit(providerInstance, JSON.stringify(body));
  };
  const handleAddButtonClick = (index, price) => {
    // Save the price and set isSelling back to false
    const updatedNfts = [...nfts];
    updatedNfts[index].isSelling = false;
    updatedNfts[index].price = price;
    setNfts(updatedNfts);
  };

  // console.log(nfts, "assetsassetsassetsassets");

  return (
    <>
    <Box
      sx={{
        height: "40vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p onClick={() => connectWallet()}>connect wallet</p>
      {nfts.map((nft, index) => (
        <div key={index}>
          <h2>{nft.name}</h2>
          <img src={`https://ipfs.io/ipfs${nft.image}`} alt={nft.name} style={{width:"100px" , height:"100px"}} />
          <p>{nft.description}</p>
          {nft.isSelling ? (
            <>
              <input
                type="text"
                value={nft.price}
                onChange={(e) => {
                  const updatedNfts = [...nfts];
                  updatedNfts[index].price = e.target.value;
                  setNfts(updatedNfts);
                }}
              />
              <button onClick={() => handleAddButtonClick(index, nft.price)}>
                Add
              </button>
            </>
          ) : (
            <button onClick={() => sellNft(instance, nft)}>Sell</button>
            // <button onClick={() => handleSellButtonClick(index)}>Sell</button>
          )}
        </div>
      ))}
    </Box>
    <p>hello</p>
    <Listing instance={instance}/>
    </>
  );
};

export default Testing;
