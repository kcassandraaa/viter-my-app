import React from "react";
import CardService from "../../../../partials/CardService";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { apiVersion } from "../../../../helpers/function-general";
import { FaList, FaPlus, FaTable, FaTrash } from "react-icons/fa";
import ModalAddServices from "./ModalAddServices";
import ModalDeleteServices from "./ModalDeleteServices";
import ServicesList from "./ServicesList";
import ServicesTable from "./ServicesTable";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "../../../../custom-hooks/queryDataInfinite";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const [isModalServices, setIsModalServices] = React.useState(false);
  //DELETE STEP 1
  const [isDeleteServices, setIsDeleteServices] = React.useState(false);

  //UPDATE STEP 5
  const [itemEdit, setItemEdit] = React.useState();

  //TABLE STEP 2
  const [isTable, setIsTable] = React.useState(false);

  //LOAD MORE
  const [page, setPage] = React.useState(1);
  const { ref, Inview } = useInView();

  // const {
  //   isLoading,
  //   isFetching: isFetchingDataServices,
  //   error: errorDataServices,
  //   data: dataServices,
  // } = useQueryData(
  //   `${apiVersion}/controllers/developer/web-services/web-services.php`,
  //   "get",
  //   "web-services" // query key
  // );

  //LOAD MORE STEP 9 -> partials - NoData.jsx
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["web-services"],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``, //search functionalities
        `${apiVersion}/controllers/developer/web-services/page.php?start=${pageParam}`, //loadmore or pagination functionalities
        false,
        {},
        "post"
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
  });

  // LOAD MORE
  React.useEffect(() => {
    if (Inview) {
      fetchNextPage();
      setPage((prev) => prev + 1);
    }
  }, [Inview]);

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
              {/* LOAD MORE STEP 16 -> ServicesTable */}
              <ServicesTable
                // dataServices={dataServices}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                result={result}
                error={error}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
                status={status}
                setPage={setPage}
                page={page}
                ref={ref}
              />
            </>
          ) : (
            <ServicesList
              // dataServices={dataServices}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              result={result}
              error={error}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
              status={status}
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
