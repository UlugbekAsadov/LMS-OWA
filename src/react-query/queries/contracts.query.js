import { api } from "../api";

export const getRegionsQueryFn = async () =>
  api(`/places/regions`).then((data) => data.data);

export const getCitiesQueryFn = (regionId) =>
  api(`/places/districts/${regionId}`).then((data) => data.data);

export const getPINFLQueryFn = (pinfl) =>
  api(`/contract/additional/${pinfl}`).then((data) => data.data);
export const getContractByIdQueryFn = (contractId) =>
  api(`/contract/all/${contractId}`).then((data) => data.data);
