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
