import React from "react";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";

const ContactList = ({
  isLoading,
  isFetching,
  error,
  dataContact,
  handleAdd,
  handleEdit,
  handleDelete,
}) => {
  return (
    <>
      <div className="relative">
        <InputText label="Full Name" type="text" name="contact_fullname" />
      </div>
      <div className="relative">
        <InputText label="Email Address" type="text" name="contact_email" />
      </div>
      <div className="relative">
        <InputTextArea
          label="Message"
          as="textarea"
          rows="4"
          name="contact_message"
          className="inline-block"
        />
      </div>
      {/* CREATE STEP 2 */}
      <button className="btn btn--blue" type="submit">
        Send Message
      </button>
    </>
  );
};

export default ContactList;
