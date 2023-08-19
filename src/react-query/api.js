import { ERROR_MESSAGE_TRANSLATIONS, ERROR_MESSAGES } from "../utils/enums";
import { toast } from "react-toastify";
import { defaultToastConfig } from "../utils/config/index.js";

export const api = async (url, config) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CONFIG_BASE_API}${url}`,
      {
        ...config,
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("u_at")}`,
        },
      }
    );

    const { error, ...data } = await response.json();

    if (error) {
      switch (error.message) {
        case ERROR_MESSAGES.JWT_ERROR:
          window.location.replace(
            `/auth-login?callbackUri=${window.location.href}`
          );
          return;
        default:
          toast.error(
            ERROR_MESSAGE_TRANSLATIONS[error.message],
            defaultToastConfig
          );
          return;
      }
    }

    return data;
  } catch (error) {
    toast.error(ERROR_MESSAGE_TRANSLATIONS["SERVER_ERROR"], defaultToastConfig);
    return;
  }
};
