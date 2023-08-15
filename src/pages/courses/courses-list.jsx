import { Content } from "../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../components/page-header/page-header.jsx";
import { Icon, Table } from "../../components/index.js";
import { TablePagination } from "../../components/pagination/pagination.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useQuery } from "react-query";
import { getCoursesQuery } from "../../react-query/queries/index.js";
import NewCoursesModal from "../../components/modals/courses-modal/new-courses-modal.jsx";

const CoursesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(20);
  const { isLoading, data } = useQuery({
    queryFn: () => getCoursesQuery(),
    queryKey: ["all-courses-list"],
  });
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
        <span className="tb-odr-status d-none d-md-inline-block">Muddati</span>
      </th>
      <th className="tb-odr-action">&nbsp;</th>
    </tr>
    </thead>
  );

  if(isLoading){
    return
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
                      <span className="amount">{item.price} so'm</span>
                    </span>
          <span className="tb-odr-total">
                          {item.month} oy
                    </span>
                </td>
                <td className="tb-odr-action">
                    <div className="tb-odr-btns d-none d-sm-inline fs-20px">
                        <Icon name="pen" className={'cursor-pointer'}/>
                        <span className="p-2">
                            <Icon className={'cursor-pointer'} name="trash"/>
                        </span>
                    </div>
                    <Link to={`/invoice-details/${item.id}`}>
                        <Button className="btn-pd-auto d-sm-none ">
                            <Icon name="chevron-right"/>
                        </Button>
                    </Link>
                </td>
            </tr>
        )
    });
    return (
        <Content title="Kurslar">
          <PageHeader
            pageTitle={"Kurslar"}
            pageDescription={"Joriy shartnomalarni qo'shish va o'zgartirish"}
            btnTitle={"Kurs qo’shish"}
            btnIcon={"plus"}
            isButtonVisible
            onClickButton={setIsModalOpen.bind(null, true)}
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
          <NewCoursesModal isOpen={isModalOpen} onClose={setIsModalOpen.bind(null, false)} />
        </Content>
    )
}

export default CoursesList