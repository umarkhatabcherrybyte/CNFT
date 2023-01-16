import http from "../config/apiInstance";
class VerifyMetaFileService {
  verify(path) {
    let formData = new FormData();
    return http.post("/api/verify", formData, {
      headers: {
        path: path,
      },
    });
  }
}
export default new VerifyMetaFileService();
