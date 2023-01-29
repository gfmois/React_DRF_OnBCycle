import StationItem from "./StationItem";
import { HiMap } from "react-icons/hi";
import FormModalComponent from "../../components/FormModalComponent";
import { useStations } from "../../hooks/useStation";
import { useState } from "react";

export default function StationsListItems({ stations, changeFormStatus }) {
  const [formModalVisible, setFormModalVisible] = useState(false);
  const { cols } = useStations();

  const changeVisibilityFormModal = (nVisibility) => {
    setFormModalVisible(nVisibility);
  };

  return (
    <div className="bg-[#F3F4FD] dark:bg-[#121212]">
      <>
        {formModalVisible ? (
          <FormModalComponent
            cols={cols}
            changeVisibility={changeVisibilityFormModal}
          />
        ) : (
          ""
        )}
      </>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F3F4FD] uppercase">
            Stations near you
          </h2>
          <button
            onClick={() => changeVisibilityFormModal(true)}
            type="button"
            className="flex p-6 gap-4 text-center justify-center items-center text-white text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue- 800"
          >
            New Location <HiMap />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {stations.map((e, i) => (
            <StationItem
              changeFormStatus={changeFormStatus}
              station={e}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
