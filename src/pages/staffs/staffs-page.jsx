import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import { Icon, Table } from "../../components/index.js";
import { Content } from "../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../components/page-header/page-header.jsx";
import { TablePagination } from "../../components/pagination/pagination.jsx";
import AddStaffModal from "../../components/modals/modal-staff-modal/add-staff-modal.jsx";
import PropTypes from "prop-types";
import { ConfirmationModal } from "../../components/modals/confirmation-modal/confirmation-modal.jsx";
import { useMutation, useQuery } from "react-query";
import {
  deleteCompaniesStaffMutationFn,
  deleteUserStaffMutationFn,
} from "../../react-query/mutations/index.js";
import { USER_ROLES } from "../../utils/enums/index.js";
import { userRolesMock } from "../../utils/mocks/index.js";

const StaffsPage = ({ isLoading, data, bootcampId = null, refetch }) => {
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(20);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const userData = useQuery({
    queryKey: ["user"],
  });

  const deleteUserStaff = useMutation({
    mutationKey: ["delete-user-staff"],
    mutationFn: (userId) => deleteUserStaffMutationFn(userId),
    onSuccess: () => {
      refetch();
    },
  });

  const deleteCompaniesStaff = useMutation({
    mutationKey: ["delete-companies-staff"],
    mutationFn: (userId) => deleteCompaniesStaffMutationFn(bootcampId, userId),
    onSuccess: () => {
      refetch();
    },
  });

  const handleClickEditStaff = (staff) => {
    const staffValues = {
      ...staff,
      role: { value: staff.role, label: userRolesMock[staff.role] },
    };
    setEditingUser(staffValues);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (userData.data.role === USER_ROLES.COMPANY_OWNER) {
      await deleteUserStaff.mutateAsync(deleteUserId);
    } else {
      await deleteCompaniesStaff.mutateAsync(deleteUserId);
    }
    setDeleteModal(false);
  };
  const handleClickDeleteButton = (userId) => {
    setDeleteModal(true);
    setDeleteUserId(userId);
  };

  const handleClickAddStaffButton = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return null;
  }

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const tableHeader = (
    <thead className="tb-odr-head">
      <tr className="tb-odr-item">
        <th className="tb-odr-info">
          <span className="tb-odr-id">Raqami</span>
          <span className="tb-odr-date d-none d-md-inline-block">Ismi</span>
        </th>
        <th className="tb-odr-amount">
          <span className="tb-odr-total">Tel raqami</span>
          <span className="tb-odr-status d-none d-md-inline-block">Role</span>
        </th>
        <th className="tb-odr-action">&nbsp;</th>
      </tr>
    </thead>
  );
  const tableBody = currentItems.map((item, index) => {
    return (
      <tr className="tb-odr-item" key={item.id}>
        <td className="tb-odr-info">
          <span className="tb-odr-id">
            <Link to={`/invoice-details/${item.id}`}>
              {currentPage * 20 + index + 1 - 20}
            </Link>
          </span>
          <span className="tb-odr-date">{item.full_name}</span>
        </td>
        <td className="tb-odr-amount">
          <span className="tb-odr-total">
            <span className="amount">
              {item.phone.replace(
                /^(\d{2})(\d{3})(\d{2})(\d{2})$/,
                "+998 $1 $2 $3 $4"
              )}
            </span>
          </span>
          <span className="tb-odr-status">
            <Badge color={"success"} className="badge-dot">
              {item.role}
            </Badge>
          </span>
        </td>
        <td className="tb-odr-action">
          <div className="tb-odr-btns d-none d-sm-inline fs-20px">
            <span onClick={handleClickEditStaff.bind(null, item)}>
              <Icon name="pen" className={"cursor-pointer"} />
            </span>
            <span
              className="p-2"
              onClick={handleClickDeleteButton.bind(null, item.id)}
            >
              <Icon className={"cursor-pointer"} name="trash" />
            </span>
          </div>
          <Link to={`/invoice-details/${item.id}`}>
            <Button className="btn-pd-auto d-sm-none ">
              <Icon name="chevron-right" />
            </Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <Content title="Xodimlar">
      <PageHeader
        pageTitle={"Xodimlar"}
        btnTitle={"Xodim qoshish"}
        btnIcon={"plus"}
        isButtonVisible={true}
        onClickButton={handleClickAddStaffButton}
      />

      <Table
        pagination={
          <TablePagination
            itemPerPage={itemPerPage}
            totalItems={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        }
        tableBody={currentItems.length ? tableBody : null}
        tableHeader={tableHeader}
      />
      {isModalOpen && (
        <AddStaffModal
          isOpen={isModalOpen}
          initialValue={editingUser}
          onClose={setIsModalOpen.bind(null, false)}
        />
      )}
      <ConfirmationModal
        confirmButtonFn={handleDeleteUser}
        isOpen={isDeleteModal}
        onClose={setDeleteModal.bind(null, false)}
        title={"Xodimni o'chirishni hoxlaysizmi?"}
        confirmButtonTitle={"O'chirish"}
        cancelButtonTitle={"Bekor qilish"}
      />
    </Content>
  );
};
export default StaffsPage;

StaffsPage.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  bootcampId: PropTypes.string,
  refetch: PropTypes.func,
};
