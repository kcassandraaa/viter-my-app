import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import CardService from "../../../../partials/CardService";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import TableLoading from "../../../../partials/spinners/TableLoading";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import LoadMore from "../../../../partials/LoadMore";

//TABLE STEP 4
const ServicesList = ({
  handleAdd,
  handleEdit,
  handleDelete,
  result,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  status,
  setPage,
  page,
  ref,
}) => {
  return (
    // TABLE STEP 5 *get from Services.jsx, don't forget to import -> Services.jsx
    <>
      {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {dataServices?.data.map((item, key) => {
          return (
            <div key={key} className="relative">
              {/* UPDATE STEP 1 - create a button*/}
      {/* <div className="absolute top-5 right-3">
                <button
                  type="button"
                  data-tooltip="Edit"
                  className="tooltip text-white "
                  //UPDATE STEP 3
                  onClick={() => handleEdit(item)}
                >
                  <FaPencil className="p-1 bg-primary rounded-full" />
                </button> */}
      {/* DELETE STEP 3 -> ModalDeleteServices.jsx */}
      {/* <button
                  type="button"
                  data-tooltip="Delete"
                  className="tooltip text-red-600 " */}
      {/* //UPDATE STEP 3
        //           onClick={() => handleDelete(item)}
        //         >
        //           <FaTrash className="p-1 bg-primary rounded-full" />
        //         </button> 
        //       </div>

        //       <CardService item={item} />
        //     </div>
        //   );
        // })}

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
              /> 
      </div> */}

      <div className="relative">
        {isFetching && status != "pending" && <FetchingSpinner />}
        <div className="min-h-[25.5rem] min-w-full overflow-x-auto  flex flex-row items-center gap-10 ">
          {(status == "pending" || result?.pages[0].data.length == 0) && (
            <div className="text-center w-full">
              {status == "pending" ? <TableLoading /> : <NoData />}
            </div>
          )}
          {error && (
            <div className="text-center w-full">
              <ServerError />
            </div>
          )}
          {result?.pages.map((page, key) => (
            <React.Fragment key={key}>
              {page?.data.map((item, key) => {
                // console.log(item);
                return (
                  <div key={key} className="relative">
                    <div className="bg-gray-200 min-h-80 min-w-96 rounded-md relative">
                      <div className="p-5 flex flex-col items-center gap-3">
                        {/* IMAGE CONTAINER */}
                        <div className="min-w-20 min-h-20">
                          <img
                            src={item.web_services_image}
                            alt={item.web_services_image}
                          />
                        </div>
                        <div className="text-center  ">
                          <h4>{item.web_services_name}</h4>
                          <p>{item.web_services_description}</p>
                        </div>
                      </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="absolute -top-5 -right-3 z-10">
                      <div className="flex items-center justify-end gap-x-3 mr-5">
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
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}

          <div>
            <LoadMore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              result={result?.pages[0]}
              setPage={setPage}
              page={page}
              refView={ref}
            />
          </div>
          {/* <div className="bg-gray-200 min-h-80 min-w-96 rounded-md"></div>
          <div className="bg-gray-200 min-h-80 min-w-96 rounded-md"></div>
          <div className="bg-gray-200 min-h-80 min-w-96 rounded-md"></div>
          <div className="bg-gray-200 min-h-80 min-w-96 rounded-md"></div>
          <div className="bg-gray-200 min-h-80 min-w-96 rounded-md"></div>
          <div className="bg-gray-200 min-h-80 min-w-96 rounded-md"></div> */}
        </div>
      </div>
    </>
  );
};

export default ServicesList;
