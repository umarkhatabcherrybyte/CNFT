import axios from "axios";

class GetAdaPriceService {
  getPrice() {
    const params = new URLSearchParams([
      ["vs_currency", "usd"],
      ["ids", "cardano"],
      ["order", "market_cap_desc"],
      ["price_change_percentage", "24h"],
    ]);
    const http = axios.create({
      baseURL: "https://api.coingecko.com",
    });
    return http.get("/api/v3/coins/markets", { params });
  }
}
export default new GetAdaPriceService();
