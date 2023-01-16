import { AppWallet, Transaction, KoiosProvider } from "@martifylabs/mesh";
import { demoMnemonic } from "../../config/wallet";

export default async function handler(req, res) {
  const assetName = req.body.assetName;
  const signedTx = req.body.signedTx;
  const originalMetadata = req.body.originalMetadata;

  const koios = new KoiosProvider("testnet");

  const appWallet = new AppWallet({
    networkId: 0,
    fetcher: koios,
    submitter: koios,
    key: {
      type: "mnemonic",
      words: demoMnemonic,
    },
  });

  /**
   * TODO: Here you want to retrieve the `originalMetadata` from database with the `assetName`
   */

  const signedOriginalTx = Transaction.writeMetadata(
    signedTx,
    originalMetadata
  );

  const appWalletSignedTx = await appWallet.signTx(signedOriginalTx, true);

  const txHash = await appWallet.submitTx(appWalletSignedTx);

  res.status(200).json({ txHash });
}
