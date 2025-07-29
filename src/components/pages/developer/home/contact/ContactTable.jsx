import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const ContactTable = ({
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
      {/* TABLE STEP 8 */}
      <table>
        <thead>
          <th>#</th>
          <th>Full Name</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {dataContact?.data.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}.</td>
                <td>{item.contact_fullname}</td>
                <td>
                  <div className="flex items-center justify-start gap-x-3 mr-10">
                    <button
                      type="button"
                      data-tooltip="Edit"
                      className="tooltip "
                      onClick={() => handleEdit(item)}
                    >
                      <FaPencil className="size-4 " />
                    </button>
                    <button
                      type="button"
                      data-tooltip="Delete"
                      className="tooltip"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash className="size-4 " />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ContactTable;
