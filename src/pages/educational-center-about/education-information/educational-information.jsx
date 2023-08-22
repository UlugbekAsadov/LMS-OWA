import { Content } from "../../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../../components/page-header/page-header.jsx";
import { Row } from "reactstrap";

const EducationalInformation = () => {
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
              <td>Oq’uv markazi nomi (b3rend)</td>
              <td>
                <b>Open web academy</b>
              </td>
            </tr>
            <tr>
              <td>Tel raqami</td>
              <td>
                <p>+99890 716 75 50</p>
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
                <td>Oq’uv markazi nomi (brend)</td>
                <td>
                  <b>Open web academy</b>
                </td>
              </tr>
              <tr>
                <td>Tel raqami</td>
                <td>
                  <p>+99890 716 75 50</p>
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
