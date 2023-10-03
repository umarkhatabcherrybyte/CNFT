import { INSTANCE } from "../config/axiosInstance";
class MintService {
  downloadMetadataFile(json_data) {
    return INSTANCE.post("api/mint/download", {
      json_data: json_data,
    });
  }
}
export default new MintService();
