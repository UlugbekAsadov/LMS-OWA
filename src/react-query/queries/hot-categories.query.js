import { api } from "../api.js";

export const getAllContractTypes = () =>
  api("/contractType/get/all").then((data) => data.data);
