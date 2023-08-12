import {PreviewCard} from "../../../../components/index.js";
import {Col} from "reactstrap";

const RightPage = () => {
    return (
        <Col md={"4"}>
            <PreviewCard className={'h-100'}>
                <ul>
                    <li className={'w-100% d-flex flex-grow-1 justify-content-between'}>
                        <span>name</span>
                        <b>Name1</b>
                    </li>
                </ul>
            </PreviewCard>
        </Col>
    )
}

export default RightPage