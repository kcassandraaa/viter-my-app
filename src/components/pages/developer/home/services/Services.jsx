import React from "react";
import CardService from "../../../../partials/CardService";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { apiVersion } from "../../../../helpers/function-general";
import { FaPlus } from "react-icons/fa";
import ModalAddServices from "./ModalAddServices";
import { FaPencil } from "react-icons/fa6";

const Services = () => {
  const [isModalServices, setIsModalServices] = React.useState(false);
  //UPDATE STEP 5
  const [itemEdit, setItemEdit] = React.useState();

  const {
    isLoading,
    isFetching,
    error,
    data: dataServices,
  } = useQueryData(
    `${apiVersion}/controllers/developer/web-services/web-services.php`,
    "get",
    "web-services" // query key
  );

  const handleAdd = () => {
    setItemEdit(null); // UPDATE STEP 11 b - to empty the form after edit -> ModalAddServices
    setIsModalServices(true);
  };

  // UPDATE STEP 2
  // UPDATE STEP 4 - call item
  const handleEdit = (item) => {
    // console.log(item); to show the info of the chosen item
    // UPDATE STEP 6
    setItemEdit(item);
    setIsModalServices(true);
  };

  return (
    <>
      <section id="services" className="bg-gray-50 py-12 md:py-20">
        <div className="container">
          <div className="relative w-full">
            <div className="text-center mb-12">
              <h2 className="title">Our Web Services</h2>
              <p>
                Professional solutions tailored to boost your online presence
              </p>
            </div>
            <div className="absolute right-0 top-1/3">
              <div className="flex items-center gap-x-3">
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
        </div>
      </section>

      {isModalServices && (
        <ModalAddServices setIsModal={setIsModalServices} itemEdit={itemEdit} />
      )}
      {/* UPDATE STEP 7 - pass the item edit -> ModalAddServices.jsx */}
    </>
  );
};

export default Services;
