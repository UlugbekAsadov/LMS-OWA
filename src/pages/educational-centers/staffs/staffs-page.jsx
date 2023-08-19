import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import { Icon, Table } from "../../../components/index.js";
import { Content } from "../../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../../components/page-header/page-header.jsx";
import { TablePagination } from "../../../components/pagination/pagination.jsx";
import AddStaffModal from "../../../components/modals/modal-staff-modal/add-staff-modal.jsx";
import { useMutation, useQuery } from "react-query";
import { getBootcampStaffs } from "../../../react-query/queries/index.js";
import { rolesMock } from "../../../utils/mocks/index.js";
import { ConfirmationModal } from "../../../components/modals/confirmation-modal/confirmation-modal.jsx";

const StaffsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(20);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const { bootcampId } = useParams();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`bootcamp-staffs-${bootcampId}`],
    queryFn: () => getBootcampStaffs(bootcampId),
  });

  const deleteStaffMutation = useMutation({
    mutationKey: ["delete-staff"],
    mutationFn: () => {},
  });

  const handleClickEditButton = (staff) => {
    const editingStaff = {
      ...staff,
      role: rolesMock.find((role) => role.value === staff.role),
    };
    setSelectedStaff(editingStaff);
    setIsModalOpen(true);
  };

  const handleClickDeleteButton = (staff) => {
    setSelectedStaff(staff);
  };

  const handleClickAddButton = () => {
    setSelectedStaff(null);
    setIsModalOpen(true);
  };

  const handleDeleteStaff = () => {
    deleteStaffMutation.mutate();
    refetch();
    setIsDeleteModalOpen(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return null;
  }

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const tableHeader = (
    <thead className="tb-odr-head">
      <tr className="tb-odr-item">
        <th className="tb-odr-info">
          <span className="tb-odr-id">Raqami</span>
          <span className="tb-odr-date d-none d-md-inline-block">Ismi</span>
        </th>
        <th className="tb-odr-amount">
          <span className="tb-odr-total">Tel raqami</span>
          <span className="tb-odr-status d-none d-md-inline-block">Rol</span>
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
          <span className="tb-odr-date">{item.fullName}</span>
        </td>
        <td className="tb-odr-amount">
          <span className="tb-odr-total">
            <span className="amount">{item.phone}</span>
          </span>
          <span className="tb-odr-status">
            <Badge color={"success"} className="badge-dot">
              {item.role}
            </Badge>
          </span>
        </td>
        <td className="tb-odr-action">
          <div className="tb-odr-btns d-none d-sm-inline fs-20px">
            <Icon
              name="pen"
              className={"cursor-pointer"}
              onClick={handleClickEditButton.bind(null, item)}
            />
            <span className="p-2">
              <Icon name="file-text" className={"cursor-pointer"} />
            </span>
            <Icon
              className={"cursor-pointer"}
              name="trash"
              onClick={handleClickDeleteButton.bind(null, item)}
            />
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
        onClickButton={handleClickAddButton}
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
          initialValue={selectedStaff}
          isOpen={isModalOpen}
          onClose={setIsModalOpen.bind(null, false)}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={setIsDeleteModalOpen.bind(null, false)}
          isLoading={deleteStaffMutation.isLoading}
          title={"Xodimni o'chirish"}
          confirmButtonFn={handleDeleteStaff}
          confirmButtonTitle={"Tasdiqlash"}
          cancelButtonTitle={"Bekor qilish"}
        />
      )}
    </Content>
  );
};
export default StaffsPage;
