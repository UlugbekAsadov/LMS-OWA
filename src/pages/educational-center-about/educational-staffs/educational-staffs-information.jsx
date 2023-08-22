import PageHeader from "../../../components/page-header/page-header.jsx";
import { Content } from "../../../layout/page-layout/page-layout.jsx";
import { Link } from "react-router-dom";
import { Icon, Table } from "../../../components/index.js";
import { Badge, Button } from "reactstrap";
import { TablePagination } from "../../../components/pagination/pagination.jsx";
import { useState } from "react";
import { contractsMock } from "../../../utils/mocks/index.js";
import { useQuery } from "react-query";
import { getEducationalInformationQueryFn } from "../../../react-query/queries/educational.query.js";

const EducationalStaffsInformation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(20);
  const { data, isLoading } = useQuery({
    queryKey: ["educational-information"],
    queryFn: () => getEducationalInformationQueryFn(),
  });

  if (isLoading) {
    return;
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.users?.slice(indexOfFirstItem, indexOfLastItem);

  const tableHeader = (
    <thead className="tb-odr-head">
      <tr className="tb-odr-item">
        <th className="tb-odr-info">
          <span className="tb-odr-id">Raqami</span>
          <span className="tb-odr-date d-none d-md-inline-block">
            Nomlanishi
          </span>
        </th>
        <th className="tb-odr-amount">
          <span className="tb-odr-total">Tel raqami</span>
          <span className="tb-odr-status d-none d-md-inline-block">Kursi</span>
        </th>
        <th className="tb-odr-action">&nbsp;</th>
      </tr>
    </thead>
  );

  const tableBody = currentItems?.map((item, index) => {
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
            <Link to={`edit-contract/${item.id}`}>
              <Icon className={"cursor-pointer"} name="pen" />
            </Link>
            <span className="p-2">
              <Icon className={"cursor-pointer"} name="trash" />
            </span>
          </div>
          <Link to={`/invoice-details/${item.id}`}>
            <Button className="btn-pd-auto d-sm-none">
              <Icon name="chevron-right"></Icon>
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
        isButtonVisible
      />
      <Table
        pagination={
          <TablePagination
            itemPerPage={itemPerPage}
            totalItems={contractsMock?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        }
        tableBody={currentItems?.length ? tableBody : null}
        tableHeader={tableHeader}
      />
    </Content>
  );
};
export default EducationalStaffsInformation;
