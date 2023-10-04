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
import { BlockfrostProvider } from "@meshsdk/core";
import { market } from "../config/marketConfig";
import { Address, BaseAddress } from "@emurgo/cardano-serialization-lib-asmjs";
import { callKuberAndSubmit } from "../services/kuberService";

export const mintNFT = async (selectedValue, connectedWallet, currentAddr) => {
  const lucid = await initializeLucid();

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
  console.log({connectedWallet, data, uploaded_image});
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
    image: `ipfs://${uploaded_image?.path}`,
    mediaType: data.file?.type,
  };
  console.log({metadata});
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

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const sellNft = async (policyId_, selectedNFTsNames) => {
  // const providerInstance = await window.cardano.nami.enable();
  // const res = await connect("Nami");
  const blockfrostProvider = new BlockfrostProvider(blockfrostApiKey);

  let selectedNFTs = [];
  let latestAssets = null;
  /** Wait until the latest transaction is mined and we obtain the assets by latest policy id */
  while (!latestAssets || latestAssets.assets.length == 0) {
    console.log("fetching assets...");
    try {
      latestAssets = await blockfrostProvider.fetchCollectionAssets(policyId_);
      console.log({ latestAssets });
    } catch (e) {}

    await delay(5000);
    // Insert some notifier here
  }
  latestAssets = latestAssets.assets;
  console.log(latestAssets, "latest assets");
  for (let index = 0; index < latestAssets.length; index++) {
    const item = latestAssets[index];
    const main = await blockfrostProvider.fetchAssetMetadata(item.unit);

    console.log("metadata is ", main);
    const url = new URL(main.image);
    // const hash = url.pathname.slice(1);
    console.log(main.name);
    if (selectedNFTsNames.includes(main.name)) {
      selectedNFTs.push({
        ...main,
        isSelling: false,
        // price: "",
        ...item,
        policyId: policyId_,
      });
    }
  }

  console.log(providerInstance, "providerInstance");

  console.log(selectedNFTs, "selectedNFTs");

  const addresses = await providerInstance.getUsedAddresses();
  console.log(addresses, "addressesaddressesaddresses");

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

  const outputs = selectedNFTs.map((asset) => ({
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
        { int: Math.round(parseFloat(40) * 1e6) },
      ],
      constructor: 0,
    },
  }));

  const selections = await providerInstance.getUtxos();
  console.log(selections, "selections");
  const body = {
    selections,
    outputs,
  };
  console.log("Selling NFTs ");
  console.log(body, "body");

  let res_ = await callKuberAndSubmit(providerInstance, JSON.stringify(body));
  await delay(15000); // 15 seconds delay
  // insert some notifier here
  console.log(res_);
  return res_;
};
