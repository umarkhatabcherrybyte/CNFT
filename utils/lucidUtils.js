import { Lucid, fromText, Blockfrost } from "lucid-cardano";
import {
  blockfrostUrl,
  blockfrostApiKey,
  blockfrostNetworkName,
} from "../config/blockfrost";
import { seedPhrase } from "../config/walletConstants";

// Initialize a Lucid instance
export async function initializeLucid(fromSeed) {
  let lucid;
  if (fromSeed) {
    lucid = await Lucid.new(
      new Blockfrost(blockfrostUrl, blockfrostApiKey),
      blockfrostNetworkName
    );
    lucid.selectWalletFromSeed(seedPhrase);
  } else {
    lucid = await Lucid.new(
      new Blockfrost(blockfrostUrl, blockfrostApiKey),
      blockfrostNetworkName
    );
  }
  return lucid;
}
// Connect the wallet
export async function connectWallet(connectedWallet) {
  return await window.cardano[String(connectedWallet)].enable();
}
//  Function to get the address from a Lucid instance

// Function to get UTXOs for a given address from a Lucid instance
export async function getUtxosForAddress(lucid, address) {
  return await lucid.utxosAt(address);
}

//  Function to generate NFT Policy and calculate PolicyId from smart Contract
export function generatePolicyFromSmartContract(utxo, tn, image) {
  const nftPolicy = {
    type: "PlutusV2",
    script: applyParamsToScript(cborHex, [
      utxo.txHash,
      BigInt(utxo.outputIndex),
      tn,
      image,
    ]),
  };

  const policyId = lucid.utils.mintingPolicyToId(nftPolicy);

  return { nftPolicy, policyId };
}

//  Function to generate Minting Policy and calculate PolicyId from native script
export function generatePolicyFromNativeScript(
  lucidBrowser,
  paymentCredentialHash
) {
  const mintingPolicy = lucidBrowser.utils.nativeScriptFromJson({
    type: "all",
    scripts: [
      { type: "sig", keyHash: paymentCredentialHash },
      {
        type: "before",
        slot: lucidBrowser.utils.unixTimeToSlot(Date.now() + 518400000),
      },
    ],
  });

  const policyId = lucidBrowser.utils.mintingPolicyToId(mintingPolicy);

  return { mintingPolicy, policyId };
}

export async function getAddressFromLucid(lucid) {
  return await lucid.wallet.address();
}
export async function createAndSubmitTransaction(lucid, transactionConfig) {
  const {
    transactionType,
    fromAddress,
    toAddress,
    lovelaceAmount,
    metadata,
    mintingPolicy,
    validTo,
  } = transactionConfig;

  let tx;

  if (transactionType === "simple") {
    tx = await lucid
      .newTx()
      .payToAddress(toAddress, { lovelace: BigInt(lovelaceAmount) });
  } else if (transactionType === "metadata") {
    tx = await lucid
      .newTx()
      .attachMetadata("721", metadata)
      .mintAssets(metadata)
      .payToAddress(toAddress, metadata);
  } else if (transactionType === "mintingPolicy") {
    tx = await lucid
      .newTx()
      .mintAssets(metadata)
      .attachMintingPolicy(mintingPolicy)
      .payToAddress(toAddress, metadata);
  } else if (transactionType === "complex") {
    // Define complex transaction logic here
  } else {
    throw new Error(`Invalid transaction type: ${transactionType}`);
  }

  if (validTo) {
    tx.validTo(validTo);
  }

  const signedTx = await tx.complete().sign().complete();
  const txHash = await signedTx.submit();
  return txHash;
}
// Create a minting policy
export function createMintingPolicy(paymentCredential, unixTime) {
  return lucidBrowser.utils.nativeScriptFromJson({
    type: "all",
    scripts: [
      { type: "sig", keyHash: paymentCredential?.hash },
      { type: "before", slot: lucidBrowser.utils.unixTimeToSlot(unixTime) },
    ],
  });
}

// Extract metadata details
export function extractMetadata(data, uploadedImage) {
  const metadata = {
    name: data.name,
    image: `ipfs://${uploadedImage.path}`,
    mediaType: data.file.type,
  };
  if (data.description.length > 0) {
    metadata.description = data.description;
  }
  return metadata;
}

//  Function to get paymentCredential from a Lucid instance
export async function getPaymentCredential(lucidBrowser) {
  const address = await lucidBrowser.wallet.address();
  return lucidBrowser.utils.getAddressDetails(address).paymentCredential;
  // this is how you can use example
  // const paymentCredential = await getPaymentCredential(lucidBrowser); // Get the paymentCredential from the Lucid instance
}

//  function to generate a unit value
export function generateUnit(policyId, metadataName) {
  return policyId + fromText(metadataName);
}
