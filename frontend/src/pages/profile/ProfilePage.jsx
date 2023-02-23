import { useState } from "react";
import { useAuth } from "../../hooks/useAuth"
import { useRent } from "../../hooks/useRent"
import ListRentsCompoenent from "../../components/Profile/ListRentsComponent";
import InputComponent from "../../components/Layout/InputComponent"
import ButtonComponent from "../../components/Layout/ButtonComponent";
import { useForm, useWatch } from "react-hook-form";
import { useProfile } from "../../hooks/useProfile";
import { useToast } from "../../hooks/useToaster";

export default function ProfilePage() {
    const { user } = useAuth()
    const { updateProfile } = useProfile()
    const { userRents } = useRent()
    const form = useForm();
    const { control } = form
    const notificationValue = useWatch({ control })
    const { loadToast } = useToast()

    const update = () => {
        if (notificationValue.password !== notificationValue.re_password) {
            loadToast("Passwords doesn't not match", 'warning')
            return
        }

        updateProfile(notificationValue)
    }

    return (
        <div className="w-screen h-[93vh] p-4 relative flex flex-col gap-4">
            <div className="w-full h-[25%] bg-[url(/bike.jpg)] bg-no-repeat bg-cover p-4 rounded-lg shadow-xl" />
            <img src={user.avatar} className="absolute top-[20%] rounded-full w-[128px] h-[128px] xs:left-[35%] sm:left-[43%] md:left-[48%] shadow-xl" />
            <div className="w-full h-[65%] bg-gray-200 rounded-lg grid grid-cols-3 p-2">
                <div className="bg-black/40 mt-16 p-4 flex justify-start flex-col gap-4">
                    <h1 className="text-black text-2xl text-center uppercase">Settings</h1>
                    <InputComponent id="email" placeholder={user.email} value={user.email} isView={true} required={true} type="email" text_label="Email" form={form} />
                    <InputComponent id="name" placeholder={user.name} isView={false} required={true} type="text" text_label="Name" form={form} />
                    <InputComponent id="password" placeholder="Password" isView={false} required={true} type="password" text_label="password" form={form} />
                    <InputComponent id="re_password" placeholder="Repeat Password" isView={false} required={true} type="password" text_label="password" form={form} />
                    <ButtonComponent text="Update" style="default" action={update} />
                </div>
                <div className="bg-black/60 mt-16 col-span-2 p-4">
                    <ListRentsCompoenent rents={userRents} />
                </div>
            </div>
        </div>
    )
}