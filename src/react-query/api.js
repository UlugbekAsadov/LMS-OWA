import { ERROR_MESSAGES } from "../utils/enums";

export const api = async (url, config) => {
  const data = await fetch(`${import.meta.env.VITE_CONFIG_BASE_API}${url}`, {
    ...config,
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${localStorage.getItem("u_at")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);


  if(data?.error){
    if (data.error?.message === ERROR_MESSAGES.JWT_ERROR) {
      return window.location.replace(
          `/auth-login?callbackUri=${window.location.href}`
      );
    } else {
      return window.location.replace(
          `/server-error`
      );
    }
  }

  return data;
};
