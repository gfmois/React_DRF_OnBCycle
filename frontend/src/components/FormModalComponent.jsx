import React from "react";
import ButtonComponent from "./Layout/ButtonComponent";
import { useForm } from "react-hook-form";
import MapComponent from "./Map/MapComponent";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import SendNotificationComponent from "./Notifications/SendNotificationComponent";

export default function FormModalComponent({ cols, required, changeVisibility, action, item = {}, showMap = true, onlyView = false, sendNotiButton = false, loadNotification }) {
  const [isMapVisible, setMapVisible] = useState(false);
  const [sendNotification, setSendNotification] = useState(false)
  const [markerItem, setMarkerItem] = useState();
  const items = cols.map((i) => {
    if (typeof i != 'object') {
      return {
        type: 'text',
        placeholder: i,
        id: i,
        value: item[i],
        label: i,
        name: i,
        disabled: onlyView,
        required
      }
    }

    return {
      type: i[1],
      placeholder: i[0],
      required,
      id: i[0],
      value: "",
      label: i[0],
      name: i[0],
    };
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    action(data);
  };

  const getLngLat = (e) => {
    if (e.center) {
      e = {
        lngLat: { lat: e.center[1], lng: e.center[0] },
      };
    }

    items.map((i) => {
      if (i.id == "lat") {
        setValue("lat", e.lngLat.lat);
      }

      if (i.id == "long") {
        setValue("long", e.lngLat.lng);
      }
    });

    setMarkerItem({
      lat: e.lngLat.lat,
      long: e.lngLat.lng,
    });
  };

  /* 
    Example of objtect to pass the component
    {
      type: "text",
      placeholder: "Texto de ejemplo",
      required: true,
      id: "t_eje",
      minLength: 0,
      maxLength: 12,
      value: "",
      label: "Texto",
      name: "email",
    }
  */

  return isMapVisible && showMap ? (
    <div className="h-screen w-screen dark:bg-[#2d2d2d] absolute z-50">
      <div className="flex items-center justify-center">
        <div className="absolute z-50 top-3 hover:animate-pulse">
          <ButtonComponent
            action={() => setMapVisible(false)}
            style="custom"
            text="Back"
            addStyle="!bg-black/40 !text-white/90 !border border-black !text-center flex flex-row-reverse items-center gap-2 !justify-between"
          >
            <BiArrowBack />
          </ButtonComponent>
        </div>
      </div>
      <MapComponent
        search={true}
        action={getLngLat}
        loaded={setMapVisible}
        item={markerItem}
        initial={{ lat: 39.44312953093019, long: -0.5391206652999816 }}
        zoom="10"
      />
    </div>
  ) : (
    <>
        <div className="wrapper z-50">
          <div className="h-fit w-full z-50 absolute flex justify-center top-20 right-0 left-0 bottom-0">
            <div className="border-[3px] border-[#3f3f3f] dark:bg-[#212121] xs:w-[90%] xs:h-full md:w-3/4 md:h-1/2 lg:w-3/4 lg:h-3/4 rounded-xl">
              <form className="w-full h-full grid gap-6 grid-cols-1 sm:grid-cols-2 p-2">
                {items.map((item, index) => {
                  return (
                    <div
                      className="group relative flex items-start justify-center flex-col capitalize"
                      key={index}
                    >
                      <label
                        htmlFor={item.id}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {item.label}
                      </label>
                      {item.type != "bool" ? (
                        <input
                          type={item.type}
                          id={item.id}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={item.disabled ? item.value : item.placeholder}
                          {...register(item.name, {
                            required: item.required,
                            minLength: item.minLength,
                            maxLength: item.maxLength,
                            value: item.value,
                            disabled: item.disabled || false
                          })}
                          autoComplete="off"
                        />
                      ) : (
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          readOnly
                          {...register(item.name, {
                            required: item.required,
                            minLength: item.minLength,
                            maxLength: item.maxLength,
                          })}
                        >
                          <option value="-" disabled>
                            Select an Option
                          </option>
                          <option value="true">On</option>
                          <option value="false">Off</option>
                        </select>
                      )}
                    </div>
                  );
                })}
                <div className="btns w-full h-full flex justify-end items-end">
                  {!showMap || <ButtonComponent
                    text="Open Maps"
                    action={() => setMapVisible(true)}
                    style="green"
                  />}
                  {onlyView || <ButtonComponent
                    text="Save"
                    action={handleSubmit(onSubmit)}
                    style="default"
                  />}
                  {!sendNotiButton || <ButtonComponent style='yellow' text='Send Notification' action={() => setSendNotification(true)} />}
                  <ButtonComponent
                    text="Back"
                    style="red"
                    action={() => changeVisibility(false)}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      {sendNotification && <SendNotificationComponent sendAction={loadNotification} backAction={setSendNotification} />}
    </>
  );
}
