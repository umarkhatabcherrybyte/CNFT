import { Toast } from "../components/shared/Toast";

export function checkAdaBalance(lovelace) {
  if (lovelace < 1000000) {
    Toast("error", "You do not have enough Ada to complete this transaction");
    return false; // Indicates insufficient balance
  }
  return true; // Indicates sufficient balance
}
