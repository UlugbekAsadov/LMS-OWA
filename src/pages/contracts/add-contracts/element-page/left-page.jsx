import { Icon, Loader, PreviewCard } from "../../../../components/index.js";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Col } from "reactstrap";
import { useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { addContactQuery } from "../../../../react-query/mutations/index.js";
import { getAllContractTypes } from "../../../../react-query/queries/index.js";
import { useNavigate } from "react-router-dom";
import {
  ERROR_MESSAGE_TRANSLATIONS,
  ERROR_MESSAGES,
} from "../../../../utils/enums/index.js";

const LeftPage = () => {
  const editorRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const contractTypes = useQuery({
    queryKey: "contracts-types",
    queryFn: () => getAllContractTypes(),
    enabled: false,
  });

  const addContract = useMutation({
    mutationKey: ["add-contract"],
    mutationFn: (config) => addContactQuery(config),
    onSuccess: (data) => {
      if (
        data?.error?.message === ERROR_MESSAGES.CONTRACT_TYPE_ALREADY_EXISTS
      ) {
        return setError("name", {
          message: ERROR_MESSAGE_TRANSLATIONS[data.error.message],
        });
      } else if (data.success) {
        reset();
        contractTypes.refetch();
        navigate("/contracts-type-list");
      }
    },
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

    await addContract.mutateAsync(config);
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
              initialValue={"Hello world"}
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
                {...register("is_kk")}
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Ha
              </label>
            </div>
          </div>
          {!addContract.isLoading ? (
            <div
              className={"mb-4"}
              onClick={() => {
                let html = editorRef.current.getContent();
                const qs = new URLSearchParams({ html });
                setValue("template", `${qs.toString()}`);
              }}
            >
              <Button color={`primary`}>
                <Icon name={"plus"}></Icon>
                <span>Saqlash</span>
              </Button>
            </div>
          ) : (
            <Loader />
          )}
        </form>
      </PreviewCard>
    </Col>
  );
};
export default LeftPage;
