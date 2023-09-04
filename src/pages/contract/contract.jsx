import PageHeader from "../../components/page-header/page-header";
import { Content } from "../../layout/page-layout/page-layout";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import { Icon } from "../../components/index.js";
import { TablePagination } from "../../components/pagination/pagination";
import { Table } from "../../components/index.js";
import BasicContractModal from "../../components/modals/basic-conract-modal/basic-contract-modal";
import { useQuery } from "react-query";
import {
  getContractByIdQueryFn,
  getContractPdfQueryId,
} from "../../react-query/queries/index.js";

const Contract = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { contractId } = useParams();
  const [selectedContract, setSelectedContract] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(20);

  const { data = [], isLoading } = useQuery({
    queryKey: [`contract-data-${contractId}`],
    queryFn: () => getContractByIdQueryFn(contractId),
  });

  const handleDownloadPdf = (templateId) => {
    const data = getContractPdfQueryId(templateId);
    console.log(data);
  };

  if (isLoading) {
    return null;
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data?.contracts.slice(indexOfFirstItem, indexOfLastItem);

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

  const tableBody = currentItems?.map((item) => {
    return (
      <tr className="tb-odr-item" key={item.id}>
        <td className="tb-odr-info">
          <span className="tb-odr-id">
            <Link to={`/invoice-details/${item.id}`}>#{item.orderId}</Link>
          </span>
          <span className="tb-odr-date">{item.first_name}</span>
        </td>
        <td className="tb-odr-amount">
          <span className="tb-odr-total">
            <span className="amount">{item.document_number}</span>
          </span>
          <span className="tb-odr-status">
            <Badge color={"success"} className="badge-dot">
              {item.document_serial}
            </Badge>
          </span>
        </td>
        <td className="tb-odr-action">
          <div className="tb-odr-btns d-none d-sm-inline fs-20px">
            <Button
              onClick={handleDownloadPdf.bind(null, item.id)}
              color="primary"
              className="btn-icon btn-white btn-dim"
            >
              <Icon name="printer-fill" />
            </Button>
            <Button
              onClick={setSelectedContract.bind(null, item)}
              color="primary"
              className="btn-icon btn-white btn-dim"
            >
              <Icon className={"ps-1"} name="pen" />
            </Button>
          </div>
          <Button className="btn-pd-auto d-sm-none">
            <Icon name="chevron-right" />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Content title="Oddiy shartnoma">
      <PageHeader
        pageTitle={"Oddiy shartnomalar"}
        pageDescription={"Joriy shartnomalarni qo'shish va o'zgartirish"}
        btnTitle={"Yangi shartnoma"}
        btnIcon={"plus"}
        isButtonVisible
        onClickButton={setIsModalOpen.bind(null, true)}
      />

      <Table
        pagination={
          <TablePagination
            itemPerPage={itemPerPage}
            totalItems={data?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        }
        tableBody={currentItems?.length ? tableBody : null}
        tableHeader={tableHeader}
      />
      {isModalOpen && (
        <BasicContractModal
          isOpen={isModalOpen}
          onClose={setIsModalOpen.bind(null, false)}
        />
      )}
    </Content>
  );
};
export default Contract;
