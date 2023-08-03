import { Button } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../components/blog/blog";
import { Icon } from "../../components/icon/icon";
import { Content } from "./content";
import PropTypes from "prop-types";

const PageLayout = ({
  children,
  pageTitle,
  pageDescription,
  btnName = "Yaratish",
  iconName = "plus",
  onClickButton = () => {},
}) => {
  return (
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page>{pageTitle}</BlockTitle>
            <BlockDes className="text-soft">{pageDescription}</BlockDes>
          </BlockHeadContent>
          <BlockHeadContent>
            <Button color="primary" onClick={onClickButton}>
              <Icon name={iconName}></Icon>
              <span>{btnName}</span>
            </Button>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      <Block>{children}</Block>
    </Content>
  );
};

export default PageLayout;

PageLayout.propTypes = {
  children: PropTypes.node,
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
  btnName: PropTypes.string,
  iconName: PropTypes.string,
  onClickButton: PropTypes.func,
};
