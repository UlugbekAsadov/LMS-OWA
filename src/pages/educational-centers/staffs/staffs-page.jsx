import {useState} from "react";
import {staffsMok} from "../../../utils/mocks/index.js";
import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";
import {Icon, Table} from "../../../components/index.js";
import {Content} from "../../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../../components/page-header/page-header.jsx";
import {TablePagination} from "../../../components/pagination/pagination.jsx";


const StaffsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(20);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = staffsMok.slice(indexOfFirstItem, indexOfLastItem);

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
                    <div className="tb-odr-btns d-none d-sm-inline fs-20px">
                        <Icon name="pen" className={'cursor-pointer'}/>
                        <span className="p-2">
                        <Icon name="file-text" className={'cursor-pointer'}/>
                        </span>
                        <Icon className={'cursor-pointer'} name="trash"/>
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
        <Content title="Xodimlar">
            <PageHeader
                pageTitle={"Xodimlar"}
                btnTitle={"Xodim qoshish"}
                btnIcon={"plus"}
                headerButtonAction={() => {
                }}
            />

            <Table
                pagination={<TablePagination
                    itemPerPage={itemPerPage}
                    totalItems={staffsMok.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />}
                tableBody={currentItems.length ? tableBody : null}
                tableHeader={tableHeader}
            />
        </Content>
    )
}
export default StaffsPage