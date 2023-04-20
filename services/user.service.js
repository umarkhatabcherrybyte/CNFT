import http from "../config/apiInstance";

class UserService {
  signIn(address, name = "") {
    return http.post("/user/create", {
      recipient_address: address,
      name: name,
    });
  }
}
export default new UserService();
