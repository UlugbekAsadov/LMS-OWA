import { api } from "../api.js";

export const addContactQuery = (config) =>
  api("/contractType/create", config).then((data) => data);
