import {Content} from "../../../layout/page-layout/page-layout.jsx";
import PageHeader from "../../../components/page-header/page-header.jsx";
import {Row} from "reactstrap";
import LeftPage from "./element-page/left-page.jsx";
import RightPage from "./element-page/right-page.jsx";


const CreateContracts = () => {
    return (
        <Content title="Shartnomalar turi">
            <PageHeader
                pageTitle={"Shartnomalar turi"}
                pageDescription={"Joriy shartnomalarni qo'shish va o'zgartirish"}
                isButtonVisible={false}
            />
            <Row className={"py-3 gy-2"}>
                <LeftPage/>
                <RightPage/>
            </Row>
        </Content>)
}
export default CreateContracts;