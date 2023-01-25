import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function StationItem({ station, changeFormStatus }) {
  const changeFormVisibility = (status) => {
    changeFormStatus(status, station);
  };
  
  return (
    <div className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <img
          src={station.image}
          alt="Image of an Station"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      {/* Station Info */}
      <div className="mt-4 flex justify-between">
        <div className="ml-2">
          <h3 className="text-sm text-gray-700">
            <div onClick={changeFormVisibility(true)}
              // to={`/stations/${station.id_station}`}
              className="dark:text-[#F3F4FD]/90"
            >
              <span aria-hidden="true" className="absolute inset-0"></span>
              {station.name}
            </div>
          </h3>
          <p className="mt-1 text-sm text-gray-500 capitalize dark:text-[#F3F4FD]/70">
            4 Bikes to Rent
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900 mr-3">
          <span
            className={
              station.state
                ? "flex w-3 items-center h-3 bg-green-500 rounded-full"
                : "flex w-3 items-center h-3 bg-red-500 rounded-full"
            }
          >
            <AnimatePresence>
              {station.state && (
                <motion.span
                  key="stateBox"
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 1 }}
                  exit={{
                    opacity: 1,
                    scale: 0.5,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className={
                    station.state == 1
                      ? "flex w-full h-full border border-green-500 bg-transparent rounded-full"
                      : "flex w-full h-full border border-red-500 bg-transparent rounded-full"
                  }
                />
              )}
            </AnimatePresence>
          </span>
        </p>
      </div>
    </div>
  );
}
