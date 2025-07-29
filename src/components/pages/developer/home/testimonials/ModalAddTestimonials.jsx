import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { apiVersion } from "../../../../helpers/function-general";
import ModalWrapper from "../../../../partials/modal/ModalWrapper";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputText } from "../../../../helpers/FormInputs";
import { queryData } from "../../../../custom-hooks/queryData";

//UPDATE STEP 5b - pass the itemEdit
const ModalAddTestimonials = ({ setIsModal, itemEdit }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      // UPDATE STEP 9 - update existing testimonial or add new one -> testimonials.php
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developer/testimonials/testimonials.php?id=${itemEdit.testimonials_aid}` //to pass id
          : `${apiVersion}/controllers/developer/testimonials/testimonials.php`,
        itemEdit
          ? "put" // UPDATE
          : "post", //CREATE
        values
      ),
    onSuccess: (data) => {
      //validate reading
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }); // give id for refetching data, refreshing

      if (!data.success) {
        window.prompt(data.error);
      } else {
        window.prompt(`Successfully created.`);
        setIsModal(false);
      }
    },
  });

  const initVal = {
    // UPDATE STEP 6 - add conditions to show the info from the database to the inputs of the modal
    testimonials_name: itemEdit ? itemEdit.testimonials_name : "",
    testimonials_position: itemEdit ? itemEdit.testimonials_position : "",
    testimonials_comment: itemEdit ? itemEdit.testimonials_comment : "",
    testimonials_image: itemEdit ? itemEdit.testimonials_image : "",
  };
  const yupSchema = Yup.object({
    testimonials_name: Yup.string().required("required"),
    testimonials_position: Yup.string().required("required"),
    testimonials_comment: Yup.string().required("required"),
    testimonials_image: Yup.string().required("required"),
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
    <>
      <ModalWrapper className={animate} handleClose={handleClose}>
        <div className="modal_testimonials relative mb-4">
          {/* UPDATE STEP 7 - if the edit button is clicked, the h3 must also be edit */}
          <h3 className="text-sm"> {itemEdit ? "Edit" : "Add"} Testimonials</h3>
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
                        label="Image"
                        name="testimonials_image"
                        type="text"
                      />
                    </div>
                    <div className="relative mt-5 mb-6">
                      <InputText
                        label="Name"
                        name="testimonials_name"
                        type="text"
                      />
                    </div>
                    <div className="relative mt-5 mb-6">
                      <InputText
                        label="Position"
                        name="testimonials_position"
                        type="text"
                      />
                    </div>
                    <div className="relative mt-5 mb-6">
                      <InputText
                        label="Comment"
                        name="testimonials_comment"
                        type="text"
                      />
                    </div>
                  </div>
                  {/* ACTIONS */}
                  <div className="modal__action flex justify-end absolute bottom-0 w-full mt-6 mb-4 gap-2 left-0 px-6">
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="btn-modal-submit"
                    >
                      {/* UPDATE STEP 8 - if the edit button is clicked, the button below must be save -> Testimonials.jsx*/}
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
    </>
  );
};

export default ModalAddTestimonials;
