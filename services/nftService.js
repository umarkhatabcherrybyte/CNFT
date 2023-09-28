import { Lucid, fromText, Blockfrost, Data } from "lucid-cardano";
import {
  blockfrostUrl,
  blockfrostApiKey,
  blockfrostNetworkName,
} from "../config/blockfrost";
import { bankWalletAddress, seedPhrase } from "../config/walletConstants";
import {
  connectWallet,
  createTextValue,
  generatePolicyFromSmartContract,
  generateUnit,
  getAddressFromLucid,
  getUtxosForAddress,
  initializeLucid,
  signAndSubmitTransaction,
} from "../utils/lucidUtils";
export const mintNFT = async (selectedValue, connectedWallet, currentAddr) => {
  const lucid = await initializeLucid(true);

  const api = await connectWallet(connectedWallet);
  lucid.selectWallet(api);
  const addr = await getAddressFromLucid(lucid);
  const utxos = await getUtxosForAddress(lucid, addr);
  const utxo = utxos[0];
  const tn = createTextValue("nft");
  const image = createTextValue("nft");
  const { nftPolicy, policyId } = generatePolicyFromSmartContract(
    lucid,
    utxo,
    tn,
    image
  );

  let metadataX = {};
  let metadata = JSON.parse(window.localStorage.getItem("metadata"));

  metadataX[metadata.name] = metadata;
  const unit = generateUnit(policyId, metadata.name);
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

  const txHash = await signAndSubmitTransaction(tx);
  return txHash;
};
export const transferNFT = async (connectedWallet, data, uploaded_image) => {
  const transferLucid = await Lucid.new(
    new Blockfrost(blockfrostUrl, blockfrostApiKey),
    blockfrostNetworkName
  );

  transferLucid.selectWalletFromSeed(seedPhrase);
  const lucidBrowser = await Lucid.new(
    new Blockfrost(blockfrostUrl, blockfrostApiKey),
    blockfrostNetworkName
  );

  const api = await window.cardano[String(connectedWallet)].enable();
  lucidBrowser.selectWallet(api);

  const { paymentCredential } = lucidBrowser.utils.getAddressDetails(
    await lucidBrowser.wallet.address()
  );
  const mintingPolicy = lucidBrowser.utils.nativeScriptFromJson({
    type: "all",
    scripts: [
      { type: "sig", keyHash: paymentCredential?.hash },
      {
        type: "before",
        slot: lucidBrowser.utils.unixTimeToSlot(Date.now() + 518400000),
      },
    ],
  });

  const policyId = lucidBrowser.utils.mintingPolicyToId(mintingPolicy);
  let metadataX = {};
  let metadata = {
    name: data.name,
    image: `ipfs://${uploaded_image.path}`,
    mediaType: data.file.type,
  };
  if (data.description.length > 0) {
    metadata["description"] = data.description;
  }
  metadataX[metadata.name] = metadata;
  // console.log(metadataX, "dsadasd");
  const unit = policyId + fromText(metadata.name);

  let obj = { [policyId]: metadataX };
  const tx = await lucidBrowser
    .newTx()
    .attachMetadata("721", obj)
    .mintAssets({ [unit]: 1n })
    .payToAddress(await transferLucid.wallet.address(), {
      [unit]: 1n,
    })
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(mintingPolicy)
    .complete();
  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();
  return txHash;
};
