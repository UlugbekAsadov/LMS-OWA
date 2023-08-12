import {Link} from "react-router-dom";
import {Block, BlockContent} from "../../components/index.js";
import {Button} from "reactstrap";

const Error403Classic = () => {
    return (
        <Block className="nk-block-middle wide-xs mx-auto">
            <BlockContent className="nk-error-ld text-center">
                <h1 className="nk-error-head">403</h1>
                <h3 className="nk-error-title">Voy! Nega bu yerdasiz?</h3>
                <p className="nk-error-text">
                    {`Noqulaylik uchun uzr so'raymiz. Siz oʻsha sahifaga kirishga urinayotganga oʻxshaysiz
                        o'chirildi
                        yoki hech qachon mavjud bo'lmagan.`}
                </p>
                <Link to={`/`}>
                    <Button color="primary" size="lg" className="mt-2">
                        Bosh sahifaga qaytish
                    </Button>
                </Link>
            </BlockContent>
        </Block>
    );
};
export default Error403Classic;
