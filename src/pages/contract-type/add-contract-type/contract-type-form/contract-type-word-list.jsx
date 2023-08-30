import { PreviewCard } from "../../../../components/index.js";
import { Col } from "reactstrap";
import { useQuery } from "react-query";
import { getContractWordList } from "../../../../react-query/queries/index.js";
import uuid4 from "uuid4";

const ContractTypeWordList = () => {
  const { data } = useQuery({
    queryKey: ["contract-world-list"],
    queryFn: () => getContractWordList(),
  });

  return (
    <Col md={"4"}>
      <PreviewCard className={"h-100"}>
        <p className={"text-center pb-2 text-gray fs-14 lh-23 fw-400"}>
          LONG DESCRIPTION
        </p>
        <ul>
          {data?.map((item) => {
            const { key, description } = item;
            return (
              <li
                key={uuid4()}
                className={"w-100% d-flex flex-grow-1 justify-content-between"}
              >
                <span className={"w-60"}>{description}</span>
                <b>{key}</b>
              </li>
            );
          })}
        </ul>
      </PreviewCard>
    </Col>
  );
};

export default ContractTypeWordList;
