import PageHeader from "../../components/page-header/page-header.jsx";
import {Icon, Table} from "../../components/index.js";
import {TablePagination} from "../../components/pagination/pagination.jsx";
import {tableDataContractType} from "../../utils/mocks/index.js";
import {Content} from "../../layout/page-layout/page-layout.jsx";
import {useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

const ContractsTypeList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(20);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = tableDataContractType.slice(indexOfFirstItem, indexOfLastItem);


    const tableHeader = (
        <thead className="tb-odr-head">
        <tr className="tb-odr-item">
            <th className="tb-odr-info">
                <span className="tb-odr-id">Raqami</span>
                <span className="tb-odr-date d-none d-md-inline-block">Nomlanishi</span>
            </th>
            <th className="tb-odr-amount">
                <span className="tb-odr-date d-none d-md-inline-block">Qo'shimcha</span>
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
                                    {currentPage * 10 + index + 1 - 10}
                                  </Link>
                                </span>
                    <span className="tb-odr-date">{item.name}</span>
                </td>
                <td className="tb-odr-amount">
                                <span className="tb-odr-total">
                                  <span className="amount">{item.courses}</span>
                                </span>
                </td>
                <td className="tb-odr-action">
                    <div className="tb-odr-btns d-none d-sm-inline">
                        <Icon name="pen"/>
                        <span className="p-2">
                            <Icon name="trash"/>
                            </span>
                    </div>
                    <Link to={`/invoice-details/${item.id}`}>
                        <Button className="btn-pd-auto d-sm-none">
                            <Icon name="chevron-right"></Icon>
                        </Button>
                    </Link>
                </td>
            </tr>
        )
    });
    return (
        <Content title="Shartnomalar turi">
            <PageHeader
                pageTitle={"Shartnomalar turi"}
                pageDescription={"Joriy shartnomalarni qo'shish va o'zgartirish"}
                btnTitle={"Shartnoma qo’shish"}
                btnIcon={"plus"}
                headerButtonAction={() => {
                }}
            />

            <Table
                pagination={
                    <TablePagination
                        itemPerPage={itemPerPage}
                        totalItems={tableDataContractType.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                }
                tableBody={tableBody}
                tableHeader={tableHeader}
            />
        </Content>
    )
}
export default ContractsTypeList