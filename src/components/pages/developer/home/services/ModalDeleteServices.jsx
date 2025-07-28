import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { queryData } from "../../../../custom-hooks/queryData";
import { MdDelete } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";

// DELETE STEP 4 - pass
const ModalDeleteServices = ({ setModalDelete, mySqlEndpoint, queryKey }) => {
  const handleClose = () => {
    setModalDelete(false);
  };

  // DELETE STEP 5
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => queryData(mySqlEndpoint, "delete", values),
    // DELETE STEP 6
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (!data.success) {
        alert(data.error);
      } else {
        alert(`Successfully deleted.`);
        handleClose(); 
      }
    },
  });

  // DELETE STEP 7
  const handleConfirm = () => {
    mutation.mutate();
  };

  return (
    <>
      {/* DELETE STEP 8 */}
      <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-50 ">
        <div className="bg-dark/50 w-full h-full absolute top-0 left-0 -z-10 "></div>
        <div className="max-w-[30rem] w-full bg-white rounded-md relative ">
          {/* DELETE STEP 9 */}
          <div className="flex justify-center p-4 pb-2">
            <div></div>
            <div className="translate-y-2 translate-x-2 items-center">
              <MdDelete className="mx-auto text-orange-400 size-12 " />
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-8 absolute top-1 right-6"
            >
              <GrFormClose className="text-[45px]" />
            </button>
          </div>
          {/* DELETE STEP 10 - confirmation -> Services.jsx   */}
          <div className="p-5 text-center">
            <h3 className="text-sm pb-2 text-black">
              Are you sure you want to delete this service?
            </h3>
            <div className="flex justify-center items-center mt-5 gap-2">
              <button
                type="button"
                onClick={handleConfirm}
                className="btn-modal-submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Loading..." : "Confirm"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="text-sm btn-modal-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDeleteServices;
