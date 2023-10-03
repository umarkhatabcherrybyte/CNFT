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
  generatePolicyFromNativeScript,
  generatePolicyFromSmartContract,
  generateUnit,
  getAddressFromLucid,
  getPaymentCredential,
  getUtxosForAddress,
  initializeLucid,
  signAndSubmitTransaction,
} from "../utils/lucidUtils";
import { Address, BaseAddress } from "@emurgo/cardano-serialization-lib-asmjs";
import { market } from "../config/marketConfig";
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
export const transferNFT = async (connectedWallet, data) => {
  // function used to transfer nft from user wallet to admin wallet
  const { policy_id, name } = data;
  const lucidBrowser = await initializeLucid();
  const api = await connectWallet(connectedWallet);
  lucidBrowser.selectWallet(api);
  const unit = generateUnit(policy_id, name);
  const tx = await lucidBrowser
    .newTx()
    .payToAddress(bankWalletAddress, {
      [unit]: 1n,
    })
    .validTo(Date.now() + 100000)
    .complete();
  console.log(tx, "tx");
  const txHash = signAndSubmitTransaction(tx);
  return txHash;
};

export const sellNft = async (providerInstance, asset, price) => {
  console.log(providerInstance, "providerInstance");
  console.log(asset, "asset");
  const addresses = await providerInstance.getUsedAddresses();

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
            { int: Math.round(parseFloat(price) * 1e6) },
          ],
          constructor: 0,
        },
      },
    ],
  };
  callKuberAndSubmit(providerInstance, JSON.stringify(body));
};
