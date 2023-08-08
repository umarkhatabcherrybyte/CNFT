import { Box } from "@mui/material";
import { useAssets, useWallet } from "@meshsdk/react";
import React, { useEffect, useState } from "react";
import { BlockfrostProvider } from "@meshsdk/core";
import { network_key } from "../../base_network";

import {
  calculatePolicyHash,
  decodeAssetName,
  listProviders,
  walletValue,
} from "../../scripts/wallet.js";
// import {
//   Address,
//   BaseAddress,
//   ScriptPubkey,
// } from "@emurgo/cardano-serialization-lib-browser";
import { Address } from "@emurgo/cardano-serialization-lib-asmjs";
const Testing = () => {
  const [nfts, setNfts] = useState([]);

  const assets = useAssets();
  const blockfrostProvider = new BlockfrostProvider(network_key);
  useEffect(() => {
    getAssets();
  }, [assets]);

  const getAssets = async () => {
    if (assets && assets.length > 0) {
      const assetMetadataPromises = assets.map(async (item) => {
        const main = await blockfrostProvider.fetchAssetMetadata(item.unit);
        const url = new URL(main.image);
        const hash = url.pathname.slice(1);
        return { ...main, image: hash, isSelling: false, price: "" }; // Replace the i
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
  useEffect(() => {
    if (wallet) {
      setInstance(wallet);
    }
  }, [wallet]);
  console.log(instance, "wallet");
  const connectWallet = async () => {
    // const res = await connect("Nami");
    const api = await window.cardano.nami.enable();
    const addresses = await api.getUsedAddresses();
    console.log(addresses, "addressesaddressesaddresses");
    console.log(api, "sellNftsellNftsellNft");
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
  };
  const handleAddButtonClick = (index, price) => {
    // Save the price and set isSelling back to false
    const updatedNfts = [...nfts];
    updatedNfts[index].isSelling = false;
    updatedNfts[index].price = price;
    setNfts(updatedNfts);
  };

  console.log(nfts, "assetsassetsassetsassets");

  return (
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
          <img src={`https://ipfs.io/ipfs${nft.image}`} alt={nft.name} />
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
  );
};

export default Testing;
