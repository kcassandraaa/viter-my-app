import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import CardService from "../../../../partials/CardService";

const ServicesList = ({
  isLoading,
  isFetching,
  error,
  dataServices,
  handleAdd,
  handleEdit,
  handleDelete,
}) => {
  return (
    // TABLE STEP 5 *get from Services.jsx, don't forget to import -> Services.jsx
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {dataServices?.data.map((item, key) => {
          return (
            <div key={key} className="relative">
              {/* UPDATE STEP 1 - create a button*/}
              <div className="absolute top-5 right-3">
                <button
                  type="button"
                  data-tooltip="Edit"
                  className="tooltip text-white "
                  //UPDATE STEP 3
                  onClick={() => handleEdit(item)}
                >
                  <FaPencil className="p-1 bg-primary rounded-full" />
                </button>
                {/* DELETE STEP 3 -> ModalDeleteServices.jsx */}
                <button
                  type="button"
                  data-tooltip="Delete"
                  className="tooltip text-red-600 "
                  //UPDATE STEP 3
                  onClick={() => handleDelete(item)}
                >
                  <FaTrash className="p-1 bg-primary rounded-full" />
                </button>
              </div>

              <CardService item={item} />
            </div>
          );
        })}

        {/* <CardService
                id={"web-development"}
                src={"../images/card-icon-web-development.webp"}
                alt={"Web Development Image"}
                title={"Web Development"}
                description={
                  "Custom websites built with modern frameworks like Next.js and React for optimal performance."
                }
                link={"View Packages"}
              />
              <CardService
                id={"ui-ux-design"}
                src={"../images/card-icon-ui-ux-design.webp"}
                alt={"UI/UX Design Image"}
                title={"UI/UX Design"}
                description={
                  "Beautiful interfaces designed to convert visitors with strategic user experience flows."
                }
                link={"See Portfolio"}
              />
  
              <CardService
                id={"seo-optimization"}
                src={"../images/card-icon-seo-optimization.webp"}
                alt={"SEO Optimization Image"}
                title={"SEO Optimization"}
                description={
                  " Increase your visibility on search engines with our data-driven SEO strategies."
                }
                link={"Get Audit"}
              /> */}
      </div>
    </>
  );
};

export default ServicesList;
