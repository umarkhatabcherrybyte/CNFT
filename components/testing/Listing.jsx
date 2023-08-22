import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { listMarket, getAssetDetail, getDatum } from "/scripts/blockfrost"; // Import your required functions/modules
import {
  decodeAssetName,
  listProviders,
  callKuberAndSubmit,
  transformNftImageUrl,
  renderLovelace,
} from "../../scripts/wallet";
import * as database from "../../scripts/database";
import { market } from "/config";
import {
  Address,
  BaseAddress,
  Ed25519KeyHash,
  StakeCredential,
} from "@emurgo/cardano-serialization-lib-asmjs";
import { useWalletState, useWalletAction } from "../../scripts/sotre";

const YourReactComponent = ({ instance }) => {
  const [walletState, setWalletState] = useWalletState();
  const walletAction = useWalletAction();

  const [message, setMessage] = useState("Loading ...");
  const [hasIndexDb, setHasIndexDb] = useState(false);
  const [utxos, setUtxos] = useState([]);
  const [providers, setProviders] = useState([]);
  const [addSelections, setAddSelections] = useState(true);
  const [interval, setInterval] = useState(0);
  const [timeout, setTimeout] = useState(0);
  console.log(utxos, "utxos");
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

        setUtxos(validUtxos);

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

  const mapDescription = (desc) => {
    return Array.isArray(desc) ? desc.join("") : desc;
  };

  const buy = async (utxo) => {
    const datum = utxo.detail.datum;
    const cost = datum.fields[1].int;
    const sellerPubKeyHashHex = datum.fields[0].fields[0].fields[0].bytes;
    const sellerStakeKeyHashHex =
      datum.fields[0].fields[1].fields[0].fields[0].fields[0].bytes;
    const vkey = StakeCredential.from_keyhash(
      Ed25519KeyHash.from_bytes(Buffer.from(sellerPubKeyHashHex, "hex"))
    );
    const stakeKey = StakeCredential.from_keyhash(
      Ed25519KeyHash.from_bytes(Buffer.from(sellerStakeKeyHashHex, "hex"))
    );
    const sellerAddr = BaseAddress.new(0, vkey, stakeKey);

    // Create constraints for buying
    // walletAction.callback
    // const by2 = async (provider) => {
    const request = {
      selections: await instance.getUtxos(),
      inputs: [
        {
          address: market.address,
          utxo: {
            hash: utxo.tx_hash,
            index: utxo.tx_index,
          },
          script: market.script,
          redeemer: { fields: [], constructor: 0 },
        },
      ],
      outputs: [
        {
          address: sellerAddr
            .to_address()
            .to_bech32(
              market.address.startsWith("addr_test") ? "addr_test" : "addr"
            ),
          value: cost,
          insuffientUtxoAda: "increase",
        },
      ],
    };

    return callKuberAndSubmit(instance, JSON.stringify(request));
    // };

    // walletAction.enable = true;
  };

  const save = (v) => {
    localStorage.setItem("editor.content", v);
  };

  return (
    <div>
      buy NFT
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
                          {mapDescription(
                            utxo.detail.onchain_metadata.description
                          )}
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
    </div>
  );
};

export default YourReactComponent;
