import axios from "axios";
import {
  assetsMetadata,
  assetsMetadataFake,
  bankWalletAddress,
  costLovelace,
} from "../config/utils"
import {
  AppWallet,
  ForgeScript,
  Transaction,
  BlockfrostProvider,
  largestFirst,
  NativeScript,
  resolvePaymentKeyHash,
  resolveSlotNo,
  BrowserWallet
} from '@meshsdk/core';

const instance = axios.create({
  baseURL: `http://localhost:4001/api`,
});

export async function post(route, body = {}) {
  return await instance
    .post(`${route}`, body)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function createTransaction(
  wallet,
  recipientAddress,
  utxos,
  image_hash,
  metadata_frontend) {
  try {
    // const forgingScript = ForgeScript.withOneSignature(recipientAddress);
    console.log('here')
    const slot = resolveSlotNo('mainnet', Date.now() + 100000);
    const keyHash = resolvePaymentKeyHash('addr1v9vx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c93pyfx');
    const nativeScript = {
      type: "all",
      scripts: [
        {
          type: 'sig',
          keyHash: keyHash,
        },
        {
          type: "before",
          slot: slot,
        },
      ],
    }
    const forgingScript = ForgeScript.fromNativeScript(nativeScript);
    console.log(forgingScript, 'dasd')
    const asset = {
      assetName: metadata_frontend.name,
      assetQuantity: "1",
      metadata: metadata_frontend,
      label: "721",
      recipient: {
        address: recipientAddress,
      },
    };

    const selectedUtxos = largestFirst(costLovelace, utxos, true);

    const tx = new Transaction({ initiator: wallet });
    tx.setTxInputs(selectedUtxos);
    tx.mintAsset(forgingScript, asset);
    tx.sendLovelace(bankWalletAddress, costLovelace);
    tx.setChangeAddress(recipientAddress);
    const unsignedTx = await tx.build();

    const originalMetadata = Transaction.readMetadata(unsignedTx);

    /**
     * TODO: Here you want to save the `originalMetadata` in a database with the `assetName`
     */

    const maskedTx = Transaction.maskMetadata(unsignedTx);
    console.log(maskedTx, originalMetadata, unsignedTx)

    // In this starter template, we send `originalMetadata` to the frontend.
    // Not recommended, its better to save the `originalMetadata` in a database.
    return { maskedTx, originalMetadata, unsignedTx };
  } catch (error) {
    console.log(error)
  }
}

export async function signTransaction(wallet, assetName, signedTx, originalMetadata) {
  try {

    const signedOriginalTx = Transaction.writeMetadata(
      signedTx,
      originalMetadata
    );
    signedOriginalTx

    const appWalletSignedTx = await wallet.signTx(signedOriginalTx, true);
    console.log(appWalletSignedTx, 'tx2')

    const txHash = await wallet.submitTx(appWalletSignedTx)
    console.log("Request data " + toJSON(txHash));
    return { txHash };
  } catch (error) {
    console.log(error)
  }
}
