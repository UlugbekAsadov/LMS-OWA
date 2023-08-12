import {Card, DropdownMenu, DropdownToggle, UncontrolledDropdown,} from "reactstrap";
import {Link} from "react-router-dom";
// import TableEmptyState from "../custom/table-empty-state";
import {Icon} from "../icon/icon";
import PropTypes from "prop-types";
import TableEmptyState from "./table-empty-state";
import {Loader} from "../loader/loader.jsx";

const Table = ({tableHeader, tableBody, pagination, isLoading}) => {
  if (isLoading) {
    return <div className={'d-flex align-items-center justify-content-center'}><Loader/></div>
  }
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
                        <Icon name="filter-alt"/>
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
            {tableHeader}
            <tbody className="tb-odr-body">
              {tableBody || <TableEmptyState />}
            </tbody>
          </table>
        </div>
        <div className="card-inner">{pagination}</div>
      </div>
    </Card>
  );
};

export { Table };

Table.propTypes = {
  tableHeader: PropTypes.node,
  tableBody: PropTypes.node,
  pagination: PropTypes.node,
  isLoading: PropTypes.bool
};
