import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

//TABLE STEP 7
const TestimonialsTable = ({
  isLoading,
  isFetching,
  error,
  dataTestimonials,
  handleAdd,
  handleEdit,
  handleDelete,
}) => {
  return (
    <>
      {/* TABLE STEP 8 */}
      {/* TABLE STEP 8 */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Position</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* TABLE STEP 10 */}
          {dataTestimonials?.data.map((item, index) => {
            return (
              <tr key={item.testimonials_aid}>
                <td>{index + 1}.</td>
                <td>
                  <img
                    src={item.testimonials_image}
                    alt={item.testimonials_name}
                    className="size-14 object-cover rounded-full "
                  />
                </td>
                <td>{item.testimonials_name}</td>
                <td>{item.testimonials_position}</td>
                <td>{item.testimonials_comment}</td>
                <td>
                  {/* TABLE STEP 9 */}
                  <div className="flex items-center justify-start gap-x-3 mr-10">
                    <button
                      type="button"
                      data-tooltip="Edit"
                      className="tooltip "
                      //UPDATE STEP 3
                      onClick={() => handleEdit(item)}
                    >
                      <FaPencil className="size-4 " />
                    </button>
                    {/* DELETE STEP 3 -> ModalDeleteServices.jsx */}
                    <button
                      type="button"
                      data-tooltip="Delete"
                      className="tooltip"
                      //UPDATE STEP 3
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

export default TestimonialsTable;
