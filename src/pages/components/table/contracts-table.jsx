import { useState } from "react";
import {
  Button,
  Badge,
  Card,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Link } from "react-router-dom";
// import TableEmptyState from "../custom/table-empty-state";
import { Icon } from "../../../components/icon/icon";
import { TablePagination } from "../../../components/pagination/pagination";
import PropTypes from "prop-types";
import TableEmptyState from "./table-empty-state";

const ContractsTable = ({ contractsListData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(20);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = contractsListData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <Card className="card-stretch">
      <div className="card-inner-group">
        <div className="card-inner">
          <div className="card-title-group">
            <div className="card-title">
              <h5 className="title">Hammasi</h5>
            </div>
            <div className="card-tools me-n1">
              <ul className="btn-toolbar">
                <li>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      tag="a"
                      className="dropdown-toggle btn btn-icon btn-trigger"
                    >
                      <Icon name="filter-alt" />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <ul className="link-list-opt no-bdr">
                        <li className={"active"}>
                          <Link to={"#links"}>
                            <span>Fiter</span>
                          </Link>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-inner p-0">
          <table className="table table-orders">
            <thead className="tb-odr-head">
              <tr className="tb-odr-item">
                <th className="tb-odr-info">
                  <span className="tb-odr-id">Raqami</span>
                  <span className="tb-odr-date d-none d-md-inline-block">
                    FIO
                  </span>
                </th>
                <th className="tb-odr-amount">
                  <span className="tb-odr-total">Tel raqami</span>
                  <span className="tb-odr-status d-none d-md-inline-block">
                    Kursi
                  </span>
                </th>
                <th className="tb-odr-action">&nbsp;</th>
              </tr>
            </thead>
            <tbody className="tb-odr-body">
              {currentItems.length > 0 ? (
                currentItems.map((item) => {
                  return (
                    <tr className="tb-odr-item" key={item.id}>
                      <td className="tb-odr-info">
                        <span className="tb-odr-id">
                          <Link to={`/invoice-details/${item.id}`}>
                            #{item.orderId}
                          </Link>
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
                          <Link
                            to={`/invoice-print/${item.id}`}
                            target="_blank"
                          >
                            <Button
                              color="primary"
                              size="sm"
                              className="btn-icon btn-white btn-dim"
                            >
                              <Icon name="printer-fill" />
                            </Button>
                          </Link>
                          <Link to={`/invoice-details/${item.id}`}>
                            <Button
                              color="primary"
                              size="sm"
                              className="btn btn-dim "
                            >
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
                })
              ) : (
                <TableEmptyState />
              )}
            </tbody>
          </table>
        </div>
        <div className="card-inner">
          {currentItems.length ? (
            <TablePagination
              itemPerPage={itemPerPage}
              totalItems={contractsListData.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default ContractsTable;

ContractsTable.propTypes = {
  contractsListData: PropTypes.array,
};
