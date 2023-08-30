import { api } from "../api.js";

export const getAllContractTypes = () =>
  api("/contractType/get/all").then((data) => data.data);

export const getContractTypesQuery = () =>
  api("/contractType/get/all").then((data) => data.data);

export const getContractWordList = () =>
  api("/contractType/values").then((data) => data.data);

export const getContractsByIdQueryFn = (contractId) =>
  api(`/contract/all/${contractId}`).then((data) => data.data);

// contract/all/contractId
