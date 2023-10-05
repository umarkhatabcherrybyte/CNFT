import axios from "axios";
import { koios_base_url } from "../config/koios";
export const getAssetDetail = async (asset) => {
  try {
    const response = await axios.get(
      `${koios_base_url}/policy_asset_info?_asset_policy=${asset}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
// 0fdc1ffd7386d4142f7fc0557baba9131af31d45c4e7dfe46b961113cc328d0c

export const getTxInfo = async (hashes) => {
  try {
    const response = await axios.post(
      `${koios_base_url}/tx_info` , {
          "_tx_hashes": [
            "0fdc1ffd7386d4142f7fc0557baba9131af31d45c4e7dfe46b961113cc328d0c",
          ]
      }
    );
    console.log({response});
    return response;
  } catch (e) {
    console.log(e);
  }
};
