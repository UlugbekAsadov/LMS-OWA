import { api } from "../api";

export const getUserQueryFn = () =>
  api(`/users/get/me`).then((data) => data.data);
