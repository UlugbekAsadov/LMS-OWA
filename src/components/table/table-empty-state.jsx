/* eslint-disable react/no-unescaped-entities */
import { ReactComponent as HelpIcon } from "../../assets/icons/help-desk.svg";

const TableEmptyState = () => {
  return (
    <div className="card-inner-group w-100">
      <div className="col-md-12 d-flex ps-4 p-3  align-items-center">
        <HelpIcon />
        <div className="ps-4">
          <h5>Birinchi shartnomangizni qo'shing</h5>
          <p>
            Yangi shartnoma qo'shish uchun yangi shartnoma yaratish tugmasini
            bosing
          </p>
        </div>
      </div>
    </div>
  );
};
export default TableEmptyState;
