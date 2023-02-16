import http from "../config/apiInstance";

class listingService {
  signIn(address, name = "") {
    return http.post("api/user/create", {
      recipient_address: address,
      name: name,
    });
  }
}
export default new listingService();
