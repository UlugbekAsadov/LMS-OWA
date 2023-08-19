import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { Icon, Table } from "../../components/index.js";
import PageHeader from "../../components/page-header/page-header.jsx";
import { TablePagination } from "../../components/pagination/pagination.jsx";
import { Content } from "../../layout/page-layout/page-layout.jsx";
import AddBootcampsModal from "../../components/modals/add-bootcamps-modal/add-bootcamps-modal.jsx";
import { useMutation, useQuery } from "react-query";
import { getAllBootcampsQueryFn } from "../../react-query/queries/index.js";
import { ConfirmationModal } from "../../components/modals/confirmation-modal/confirmation-modal.jsx";
import { deleteBootcampMutationFn } from "../../react-query/mutations/index.js";

const EducationalCentersPage = () => {
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBootcamp, setSelectedBootcamp] = useState(null);
  const [itemPerPage] = useState(20);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-bootcamps"],
    queryFn: () => getAllBootcampsQueryFn(),
  });

  const deleteBootcampMutation = useMutation({
    mutationKey: ["delete-bootcamp"],
    mutationFn: () => deleteBootcampMutationFn(selectedBootcamp.id),
    onSuccess: () => {
      refetch();
      setIsDeleteModal(false);
    },
  });

  const handleDeleteBootcamp = (bootcamp) => {
    setSelectedBootcamp(bootcamp);
    setIsDeleteModal(true);
  };

  const handleClickEditButton = (bootcamp) => {
    const editingBootcampData = {
      ...bootcamp,
      province: {
        value: bootcamp.region.id,
        id: bootcamp.region.region_id,
        label: bootcamp.region.name_lt,
      },
      city: {
        value: bootcamp.district.district_id,
        label: bootcamp.district.name_lt,
      },
    };
    setSelectedBootcamp(editingBootcampData);
    setIsOpenModal(true);
  };

  const handleOpenModal = () => {
    setSelectedBootcamp(null);
    setIsOpenModal(true);
  };

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
          <span className="tb-odr-date d-none d-md-inline-block">Nomi</span>
        </th>
        <th className="tb-odr-amount">
          <span className="tb-odr-total">Tel raqami</span>
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
            <Link to={`/educational-center/staffs-list/${item.id}`}>
              {currentPage * 20 + index + 1 - 20}
            </Link>
          </span>
          <span className="tb-odr-date">{item.name_brand}</span>
        </td>
        <td className="tb-odr-amount">
          <span className="tb-odr-total">
            <span className="amount">{item.phone}</span>
          </span>
        </td>
        <td className="tb-odr-action">
          <div className="tb-odr-btns d-none d-sm-inline fs-20px">
            <Link
              className={"text-base"}
              to={`/educational-center/staffs-list/${item.id}`}
            >
              <Icon className={"cursor-pointer"} name="user-circle" />
            </Link>
            <span
              className="p-2"
              onClick={handleDeleteBootcamp.bind(null, item)}
            >
              <Icon className={"cursor-pointer"} name="trash" />
            </span>
            <Icon
              name="pen"
              className={"cursor-pointer"}
              onClick={handleClickEditButton.bind(null, item)}
            />
          </div>
          <Link to={`/educational-center/staffs-list/${item.id}`}>
            <Button className="btn-pd-auto d-sm-none ">
              <Icon name="chevron-right" />
            </Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <Content title="O'quv markazlar">
      <PageHeader
        pageTitle={"O'quv markazlar"}
        btnTitle={"O’quv markaz qoshish"}
        btnIcon={"plus"}
        isButtonVisible
        onClickButton={handleOpenModal}
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
        <AddBootcampsModal
          initialValue={selectedBootcamp}
          isOpen={isModalOpen}
          onClose={setIsOpenModal.bind(null, false)}
        />
      )}
      <ConfirmationModal
        isLoading={deleteBootcampMutation.isLoading}
        isOpen={isDeleteModal}
        onClose={setIsDeleteModal.bind(null, false)}
        confirmButtonFn={deleteBootcampMutation.mutate}
        title={"O'quv markazni o'chirishni xohlaysizmi?"}
        confirmButtonTitle={"O'chirish"}
        cancelButtonTitle={"Bekor qilish"}
      />
    </Content>
  );
};
export default EducationalCentersPage;
