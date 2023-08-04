import { Button } from "reactstrap";
import {
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../blog/blog";
import { Icon } from "../icon/icon";
import PropTypes from "prop-types";

const PageHeader = ({
  pageTitle,
  pageDescription,
  btnTitle,
btnIcon ,
  onClickButton = () => {},
}) => {
  return (
    <BlockHead size="sm">
      <BlockBetween>
        <BlockHeadContent>
          <BlockTitle page>{pageTitle}</BlockTitle>
          <BlockDes className="text-soft">{pageDescription}</BlockDes>
        </BlockHeadContent>
        <BlockHeadContent>
          <Button color="primary" onClick={onClickButton}>
            <Icon name={btnIcon}></Icon>
            <span>{btnTitle}</span>
          </Button>
        </BlockHeadContent>
      </BlockBetween>
    </BlockHead>
  );
};

export default PageHeader;

PageHeader.propTypes = {
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
  btnTitle: PropTypes.string,
  btnIcon: PropTypes.string,
  onClickButton: PropTypes.func,
};
