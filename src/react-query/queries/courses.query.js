import { api } from "../api";

export const getCoursesQueryFn = () =>
  api(`/courses/get/me/all`).then((data) => data.data);
