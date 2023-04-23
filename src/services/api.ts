import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL:
    import.meta.env.API_URL || "https://567e-190-83-85-241.ngrok-free.app",
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
