import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { queryData } from "../../../../custom-hooks/queryData";
import { apiVersion } from "../../../../helpers/function-general";
import * as Yup from "yup";
import ModalWrapper from "../../../../partials/modal/ModalWrapper";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText } from "../../../../helpers/FormInputs";

//CREATE STEP 5
const ModalAddContact = ({ setIsModal, itemEdit }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developer/contact/contact.php?id=${itemEdit.contact_aid}` //to pass id
          : `${apiVersion}/controllers/developer/contact/contact.php`,
        itemEdit
          ? "put" // UPDATE
          : "post", //CREATE
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contact"] });

      if (!data.success) {
        alert(data.error);
      } else {
        alert(`Successfully created.`);
        setIsModal(false);
      }
    },
  });

  const initVal = {
    contact_fullname: itemEdit ? itemEdit.contact_fullname : "",
    contact_email: itemEdit ? itemEdit.contact_email : "",
    contact_message: itemEdit ? itemEdit.contact_message : "",
  };
  const yupSchema = Yup.object({
    contact_fullname: Yup.string().required("required"),
    contact_email: Yup.string().required("required"),
    contact_message: Yup.string().required("required"),
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
        <h3 className="text-sm">{itemEdit ? "Edit" : "Add"} Messages</h3>
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

            mutation.mutate(values);
          }}
        >
          {(props) => {
            return (
              <Form>
                {/* FORMS */}
                <div className="modal-overflow">
                  <div className="relative mt-5 mb-6">
                    <InputText
                      label="Full Name"
                      name="contact_fullname"
                      type="text"
                    />
                  </div>
                  <div className="relative mt-5 mb-6">
                    <InputText
                      label="Email Address"
                      name="contact_email"
                      type="text"
                    />
                  </div>
                  <div className="relative mt-5 mb-6">
                    <InputText label="Message" name="contact_message" type="text" />
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

export default ModalAddContact;
