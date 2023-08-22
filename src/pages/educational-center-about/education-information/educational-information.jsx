import { Content } from "../../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../../components/page-header/page-header.jsx";
import { Row } from "reactstrap";
import { useQuery } from "react-query";
import { getEducationalInformationQueryFn } from "../../../react-query/queries/educational.query.js";
import { Loader } from "../../../components/index.js";

const EducationalInformation = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["educational-information"],
    queryFn: () => getEducationalInformationQueryFn(),
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Content title="Ma’lumot">
      <PageHeader
        pageTitle={"Ma’lumotlar"}
        btnTitle={"O’zgartirish"}
        isButtonVisible
      />
      <Row className={"py-3 gy-5"}>
        <table className="table table-lg preview-reference">
          <thead className="table-light"></thead>
          <tbody>
            <tr>
              <td>Oq’uv markazi nomi (brend)</td>
              <td>{data.name_brand}</td>
            </tr>
            <tr>
              <td>Tel raqami</td>
              <td>
                <p>+{data.phone}</p>
              </td>
            </tr>
            <tr>
              <td>Yuridik nomi</td>
              <td>
                <p>{data.name_legal}</p>
              </td>
            </tr>
            <tr>
              <td>Direktor ismi qisqa</td>
              <td>
                <p>{data.director_name_short}</p>
              </td>
            </tr>
            <tr>
              <td>Viloyat</td>
              <td>
                <p>{data.region.name_lt}</p>
              </td>
            </tr>
            <tr>
              <td>Shaxar/Tuman</td>
              <td>
                <p>{data.district.name_lt}</p>
              </td>
            </tr>
            <tr>
              <td>Qo’shimcha ma’lumot</td>
              <td>
                <p>{data.createdAt}</p>
              </td>
            </tr>
          </tbody>
        </table>

        {/*Bank info*/}

        <div>
          <p className={"text-soft fs-4"}>Bank info</p>
          <table className="table table-lg preview-reference">
            <thead className="table-light"></thead>
            <tbody>
              <tr>
                <td>Bank kodi</td>
                <td>{data.bank_code}</td>
              </tr>
              <tr>
                <td>Bank</td>
                <td>
                  <p>{data.bank_name}</p>
                </td>
              </tr>
              <tr>
                <td>INN</td>
                <td>
                  <p>{data.inn}</p>
                </td>
              </tr>
              <tr>
                <td>Hisob raqami</td>
                <td>
                  <p>{data.bank_account}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Row>
    </Content>
  );
};
export default EducationalInformation;
