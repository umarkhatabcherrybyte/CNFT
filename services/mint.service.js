import http from "../config/apiInstance";

class MintService {
  downloadMetadataFile(json_data) {
    return http.post("api/mint/download", {
      json_data: json_data,
    });
  }
}
export default new MintService();
