import { Icon, PreviewCard, Button } from "../../../../components/index.js";
import { Editor } from "@tinymce/tinymce-react";
import { Col } from "reactstrap";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import {
  addContactQuery,
  editContractMutationFn,
} from "../../../../react-query/mutations/index.js";
import { getAllContractTypes } from "../../../../react-query/queries/index.js";
import { useNavigate } from "react-router-dom";
import {
  ERROR_MESSAGE_TRANSLATIONS,
  ERROR_MESSAGES,
} from "../../../../utils/enums/index.js";
import PropTypes from "prop-types";
import decode from "query-string";
import { toast } from "react-toastify";

const ContractTypeForm = ({ initialValue }) => {
  const [isPrefix, setIsPrefix] = useState(
    initialValue ? initialValue?.is_prefix : true
  );

  const editorRef = useRef(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
  });
  const contractTypes = useQuery({
    queryKey: "contract-type-types",
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
        toast.success("Shartnoma turi qo'shildi");
        navigate("/contracts-type-list");
      }
    },
  });

  const editContract = useMutation({
    mutationKey: "edit-contract",
    mutationFn: (config) => editContractMutationFn(config, initialValue.id),
    onSuccess: (data) => {
      if (!data?.error) {
        navigate("/contracts-type-list");
      }
    },
  });

  const handleSubmitForm = async (formData) => {
    let html = editorRef.current.getContent();
    const qs = new URLSearchParams({ html });

    const body = {
      ...formData,
      is_prefix: isPrefix,
      template: qs.toString(),
    };

    const config = {
      method: initialValue ? "PUT" : "POST",
      body: JSON.stringify(body),
    };

    if (initialValue) {
      await editContract.mutateAsync(config);
    } else {
      await addContract.mutateAsync(config);
    }
  };

  if (contractTypes.isLoading) {
    return;
  }
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
                  checked={isPrefix}
                  onClick={setIsPrefix.bind(null, true)}
                  className="custom-control-input"
                  id="reg-enable"
                  readOnly
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
                  checked={!isPrefix}
                  onClick={setIsPrefix.bind(null, false)}
                  id="reg-disable"
                  readOnly
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
              initialValue={
                initialValue ? decode.parse(initialValue?.template).html : null
              }
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
          <div>
            <Button
              color={`primary`}
              isLoading={
                initialValue ? editContract.isLoading : addContract.isLoading
              }
            >
              <Icon name={"plus"}></Icon>
              <span>Saqlash</span>
            </Button>
          </div>
        </form>
      </PreviewCard>
    </Col>
  );
};
export default ContractTypeForm;

ContractTypeForm.propTypes = {
  initialValue: PropTypes.object,
};
