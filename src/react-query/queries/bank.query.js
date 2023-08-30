import { api } from "../api";

export const getBankQueryFn = (bankCode) =>
  api(`/bank/${bankCode}`).then((data) => data);
