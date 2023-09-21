import {
  Lucid,
  fromText,
  Blockfrost,
  Data,
  applyParamsToScript,
} from "lucid-cardano";
import {
  blockfrostUrl,
  blockfrostApiKey,
  blockfrostNetworkName,
} from "../config/blockfrostConfig";
import { bankWalletAddress } from "../config/utils";
import { cborHex } from "../config";

export const mintNFT = async (selectedValue, connectedWallet, currentAddr) => {
  console.log(selectedValue, "selectedValue mint");
  console.log(currentAddr, "currentAddr mint");
  const lucid = await Lucid.new(
    new Blockfrost(blockfrostUrl, blockfrostApiKey),
    blockfrostNetworkName
  );
  const api = await window.cardano[String(connectedWallet)].enable();
  lucid.selectWallet(api);
  const addr = await lucid.wallet.address();
  const utxos = await lucid.utxosAt(addr);
  const utxo = utxos[0];
  const tn = fromText("nft");
  const image = fromText("nft");
  let policyId = "";
  const nftPolicy = {
    type: "PlutusV2",
    script: applyParamsToScript(cborHex, [
      utxo.txHash,
      BigInt(utxo.outputIndex),
      tn,
      image,
    ]),
  };
  policyId = lucid.utils.mintingPolicyToId(nftPolicy);
  let metadataX = {};
  let metadata = JSON.parse(window.localStorage.getItem("metadata"));
  metadataX[metadata.name] = metadata;
  const unit = policyId + fromText(metadata.name);
  let obj = { [policyId]: metadataX };
  let tx;
  if (selectedValue == "b") {
    tx = await lucid
      .newTx()
      .mintAssets({ [unit]: 1n }, Data.void())
      .attachMetadata("721", obj)
      .attachMintingPolicy(nftPolicy)
      .collectFrom([utxo])
      .payToAddress(bankWalletAddress, { lovelace: 1000n })
      .complete();
  }
  if (selectedValue == "c") {
    tx = await lucid
      .newTx()
      .mintAssets({ [unit]: 1n }, Data.void())
      .attachMetadata("721", obj)
      .attachMintingPolicy(nftPolicy)
      .collectFrom([utxo])
      .payToAddress(currentAddr, { [unit]: 1n })
      .payToAddress(bankWalletAddress, { lovelace: 1000000n })
      .complete();
  }

  //   const tx = await lucid
  //     .newTx()
  //     .mintAssets({ [unit]: 1n }, Data.void())
  //     .attachMetadata("721", obj)
  //     .attachMintingPolicy(nftPolicy)
  //     .collectFrom([utxo])
  //     .payToAddress(selectedValue == "c" ? currentAddr : bankWalletAddress, {
  //       [unit]: selectedValue == "c" ? 1n : 1000n,
  //     })
  //     .complete();
  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();
  return txHash;
};

// if (con) {
//   console.log("ss");
// } else if (selectedValue === "b" || selectedValue === "c") {
//   mintNFT(selectedValue, bankWalletAddress, currentAddr);
// }
