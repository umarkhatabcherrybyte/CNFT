import axios from "axios";

export const getClientIp = async () => {
  try {
    const response = await axios.get("https://api.ipify.org/?format=json");
    const clientIp = response.data.ip;
    console.log(`Client IP address is: ${clientIp}`);
    return clientIp;
  } catch (error) {
    console.error(error);
    return null;
  }
};
