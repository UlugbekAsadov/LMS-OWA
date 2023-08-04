import { useState } from "react";
import PageHeader from "../../components/page-header/page-header";
import { Content } from "../../layout/page-layout/page-layout";
import { Icon, Table } from "../../components";
import { TablePagination } from "../../components/pagination/pagination";
import { contractsMock } from "../../utils/mocks";
import { Link } from "react-router-dom";
import { Badge, Button } from "reactstrap";

const FutureProfessionsContract = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(20);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = contractsMock.slice(indexOfFirstItem, indexOfLastItem);

  const tableHeader = (
    <thead className="tb-odr-head">
      <tr className="tb-odr-item">
        <th className="tb-odr-info">
          <span className="tb-odr-id">Raqami</span>
          <span className="tb-odr-date d-none d-md-inline-block">FIO</span>
        </th>
        <th className="tb-odr-amount">
          <span className="tb-odr-total">Tel raqami</span>
          <span className="tb-odr-status d-none d-md-inline-block">Kursi</span>
        </th>
        <th className="tb-odr-action">&nbsp;</th>
      </tr>
    </thead>
  );

  const tableBody = currentItems.map((item) => {
    return (
      <tr className="tb-odr-item" key={item.id}>
        <td className="tb-odr-info">
          <span className="tb-odr-id">
            <Link to={`/invoice-details/${item.id}`}>#{item.orderId}</Link>
          </span>
          <span className="tb-odr-date">{item.name}</span>
        </td>
        <td className="tb-odr-amount">
          <span className="tb-odr-total">
            <span className="amount">{item.phone}</span>
          </span>
          <span className="tb-odr-status">
            <Badge color={"success"} className="badge-dot">
              {item.status}
            </Badge>
          </span>
        </td>
        <td className="tb-odr-action">
          <div className="tb-odr-btns d-none d-sm-inline">
            <Link to={`/invoice-print/${item.id}`} target="_blank">
              <Button
                color="primary"
                size="sm"
                className="btn-icon btn-white btn-dim"
              >
                <Icon name="printer-fill" />
              </Button>
            </Link>
            <Link to={`/invoice-details/${item.id}`}>
              <Button color="primary" size="sm" className="btn btn-dim ">
                {" O'zgartirish"}
                <Icon className={"ps-1"} name="pen" />
              </Button>
            </Link>
          </div>
          <Link to={`/invoice-details/${item.id}`}>
            <Button className="btn-pd-auto d-sm-none">
              <Icon name="chevron-right" />
            </Button>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <Content title="Kelajak Kasblari shartnoma">
      <PageHeader
        pageTitle={"Kelajak kasblari shartnoma"}
        pageDescription={"Joriy shartnomalarni qo'shish va o'zgartirish"}
        btnTitle={"Yangi shartnoma"}
        btnIcon={"plus"}
        headerButtonAction={setIsModalOpen.bind(null, true)}
      />

      <Table
        pagination={
          <TablePagination
            itemPerPage={itemPerPage}
            totalItems={contractsMock.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        }
        tableBody={tableBody}
        tableHeader={tableHeader}
      />
      
      {/* <FutureProfessionsModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen.bind(null, false)}
      /> */}
    </Content>
  );
};

export default FutureProfessionsContract;
