import { motion, AnimatePresence } from "framer-motion";

export default function StationItem() {
  return (
    <div className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <img
          src="/test_1.png"
          alt="Image of an Station"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      {/* Station Info */}
      <div className="mt-4 flex justify-between">
        <div className="ml-2">
          <h3 className="text-sm text-gray-700">
            <a href="#" className="dark:text-[#F3F4FD]/90">
              <span aria-hidden="true" className="absolute inset-0"></span>
              Plaza Concepción
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500 uppercase dark:text-[#F3F4FD]/70">
            4 Bikes to Rent
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900 mr-3">
          <span className={
            false
                ? "flex w-3 items-center h-3 bg-green-500 rounded-full"
                : "flex w-3 items-center h-3 bg-red-500 rounded-full"
          }>
            <AnimatePresence>
              {true && (
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
                    false
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
