import React from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

import { FaList, FaPlus, FaTable, FaTrash } from "react-icons/fa";
import ModalAddTestimonials from "./ModalAddTestimonials";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { apiVersion } from "../../../../helpers/function-general";
import CardTestimonial from "../../../../partials/CardTestimonial";
import { FaPencil } from "react-icons/fa6";
import ModalDeleteTestimonials from "./ModalDeleteTestimonials";
import TestimonialsList from "./TestimonialsList";
import TestimonialsTable from "./TestimonialsTable";

const Testimonials = () => {
  const [isModalTestimonials, setIsModalTestimonials] = React.useState(false);
  // UPDATE STEP 4
  const [itemEdit, setItemEdit] = React.useState();

  // DELETE STEP 1
  const [isDeleteTestimonials, setIsDeleteTestimonials] = React.useState(false);
  //TABLE STEP 2
  const [isTable, setIsTable] = React.useState(false);

  // TABLE STEP 3 -> TestimonialsTable.jsx
  const handleToggleTable = () => {
    setIsTable(!isTable);
  };

  const handleAdd = () => {
    setItemEdit(null); // to empty the form after edit
    setIsModalTestimonials(true);
  };

  //UPDATE STEP 2
  const handleEdit = (item) => {
    setItemEdit(item);
    setIsModalTestimonials(true);
  };

  // DELETE STEP 2
  const handleDelete = (item) => {
    setItemEdit(item);
    setIsDeleteTestimonials(true);
  };

  const {
    isLoading,
    isFetching,
    error,
    data: dataTestimonials,
  } = useQueryData(
    `${apiVersion}/controllers/developer/testimonials/testimonials.php`,
    "get",
    "testimonials"
  );
  return (
    <>
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative w-full">
            <h2 className="text-3xl font-bold text-center mb-12">
              Client Testimonials
            </h2>
            <div className="absolute right-0 top-1/3">
              <div className="flex items-center gap-x-3">
                {/* TABLE STEP 1 */}
                <button
                  className="flex items-center gap-2 hover:underline hover:text-primary"
                  type="button"
                  onClick={handleToggleTable}
                >
                  {isTable == true ? (
                    <>
                      <FaList className="size-3 " /> List
                    </>
                  ) : (
                    <>
                      <FaTable className="size-3" />
                      Table
                    </>
                  )}
                </button>
                <button
                  className="flex items-center gap-2 hover:underline hover:text-primary"
                  type="button"
                  onClick={handleAdd}
                >
                  <FaPlus className="size-3" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* TABLE STEP 6 -> TestimonialsTable.jsx */}
          {isTable == true ? (
            <>
              <TestimonialsTable
                isLoading={isLoading}
                isFetching={isFetching}
                error={error}
                dataTestimonials={dataTestimonials}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </>
          ) : (
            <TestimonialsList
              isLoading={isLoading}
              isFetching={isFetching}
              error={error}
              dataTestimonials={dataTestimonials}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </section>

      {isModalTestimonials && (
        <ModalAddTestimonials
          setIsModal={setIsModalTestimonials}
          itemEdit={itemEdit}
        />
        //UPDATE STEP 5a -> ModalAddTestimonials.jsx
      )}

      {/* DELETE STEP 11 -> testimonials.php */}
      {isDeleteTestimonials && (
        <ModalDeleteTestimonials
          setModalDelete={setIsDeleteTestimonials}
          mySqlEndpoint={`${apiVersion}/controllers/developer/testimonials/testimonials.php?id=${itemEdit.testimonials_aid}`}
          queryKey="testimonials"
        />
      )}
    </>
  );
};

export default Testimonials;
