import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

// TABLE STEP 7
const ServicesTable = ({
  isLoading,
  isFetching,
  error,
  dataServices,
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
          <th>Name</th>
          <th>Description</th>
          <th>Action</th>
        </thead>
        <tbody>
          {/* TABLE STEP 10 */}
          {dataServices?.data.map(() => {
            return (
              <tr>
                <td>1.</td>
                <td>Sample</td>
                <td>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore, recusandae?
                </td>
                <td>
                  {/* TABLE STEP 9 */}
                  <div className="flex items-center justify-end gap-x-3 mr-10">
                    <button
                      type="button"
                      data-tooltip="Edit"
                      className="tooltip "
                      //UPDATE STEP 3
                      //   onClick={() => handleEdit(item)}
                    >
                      <FaPencil className="size-4 " />
                    </button>
                    {/* DELETE STEP 3 -> ModalDeleteServices.jsx */}
                    <button
                      type="button"
                      data-tooltip="Delete"
                      className="tooltip"
                      //UPDATE STEP 3
                      //   onClick={() => handleDelete(item)}
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

export default ServicesTable;
