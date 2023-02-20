import InputComponent from "../Layout/InputComponent"
import ButtonComponent from "../Layout/ButtonComponent"
import { useForm, useWatch } from "react-hook-form";

export default function SendNotificationComponent({ backAction, sendAction }) {
    const form = useForm();
    const { control } = form
    const notificationValue = useWatch({ control })

    return (
        <div className="z-50 absolute bg-[#2d2d2d]/60 w-screen h-screen left-0 top-0 flex items-center justify-center">
            <div className="w-1/2 bg-gray-800 rounded-xl shadow-xl h-1/2 flex items-center justify-center">
                <div className="grid w-full h-full grid-cols-3">
                    <div className="flex items-center justify-start gap-4 w-full flex-col col-span-3 p-4">
                        <InputComponent id="title" placeholder="Notification Title" text_label="Title" type="text" form={form} key="title" required={true} />
                        <InputComponent id="body" placeholder="Notification Body" text_label="Body" type="textarea" form={form} key="body" required={true} />
                    </div>
                    <div className="col-span-2"></div>
                    <div className="w-full h-full col-span-1 flex items-center justify-center">
                        <ButtonComponent style="default" text="Send Notification" action={() => { sendAction(notificationValue); backAction(false) }} />
                        <ButtonComponent style="red" text="Back"  action={() => backAction(false)} />
                    </div>
                </div>
            </div>
        </div>
    )
}