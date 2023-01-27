import React from "react";
import ButtonComponent from "./Layout/ButtonComponent";
import { useForm } from "react-hook-form";

export default function FormModalComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const items = [
    {
      type: "text",
      placeholder: "Texto de ejemplo",
      required: true,
      id: "t_eje",
      minLength: 0,
      maxLength: 12,
      value: "",
      label: "Texto",
      name: "Email",
    },
    {
      type: "text",
      placeholder: "Texto de ejemplo A",
      required: true,
      id: "t_eje",
      minLength: 0,
      maxLength: 12,
      value: "",
      label: "A",
      name: "example",
    },
  ];

  return (
    <div className="w-screen h-screen absolute flex justify-center top-20 right-0 left-0 bottom-0">
      <div className="border-[3px] border-[#3f3f3f] dark:bg-[#212121] bg-red-700 w-3/4 h-1/2 rounded-xl p-6">
        <form className="w-full h-full grid gap-6 grid-cols-1 sm:grid-cols-2 p-6">
          {items.map((item, index) => {
            return (
              <div
                className="group relative flex items-start justify-center flex-col"
                key={index}
              >
                <label
                  htmlFor={item.id}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {item.label}
                </label>

                <input
                  type={item.type}
                  id={item.id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={item.placeholder}
                  {...register(item.name, {
                    required: item.required,
                    minLength: item.minLength,
                    maxLength: item.maxLength,
                  })}
                  autoComplete="off"
                />
              </div>
            );
          })}
          <div className="btns w-full h-full">
            <ButtonComponent
              text="Save"
              action={handleSubmit(onSubmit)}
              style="default"
            />
            <ButtonComponent text="Back" style="red" />
          </div>
        </form>
      </div>
    </div>
  );
}