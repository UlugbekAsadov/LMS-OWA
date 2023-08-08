import { api } from "../api";

export const getRegionsQuery = async () =>
  api(`/places/regions`).then((data) => data.data);

export const getCitiesQuery = (regionId) =>
  api(`/places/districts/${regionId}`).then((data) => data.data);
