import { ERROR_MESSAGE_TRANSLATIONS, ERROR_MESSAGES } from "../utils/enums";
import { toast } from "react-toastify";
import { defaultToastConfig } from "../utils/config/index.js";

export const api = async (url, config) => {
  const subdomain = window.location.host.split(".")[0];

  let apiUrl = `https://${subdomain}.${
    import.meta.env.VITE_CONFIG_BASE_API
  }${url}`;

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === "production") {
    apiUrl = `/api${url}`;
  }

  try {
    const response = await fetch(apiUrl, {
      ...config,
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("u_at")}`,
      },
    });

    const { error, ...data } = await response.json();

    if (error) {
      switch (error.message) {
        case ERROR_MESSAGES.JWT_ERROR:
          return window.location.replace(
            `/auth-login?callbackUri=${window.location.href}`
          );

        default:
          toast.error(
            ERROR_MESSAGE_TRANSLATIONS[error.message],
            defaultToastConfig
          );
      }
    }
    return { error, ...data };
  } catch (error) {
    toast.error(
      ERROR_MESSAGE_TRANSLATIONS["INTERNAL_SERVER_ERROR"],
      defaultToastConfig
    );
    return;
  }
};
