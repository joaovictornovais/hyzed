import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("hyzedauth.token");

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}
