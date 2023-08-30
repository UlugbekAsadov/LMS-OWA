import { api } from "../api";

export const getUserQuery = () =>
  api(`/users/get/me`).then((data) => data.data);
