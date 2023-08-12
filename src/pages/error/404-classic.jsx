import {Link} from "react-router-dom";
import {Block, BlockContent} from "../../components/index.js";
import {Button} from "reactstrap";

const Error404Classic = () => {
    return (
        <Block className="nk-block-middle wide-xs mx-auto">
            <BlockContent className="nk-error-ld text-center">
                <h1 className="nk-error-head">404</h1>
                <h3 className="nk-error-title">Kecharisiz, siz qidirgan sahifa topilmadi.</h3>
                <p className="nk-error-text">
                    {"Lekin havotir olmang. Asosiy sahifamizda juda ko'p qiziqarli narsalar mavjud."}
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
export default Error404Classic;
