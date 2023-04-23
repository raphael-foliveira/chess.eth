import Cookies from "js-cookie";
import { getUser, useUser } from "../useUser";
import { toast } from "react-toastify";
import { CreateSessionDTO } from "./DTOs/CreateSessionDTO";
import { api } from "../../services/api";
import { useState } from "react";
import { lichessAPI } from "../../services/lichessAPI";

export function useAuth() {
  const { setUser, setIsLogged, setOpponent } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user_id");
    setIsLogged(false);
  };

  const signIn = async (data: CreateSessionDTO) => {
    try {
      setIsLoading(true);
      const { user, access_token } = await createSession(data);

      api.defaults.headers.Authorization = `Bearer ${access_token}`;

      const response = await getUser(user?.id);

      Cookies.set("access_token", access_token);
      Cookies.set("user_id", user?.id);

      setIsLogged(true);
      setUser(response);

      toast.success("Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("An error happen", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInOponnet = async () => {
    try {
      const { user, access_token } = await createSession({
        email: "luizpedrosousa64@gmail.com",
        token: "lip_O5EbulGMnYWEBbgt1FVS",
      });

      api.defaults.headers.Authorization = `Bearer ${access_token}`;

      const response = await getUser(user?.id);

      Cookies.set("opponent_access_token", access_token);
      Cookies.set("opponent_user_id", user?.id);
      setOpponent(response);
    } catch (error) {
      toast.error("Can't get opponent data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return {
    logout,
    isLoading,
    signInOponnet,
    signIn,
  };
}

export const createSession = async (data: CreateSessionDTO) => {
  const response = await api.post("/users/sessions", data);

  return response?.data;
};
