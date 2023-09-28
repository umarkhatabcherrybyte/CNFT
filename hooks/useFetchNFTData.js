import React, { useState, useEffect } from "react";
import { decodeAssetName, transformNftImageUrl } from "../scripts/wallet";
import * as database from "../scripts/database";
import { listMarket, getAssetDetail, getDatum } from "/scripts/blockfrost";

export const useFetchNFTData = () => {
  const [utxos, setUtxos] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    let db;
    const fetchData = async () => {
      try {
        db = await database.openDB();
        const response = await listMarket();
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

        setUtxos(validUtxos);
        setIsLoading(false); // Set loading to false when data is fetched

        if (validUtxos.length === 0) {
          setMessage("Marketplace is empty");
        }
      } catch (e) {
        if (e.status_code === 404) {
          setMessage("Marketplace is empty");
        } else {
          console.log(e);
          setIsLoading(false); // Set loading to false in case of an error
          //   alert(e.message);
        }
      }
    };

    fetchData();
  }, []);

  return { utxos, message, isLoading };
};
