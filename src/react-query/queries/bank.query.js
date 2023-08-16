import { api } from "../api";

export const getBankQuery = (bankCode) =>
  api(`/bank/${bankCode}`).then((data) => data);
