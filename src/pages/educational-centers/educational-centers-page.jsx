import {useState} from "react";
import {educationCentersListMock} from "../../utils/mocks/index.js";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import {Icon, Table} from "../../components/index.js";
import PageHeader from "../../components/page-header/page-header.jsx";
import {TablePagination} from "../../components/pagination/pagination.jsx";
import {Content} from "../../layout/page-layout/page-layout.jsx";

const EducationalCentersPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(20);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = educationCentersListMock.slice(indexOfFirstItem, indexOfLastItem);

    const tableHeader = (<thead className="tb-odr-head">
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
    </thead>);
    const tableBody = currentItems.map((item, index) => {
        return (<tr className="tb-odr-item" key={item.id}>
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
                </td>
                <td className="tb-odr-action">
                    <div className="tb-odr-btns d-none d-sm-inline fs-20px">
                        <Link className={'text-base'} to={'/educational-center/staffs-list'}>
                            <Icon className={'cursor-pointer'} name="user-circle"/>
                        </Link>
                        <span className="p-2">
                            <Icon className={'cursor-pointer'} name="trash"/>
                        </span>
                        <Icon name="pen" className={'cursor-pointer'}/>
                    </div>
                    <Link to={`/invoice-details/${item.id}`}>
                        <Button className="btn-pd-auto d-sm-none ">
                            <Icon name="chevron-right"/>
                        </Button>
                    </Link>
                </td>
            </tr>)
    });

    return (
        <Content title="O'quv markazlar">
            <PageHeader
                pageTitle={"O'quv markazlar"}
                btnTitle={"O’quv markaz qoshish"}
                btnIcon={"plus"}
                isButtonVisible
                headerButtonAction={() => {
                }}
            />

            <Table
                pagination={<TablePagination
                    itemPerPage={itemPerPage}
                    totalItems={educationCentersListMock.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />}
                tableBody={currentItems.length ? tableBody : null}
                tableHeader={tableHeader}
            />
        </Content>
    )
}
export default EducationalCentersPage