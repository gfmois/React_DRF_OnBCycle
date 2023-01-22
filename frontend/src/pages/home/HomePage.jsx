import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="_wrapper">
      <div className="inial-info flex items-center justify-center">
        <div className="bg-white w-full h-full p-3">
            {/* //! TODO: Hacer que la imagen coja todo el ancho */}
          <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 w-full h-full">
            <img
              className="rounded-lg h-full w-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png"
              alt="image description"
            />
            <figcaption className="absolute px-4 text-lg text-white bottom-6">
              <p>
                Do you want to get notified when a new component is added to
                Flowbite?
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
      <div className="_stations-info">
        <div className="flex flex-wrap xs:flex-col items-center basis-1/2 h-full gap-4 m-5 md:flex-row justify-center flex-1 overflow-hidden box-border">
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{
              delay: 0.2,
            }}
            className="shadow-inner dark:bg-[#36B591] p-5 w-full h-full flex-1 m-0 rounded-lg box-border"
          >
            <h1>A</h1>
          </motion.div>
          <motion.div
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.5,
            }}
            className="block shadow-inner dark:bg-[#36B591] p-5 w-full h-full flex-1 m-0 rounded-lg box-border"
          >
            <h1>A</h1>
          </motion.div>
          <motion.div
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            transition={{
              delay: 0.7,
            }}
            className="block shadow-inner dark:bg-[#36B591] p-5 w-full h-full flex-1 m-0 rounded-lg box-border"
          >
            <h1>A</h1>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
