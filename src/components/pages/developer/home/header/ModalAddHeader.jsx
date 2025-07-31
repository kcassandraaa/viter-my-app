import React from "react";
import ModalWrapper from "../../../../partials/modal/ModalWrapper";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText } from "../../../../helpers/FormInputs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../custom-hooks/queryData";
import * as Yup from "yup";
import { apiVersion } from "../../../../helpers/function-general";

//CREATE STEP 5
const ModalAddHeader = ({ setIsModal, itemEdit }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developer/header/header.php?id=${itemEdit.header_aid}` //to pass id
          : `${apiVersion}/controllers/developer/header/header.php`,
        itemEdit
          ? "put" // UPDATE
          : "post", //CREATE
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["header"] });

      if (!data.success) {
        alert(data.error);
      } else {
        alert(`Successfully created.`);
      }
    },
  });

  const initVal = {
    header_name: itemEdit ? itemEdit.header_name : "",
    header_link: itemEdit ? itemEdit.header_link : "",

    header_name_old: itemEdit ? itemEdit.header_name : "",
  };
  const yupSchema = Yup.object({
    header_name: Yup.string().required("required"),
    header_link: Yup.string().required("required"),
  });

  const handleClose = () => {
    setAnimate("translate-x-full");
    //DELAY OF CLOSING MODAL
    setTimeout(() => {
      setIsModal(false);
    }, 200);
  };

  React.useEffect(() => {
    setAnimate("");
  }, []);
  return (
    <ModalWrapper className={animate} handleClose={handleClose}>
      <div className="modal_header relative mb-4">
        <h3 className="text-sm">{itemEdit ? "Edit" : "Add"} Header</h3>
        <button
          className="absolute  top-0.5 right-0"
          type="button"
          onClick={handleClose}
        >
          <FaTimes className="size-4" />
        </button>
      </div>
      <div className="modal_body overflow-y-auto overflow-x-hidden max-h-[calc(100dvh-40px)]">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log(values);
            resetForm();

            mutation.mutate(values);
          }}
        >
          {(props) => {
            return (
              <Form>
                {/* FORMS */}
                <div className="modal-overflow">
                  <div className="relative mt-5 mb-6">
                    <InputText label="Name" name="header_name" type="text" />
                  </div>
                  <div className="relative mt-5 mb-6">
                    <InputText label="Link" name="header_link" type="text" />
                  </div>
                </div>
                {/* ACTIONS */}
                <div className="modal__action flex justify-end absolute bottom-0 w-full mt-6 mb-4 gap-2 left-0 px-6">
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="btn-modal-submit"
                  >
                    {mutation.isPending
                      ? "Loading..."
                      : itemEdit
                      ? "Save"
                      : "Add"}
                  </button>
                  <button
                    type="reset"
                    disabled={mutation.isPending}
                    className="btn-modal-cancel"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </ModalWrapper>
  );
};

export default ModalAddHeader;
