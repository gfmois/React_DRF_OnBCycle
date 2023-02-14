import { AiOutlineInfoCircle, AiOutlineWarning } from "react-icons/ai";
import ButtonComponent from "../Layout/ButtonComponent";

export default function RentBikeModal({ visible, backButtonAction, action, bike }) {
  return visible ? (
    <div className="absolute z-50 top-1/4 md:left-1/4 w-full xs:h-1/2  md:w-[45%] sm:h-[30%] md:h-[36%] p-4">
      <div className="rounded-lg xs:bg-gray-300 shadow-2xl sm:bg-gray-200 w-full h-full p-6 flex flex-col">
        <div className="_top flex flex-col items-center justify-center">
          <AiOutlineWarning size="2rem" color="rgb(245 158 11)" />
          <h1 className="text-amber-500">Do you wanna rent a bicycle?</h1>
          <hr className="border-2 w-full xs:border-[#b9b7b7] sm:border-gray-300 my-4" />
        </div>
        <div className="_content container w-full h-full flex-1 flex flex-col gap-4">
          <p className="text-[#2d2d2d] p-2">
            Before renting a bicycle, please make sure to read and understand
            the rental rules and regulations. It is also the user's
            responsibility to inspect the bicycle before taking it and to report
            any problems or damage to the staff.
          </p>
          <div className="btn_wrapper flex flex-row-reverse">
            <ButtonComponent style="red" text="Back" action={() => backButtonAction(false)} />
            <ButtonComponent
              style="custom"
              addStyle="!bg-amber-500 dark:focus:ring-amber-400 focus:ring-amber-400"
              text="I agree and I want to rent"
              action={() => {
                action(bike)
                backButtonAction(false)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
