import {Link} from "react-router-dom";
import {Block, BlockContent} from "../../components/index.js";
import {Button} from "reactstrap";

const Error500Classic = () => {
    return (
        <>
            <Block className="nk-block-middle wide-xs mx-auto">
                <BlockContent className="nk-error-ld text-center">
                    <h1 className="nk-error-head">500</h1>
                    <h3 className="nk-error-title">Serverda muammo </h3>
                    <p className="nk-error-text">
                        {"Noqulaylik uchun uzr so'raymiz."}
                    </p>
                    <Link to={`/`}>
                        <Button color="primary" size="lg" className="mt-2">
                            Bosh sahifaga qaytish
                        </Button>
                    </Link>
                </BlockContent>
            </Block>
        </>
    );
};
export default Error500Classic;
