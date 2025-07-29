import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { queryData } from "../../../../custom-hooks/queryData";
import { apiVersion } from "../../../../helpers/function-general";
import ModalWrapper from "../../../../partials/modal/ModalWrapper";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import * as Yup from "yup";

const ModalEditContact = ({ setIsModal, itemEdit }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");

  console.log(itemEdit);
  const handleEdit = (item) => {
    // console.log(item); to show the info of the chosen item
    setItemEdit(item);
    setIsModalServices(true);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        //UPDATE STEP 12 - update existing service or add new one
        itemEdit
          ? `${apiVersion}/controllers/developer/contact/contact.php?id=${itemEdit.contact_aid}` //to pass id
          : `${apiVersion}/controllers/developer/contact/contact.php`,
        //UPDATE STEP 13 - add condition for update -> contact.php
        itemEdit
          ? "put" // UPDATE
          : "post", //CREATE
        values
      ),
    onSuccess: (data) => {
      //validate reading
      queryClient.invalidateQueries({ queryKey: ["contact"] }); // give id for refetching data and refreshing

      if (!data.success) {
        alert(data.error);
      } else {
        alert(`Successfully created.`);
        setIsModal(false);
      }
    },
  });

  const handleClose = () => {
    if (mutation.isPending) return; // dont close while query is ongoing
    setAnimate("translate-x-full"); //animate close of modal
    setTimeout(() => {
      setIsModal(false); //close upon animation exit
    }, 200);
  };

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

  console.log(initVal);

  //UPON USING THIS MODAL AND ALL ELEMENT TAG ARE RENDERED, RUN THIS CODE
  React.useEffect(() => {
    setAnimate("");
  }, []); //[] is dependencies, if you have a value inside re-run the code inside

  return (
    <ModalWrapper className={`${animate}`} handleClose={handleClose}>
      <div className="modal_header relative mb-4">
        {/* UPDATE STEP 10 - if the edit button is clicked, the h3 must also be edit*/}
        <h3 className="text-sm"> Edit Contact</h3>
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
                <div className="modal-overflow">
                  <div className="relative mt-3 mb-5">
                    <InputText
                      label="Full Name"
                      name="contact_fullname"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mt-3">
                    <InputText
                      label="Email Address"
                      name="contact_email"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mt-3 mb-5">
                    <InputTextArea
                      label="Message"
                      name="contact_message"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                </div>
                <div className="modal__action flex justify-end absolute bottom-0 w-full mt-6 mb-4 gap-2 left-0 px-6">
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="btn-modal-submit"
                  >
                    {mutation.isPending ? "Loading..." : "Save"}
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

export default ModalEditContact;
