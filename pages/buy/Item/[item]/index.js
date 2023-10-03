import { BlockfrostProvider } from "@meshsdk/core";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { blockfrostApiKey } from "../../../../config/blockfrost";
import { callKuberAndSubmit } from "../../../../services/kuberService";
import {
  BaseAddress,
  Ed25519KeyHash,
  StakeCredential,
} from "@emurgo/cardano-serialization-lib-asmjs";
import { Box } from "@mui/material";
import { useWallet } from "@meshsdk/react";
import BuyCards from "../../../../components/Buy/BuyCards";

function showCollection() {
  const [nfts, setNfts] = useState(null);
  const { wallet, connected, name, connecting, connect, disconnect, error } =
    useWallet();

  const router = useRouter();
  const { item } = router.query;
  console.log("policy id ", item);
  async function fetchAssets() {
    let policy_id = item;
    if (!policy_id) return;

    try {
      const blockfrostProvider = new BlockfrostProvider(blockfrostApiKey);
      let latestAssets = await blockfrostProvider.fetchCollectionAssets(
        policy_id
      );
      latestAssets = latestAssets.assets;
      console.log(latestAssets);
      let _nfts = [];
      for (let index = 0; index < latestAssets.length; index++) {
        const item_ = latestAssets[index];
        const main = await blockfrostProvider.fetchAssetMetadata(item_.unit);

        _nfts.push({
          detail: { onchain_metadata: main },
          ...main,
          policy: policy_id,
          unit: item_.unit,
          type:0
        });
      }
      console.log("assets are", _nfts);
      setNfts(_nfts);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchAssets();
  }, [item]);
  const buy_utxo = async (utxo) => {
    console.log("buying nft", utxo);
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
    let utxos__ = await wallet.getUtxos();
    console.log({ utxos__ });
    // Create constraints for buying
    // walletAction.callback
    // const by2 = async (provider) => {

    const request = {
      selections: utxos__,
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

    return callKuberAndSubmit(wallet, JSON.stringify(request));
    // };

    // walletAction.enable = true;
  };
  return (
    <div>
      <Box sx={{ pb: 4, pt: 10 }}>
        {nfts == null ? (
          <h1>Loading NFTs...</h1>
        ) : (
          <BuyCards type={1} buy={buy_utxo} nfts={nfts} />
        )}

        {/* <BuyCards buy={buy} nfts={nfts[0]} /> */}
      </Box>
    </div>
  );
}

export default showCollection;
