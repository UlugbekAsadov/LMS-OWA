import {
  BlockHeadContent,
  Icon,
  PreviewCard,
} from "../../../../components/index.js";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Col } from "reactstrap";
import { useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { addContactQuery } from "../../../../react-query/mutations/index.js";
import { getHotCategoriesQuery } from "../../../../react-query/queries/index.js";

const LeftPage = () => {
  const editorRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const contractTypes = useQuery({
    queryKey: "contracts-types",
    queryFn: () => getHotCategoriesQuery(),
    enabled: false,
  });

  const addContract = useMutation({
    mutationKey: ["add-contract"],
    mutationFn: (config) => addContactQuery(config),
  });

  const handleSubmitForm = async (formData) => {
    const body = {
      ...formData,
      is_prefix: Boolean(formData.is_prefix === "on"),
    };
    const config = {
      method: "POST",
      body: JSON.stringify(body),
    };
    console.log(config.body);

    // await addContract.mutateAsync(config);

    await contractTypes.refetch();
  };

  return (
    <Col md={"8"}>
      <PreviewCard>
        <form
          className={"w-80 d-flex flex-column"}
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Nomlanishi
            </label>
            <div className="form-control-wrap">
              <input
                className={`form-control ${errors.name && "error"}`}
                type="text"
                id="name"
                placeholder={"Misol uchun: Kelajak kasblari"}
                {...register("name", {
                  required: "Nomlanishni kiriting",
                })}
              />
              {errors.name && (
                <span className="invalid">{errors.name.message}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="short_letter">
              Qo’shimcha
            </label>
            <div className="form-control-wrap">
              <input
                className={`form-control ${errors.short_letter && "error"}`}
                type="text"
                id="short_letter"
                placeholder={"Misol uchun: KK"}
                {...register("short_letter", {
                  required: "Qo’shimchani kiriting",
                })}
              />
              {errors.short_letter && (
                <span className="invalid">{errors.short_letter.message}</span>
              )}
            </div>
          </div>

          <ul className="gx-3 align-center flex-wrap form-group">
            <li>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  defaultChecked={true}
                  defaultValue={"on"}
                  className="custom-control-input"
                  id="reg-enable"
                  {...register("is_prefix")}
                />
                <label className="custom-control-label" htmlFor="reg-enable">
                  Prefix
                </label>
              </div>
            </li>
            <li>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  defaultValue={"off"}
                  id="reg-disable"
                  {...register("is_prefix")}
                />
                <label className="custom-control-label" htmlFor="reg-disable">
                  Postfix
                </label>
              </div>
            </li>
          </ul>
          <div className={"form-group h-100"}>
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
                height: 350,
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic | alignleft aligncenter " +
                  "alignright alignjustify | outdent indent",
              }}
            />
          </div>
          <div className="preview-block form-group">
            <span className="preview-title fs-14px">
              Kelajak kasblari uchun
            </span>
            <div className="custom-control custom-checkbox">
              <input
                {...register("is_kelajak_kasblari")}
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Ha
              </label>
            </div>
          </div>
          <BlockHeadContent className={"mb-4"}>
            <Button color={`primary`}>
              <Icon name={"plus"}></Icon>
              <span
                onClick={() => {
                  let html = editorRef.current.getContent();
                  const qs = new URLSearchParams({ html });
                  setValue("template", `${qs.toString()}`);
                }}
              >
                Saqlash
              </span>
            </Button>
          </BlockHeadContent>
        </form>
      </PreviewCard>
    </Col>
  );
};
export default LeftPage;
