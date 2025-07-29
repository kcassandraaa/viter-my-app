import React from "react";
import CardService from "../../../../partials/CardService";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { apiVersion } from "../../../../helpers/function-general";
import { FaList, FaPlus, FaTable, FaTrash } from "react-icons/fa";
import ModalAddServices from "./ModalAddServices";
import ModalDeleteServices from "./ModalDeleteServices";
import ServicesList from "./ServicesList";
import ServicesTable from "./ServicesTable";

const Services = () => {
  const [isModalServices, setIsModalServices] = React.useState(false);
  //DELETE STEP 1
  const [isDeleteServices, setIsDeleteServices] = React.useState(false);

  //UPDATE STEP 5
  const [itemEdit, setItemEdit] = React.useState();

  //TABLE STEP 2
  const [isTable, setIsTable] = React.useState(false);

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

  console.log(isTable);
  // TABLE STEP 3 -> ServicesTable.jsx
  const handleToggleTable = () => {
    setIsTable(!isTable);
  };

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

  // DELETE STEP 2
  const handleDelete = (item) => {
    setItemEdit(item);
    setIsDeleteServices(true);
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

          {/* TABLE STEP 6 -> ServicesTable.jsx */}
          {isTable == true ? (
            <>
              <ServicesTable
                isLoading={isLoading}
                isFetching={isFetching}
                error={error}
                dataServices={dataServices}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </>
          ) : (
            <ServicesList
              isLoading={isLoading}
              isFetching={isFetching}
              error={error}
              dataServices={dataServices}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </section>

      {isModalServices && (
        <ModalAddServices setIsModal={setIsModalServices} itemEdit={itemEdit} />
      )}
      {/* UPDATE STEP 7 - pass the itemEdit above -> ModalAddServices.jsx */}

      {/* DELETE STEP 11 -> web-services.php */}
      {isDeleteServices && (
        <ModalDeleteServices
          setModalDelete={setIsDeleteServices}
          mySqlEndpoint={`${apiVersion}/controllers/developer/web-services/web-services.php?id=${itemEdit.web_services_aid}`}
          queryKey="web-services"
        />
      )}
    </>
  );
};

export default Services;
