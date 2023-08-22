import { Toast } from "../components/shared/Toast";
export const transactionErrorHanlder = (error, type) => {
  console.log(error, "hello");
  if (error.code == -3) {
    Toast(
      "error",
      "Sorry, it looks like the pop-up window for your wallet was closed before the process could be completed. Please reopen the wallet and try again."
    );
  } else if (error.code == 2) {
    Toast(
      "error",
      "Transaction cancelled. Your request to complete the transaction has been cancelled."
    );
  } else if (
    error?.message &&
    error?.message?.includes("Expected address with network id 0")
  ) {
    Toast(
      "error",
      "Sorry, it looks like you're currently connected to the mainnet. Please switch your network to preprod order to continue."
    );
  } else if (error?.info === "Wallet could not send the tx.") {
    Toast(
      "error",
      "Your previous transaction is being validated please try again later."
    );
  } else {
    if (type === "mint") {
      Toast("error", "Error Occured while Minting");
    }
    if (type === "buy") {
      Toast(
        "error",
        "Sorry, there seems to be an issue with our server and we're unable to process your request at this time. Please try again later."
      );
    }
    if (type === "auction") {
      Toast("error", "Could Not Add Bid");
    }
  }
};

// mainnet
// export const transactionErrorHanlder = (error, type) => {
//   console.log(error, "hello");
//   if (error.code == -3) {
//     Toast(
//       "error",
//       "Sorry, it looks like the pop-up window for your wallet was closed before the process could be completed. Please reopen the wallet and try again."
//     );
//   } else if (error.code == 2) {
//     Toast(
//       "error",
//       "Transaction cancelled. Your request to complete the transaction has been cancelled."
//     );
//   } else if (
//     error?.message &&
//     error?.message?.includes("Expected address with network id 1")
//   ) {
//     Toast(
//       "error",
//       "Sorry, it looks like you're currently connected to the testnet. Please switch your network to Mainnet in order to continue."
//     );
//   } else if (error?.info === "Wallet could not send the tx.") {
//     Toast(
//       "error",
//       "Your previous transaction is being validated please try again later."
//     );
//   } else {
//     if (type === "mint") {
//       Toast("error", "Error Occured while Minting");
//     }
//     if (type === "buy") {
//       Toast(
//         "error",
//         "Sorry, there seems to be an issue with our server and we're unable to process your request at this time. Please try again later."
//       );
//     }
//     if (type === "auction") {
//       Toast("error", "Could Not Add Bid");
//     }
//   }
// };
