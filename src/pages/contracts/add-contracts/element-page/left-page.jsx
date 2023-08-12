import {BlockHeadContent, Icon, PreviewCard} from "../../../components/index.js";
import {Editor} from "@tinymce/tinymce-react";
import {Button, Col} from "reactstrap";
import {useRef} from "react";

const LeftPage = () => {
    const editorRef = useRef(null);
    return (
        <Col md={"8"}>
            <PreviewCard>
                <form className={'w-80 d-flex flex-column'}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="full-name">
                            Nomlanishi
                        </label>
                        <div className="form-control-wrap">
                            <input className="form-control" type="text" id="full-name"
                                   placeholder={'Misol uchun: Kelajak kasblari'}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="full-name">
                            Qo’shimcha
                        </label>
                        <div className="form-control-wrap">
                            <input className="form-control" type="text" id="full-name"
                                   placeholder={'Misol uchun: KK'}/>
                        </div>
                    </div>
                    <ul className="gx-3 align-center flex-wrap form-group">
                        <li>
                            <div className="custom-control custom-radio">
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    defaultChecked
                                    name="reg-public"
                                    id="reg-enable"
                                />
                                <label className="custom-control-label" htmlFor="reg-enable">
                                    Postfix
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="custom-control custom-radio">
                                <input
                                    type="radio"
                                    className="custom-control-input"
                                    name="reg-public"
                                    id="reg-disable"
                                />
                                <label className="custom-control-label" htmlFor="reg-disable">
                                    Postfix
                                </label>
                            </div>
                        </li>
                    </ul>
                    <div className={'form-group'}>
                        <Editor
                            apiKey={import.meta.env.VITE_CONFIG_TINYMCI_TOKEN}
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            initialValue="Hello, World!"
                            init={{
                                menubar: "file edit view format",
                                plugins: [
                                    " autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code",
                                ],
                                toolbar:
                                    "undo redo | formatselect | " +
                                    "bold italic | alignleft aligncenter " +
                                    "alignright alignjustify | outdent indent",
                            }}
                        />
                    </div>
                    <div className="preview-block form-group">
                        <span className="preview-title fs-14px">Kelajak kasblari uchun</span>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Ha
                            </label>
                        </div>
                    </div>
                    <BlockHeadContent className={'mb-4'}>
                        <Button color={`primary`}>
                            <Icon name={'plus'}></Icon>
                            <span>Saqlash</span>
                        </Button>
                    </BlockHeadContent>
                </form>
            </PreviewCard>
        </Col>
    )
}
export default LeftPage