import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MapComponent from "../Map/MapComponent";

import { FaBicycle } from "react-icons/fa";
import StatusComponent from "../StatusCompononet";

export default function StationDetails({ visible, item, changeFormVisibility }) {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMap(!showMap);
    }, 600);
  }, []);

  return visible ? (
    <div className="h-[100vh] flex flex-col xs:items-center md:items-start justify-center">
      <div className="flex items-center justify-center mt-1">
        <div
          onClick={() => changeFormVisibility(false)}
          className="xs:absolute xs:top-20 xs:z-50 xs:bg-black sm:z-0 sm:bg-transparent sm:static flex gap-4 items-center justify-center ml-6 text-[#2d2d2d] dark:text-white bg-transparent border border-[#2d2d2d] dark:border-white focus:ring-4 focus:ring-[#2d2d2d] rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          Back
        </div>
      </div>

      <div className="xs:w-screen xs:h-screen md:w-full sm:p-8 md:h-full grid grid-cols-1 xs:gap-2 md:gap-4 md:grid-cols-2">
        <motion.div
          className="xs:hidden sm:flex sm:flex-col w-full h-[85%] bg-rose-600 rounded-lg p-6"
          initial={{ x: -1000, y: 1000 }}
          animate={{ x: 0, y: 0 }}
          transition={{
            duration: 0.75,
          }}
        >
          <div className="w-full h-1/2 p-2 mb-1">
            <div className="w-full h-full flex flex-row p-4">
              <div className="info flex-1 w-1/2 h-full pt-2 pl-2">
                <div className="info-station">
                  <h1 className="bg-rose-600 uppercase text-2xl ">Station</h1>
                  <div className="p-2">
                    <h1 className="text-xl">{item.name}</h1>
                    <p className="text-md">{item.city}</p>
                  </div>
                </div>
                <div className="m-station-info mt-4">
                  <h1 className="uppercase w-full bg-rose-600 text-2xl">
                    More Info
                  </h1>
                  <div className="p-2">
                    <h1 className="capitalize">Type: {item.type}</h1>
                    <div className="flex flex-row gap-2 items-center">
                      Status:
                      <StatusComponent status={item.status} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="img-wrapper flex-1 w-1/2 h-full bg-yellow-300 box-border">
                <img
                  src={item.image}
                  className="w-full h-full box-border"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="w-full h-1/2 mt-1">
            <div className="flex xs:flex-col sm:flex-row sm:gap-4 xs:gap-1 md:gap-5 p-6 items-center w-full h-full justify-center">
              <div className="border border-black rounded-full xs:w-36 xs:h-36 w-1/2 lg:w-48 lg:h-48 h-full p-6 flex items-center justify-center bg-gray-500">
                <FaBicycle color="black" size="5rem" />
              </div>
              <div className="border border-black rounded-full xs:w-36 xs:h-36 lg:w-48 lg:h-48 w-1/2 h-full p-6 flex items-center justify-center bg-gray-500">
                <FaBicycle color="black" size="5rem" />
              </div>
              <div className="border border-black rounded-full xs:w-36 xs:h-36 lg:w-48 lg:h-48 w-1/2 h-full p-6 flex items-center justify-center bg-gray-500">
                <FaBicycle color="black" size="5rem" />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="xs:w-screen xs:h-screen sm:w-full sm:h-[85%] bg-rose-600 rounded-lg"
          initial={{ x: 1000, y: 1000 }}
          animate={{ x: 0, y: 0 }}
          transition={{
            duration: 0.45,
          }}
        >
          <MapComponent item={item} />
          <div className="bg-gray-800/40 sticky z-50 w-full p-3 h-[25%] bottom-0 sm:hidden rounded-t-3xl">
            <div className="p-4 w-full h-full">
              <div className="station_info flex justify-between">
                <div>
                  <h2 className="text-white text-lg">{item.name}</h2>
                  <p className="text-sm text-white/70">{item.city}</p>
                </div>
                <StatusComponent status={item.status} />
              </div>
              <div className="station_info_slots flex flex-row flex-wrap items-center justify-center h-[70%] w-full p-1 gap-4 mt-2">
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 text-center h-full rounded-full">
                  <FaBicycle color="black" size="3.5rem" />
                  <p className="text-black text-xl font-bold">3</p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 text-center h-full rounded-full">
                  <FaBicycle color="black" size="3.5rem" />
                  <p className="text-black text-xl font-bold">3</p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-200 text-center h-full rounded-full">
                  <FaBicycle color="black" size="3.5rem" />
                  <p className="text-black text-xl font-bold">3</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  ) : (
    ""
  );
}

{
  /* <MapComponent item={{ lat: 70, long: 70 }} /> */
}
