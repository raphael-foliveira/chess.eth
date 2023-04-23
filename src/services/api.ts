import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.API_URL || "http://192.168.10.39:3333",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data?.message === "JWT is missing") {
      Cookies.remove("access_token");
      Cookies.remove("user_id");
    }
    return Promise.reject(error);
  }
);

export { api };
