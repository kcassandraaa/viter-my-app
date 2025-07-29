import React from "react";
import ModalWrapper from "../../../../partials/modal/ModalWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../../custom-hooks/queryData";
import { apiVersion } from "../../../../helpers/function-general";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import * as Yup from "yup";

//UPDATE STEP 8 - pass the itemEdit
const ModalAddServices = ({ setIsModal, itemEdit }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");
  // console.log(itemEdit); to show the info of itemEdit in console

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        //UPDATE STEP 12 - update existing service or add new one
        itemEdit
          ? `${apiVersion}/controllers/developer/web-services/web-services.php?id=${itemEdit.web_services_aid}` //to pass id
          : `${apiVersion}/controllers/developer/web-services/web-services.php`,
        //UPDATE STEP 13 - add condition for update -> web-services.php
        itemEdit
          ? "put" // UPDATE
          : "post", //CREATE
        values
      ),
    onSuccess: (data) => {
      //validate reading
      queryClient.invalidateQueries({ queryKey: ["web-services"] }); // give id for refetching data and refreshing

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
    // UPDATE STEP 9 - add conditions to show the info from the database to the inputs of the modal
    web_services_name: itemEdit ? itemEdit.web_services_name : "",
    web_services_description: itemEdit ? itemEdit.web_services_description : "",
    web_services_image: itemEdit ? itemEdit.web_services_image : "",
    web_services_link: itemEdit ? itemEdit.web_services_link : "",
    web_services_text_url: itemEdit ? itemEdit.web_services_text_url : "",
  };

  const yupSchema = Yup.object({
    web_services_name: Yup.string().required("required"),
  });

  //UPON USING THIS MODAL AND ALL ELEMENT TAG ARE RENDERED, RUN THIS CODE
  React.useEffect(() => {
    setAnimate("");
  }, []); //[] is dependencies, if you have a value inside re-run the code inside

  return (
    <ModalWrapper className={`${animate}`} handleClose={handleClose}>
      <div className="modal_header relative mb-4">
        {/* UPDATE STEP 10 - if the edit button is clicked, the h3 must also be edit*/}
        <h3 className="text-sm"> {itemEdit ? "Edit" : "Add"} Services</h3>
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
                      label="Image url"
                      name="web_services_image"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mt-3">
                    <InputText
                      label="Name"
                      name="web_services_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mt-3 mb-5">
                    <InputTextArea
                      label="Description"
                      name="web_services_description"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mt-3 mb-5">
                    <InputText
                      label="Page link"
                      name="web_services_link"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mt-3 mb-5">
                    <InputText
                      label="Page url"
                      name="web_services_text_url"
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
                    {/* UPDATE STEP 11 a - if the edit button is clicked, the button below must be save -> Services.jsx*/}
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

export default ModalAddServices;
