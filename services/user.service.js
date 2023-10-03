import { INSTANCE } from "../config/axiosInstance";

class UserService {
  signIn(address, name = "") {
    return INSTANCE.post("/user/create", {
      recipient_address: address,
      name: name,
    });
  }
}
export default new UserService();
