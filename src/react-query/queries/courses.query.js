import { api } from "../api";

export const getCoursesQuery = () =>
  api(`/courses/get/me/all`).then((data) => data.data);
