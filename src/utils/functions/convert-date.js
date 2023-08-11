import dayjs from "dayjs";
import format from "dayjs/plugin/advancedFormat";

dayjs.extend(format);

export const convertDate = (date) => {
  return dayjs(date).format("MM-DD-YYYY");
};
