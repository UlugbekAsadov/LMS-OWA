import { Content } from "../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../components/page-header/page-header.jsx";
import { Icon, Table } from "../../components/index.js";
import { TablePagination } from "../../components/pagination/pagination.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useMutation, useQuery } from "react-query";
import { getCoursesQueryFn } from "../../react-query/queries/index.js";
import AddCourseModal from "../../components/modals/courses-modal/add-course-modal.jsx";
import { ConfirmationModal } from "../../components/modals/confirmation-modal/confirmation-modal.jsx";
import { deleteCourseMutationFn } from "../../react-query/mutations/index.js";

const CoursesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingCourseId, setDeletingCourseId] = useState(null);
  const [itemPerPage] = useState(20);
  const [editingCourse, setEditingCourse] = useState(null);
  const { isLoading, data, refetch } = useQuery({
    queryFn: () => getCoursesQueryFn(),
    queryKey: ["all-courses-list"],
  });

  const deleteCourseMutation = useMutation({
    mutationKey: ["delete-course"],
    mutationFn: () => deleteCourseMutationFn(deletingCourseId),
  });

  const handleDeleteCourse = async (courseId) => {
    await deleteCourseMutation.mutateAsync(courseId);
    await refetch();
    setDeleteModal(false);
  };

  const handleClickDeleteButton = (courseId) => {
    setDeleteModal(true);
    setDeletingCourseId(courseId);
  };

  const handleClickEditButton = (course) => {
    const courseInfo = {
      id: course.id,
      name: course.name,
      month: course.month,
      price: course.price,
      is_kk: { label: course.kk_id === 1 ? "Ha" : "Yo'q", value: course.kk_id },
    };
    setEditingCourse(courseInfo);
    setIsModalOpen(true);
  };

  const handleClickCreateButton = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return null;
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const tableHeader = (
    <thead className="tb-odr-head">
      <tr className="tb-odr-item">
        <th className="tb-odr-info">
          <span className="tb-odr-id">Raqami</span>
          <span className="tb-odr-date d-none d-md-inline-block">Nomi</span>
        </th>
        <th className="tb-odr-amount">
          <span className="tb-odr-total">Narxi</span>
          <span className="tb-odr-status d-none d-md-inline-block">
            Muddati
          </span>
        </th>
        <th className="tb-odr-action">&nbsp;</th>
      </tr>
    </thead>
  );

  if (isLoading) {
    return;
  }

  const tableBody = currentItems.map((item, index) => {
    return (
      <tr className="tb-odr-item" key={item.id}>
        <td className="tb-odr-info">
          <span className="tb-odr-id">
            <Link to={`/invoice-details/${item.id}`}>
              {currentPage * 20 + index + 1 - 20}
            </Link>
          </span>
          <span className="tb-odr-date">{item.name}</span>
        </td>
        <td className="tb-odr-amount">
          <span className="tb-odr-total">
            <span className="amount">
              {item.price} {`so'm`}
            </span>
          </span>
          <span className="tb-odr-total">{item.month} oy</span>
        </td>
        <td className="tb-odr-action">
          <div className="tb-odr-btns d-none d-sm-inline fs-20px">
            <Icon
              name="pen"
              className={"cursor-pointer"}
              onClick={handleClickEditButton.bind(null, item)}
            />
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
    <Content title="Kurslar">
      <PageHeader
        pageTitle={"Kurslar"}
        pageDescription={"Joriy shartnomalarni qo'shish va o'zgartirish"}
        btnTitle={"Kurs qo’shish"}
        btnIcon={"plus"}
        isButtonVisible
        onClickButton={handleClickCreateButton}
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
        isLoading={isLoading}
        tableHeader={tableHeader}
      />
      {isModalOpen && (
        <AddCourseModal
          initialValue={editingCourse}
          isOpen={isModalOpen}
          onClose={setIsModalOpen.bind(null, false)}
        />
      )}
      <ConfirmationModal
        confirmButtonFn={handleDeleteCourse}
        isOpen={isDeleteModal}
        onClose={setDeleteModal.bind(null, false)}
        title={"Kursni o'chirishni hoxlaysizmi?"}
        confirmButtonTitle={"O'chirish"}
        cancelButtonTitle={"Bekor qilish"}
        isLoading={deleteCourseMutation.isLoading}
      />
    </Content>
  );
};

export default CoursesList;
