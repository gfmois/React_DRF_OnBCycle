import ListTableComponent from "../../ListTableComponent";
import FormModalComponent from "../../FormModalComponent"
import { useEffect, useState } from "react"
import { useAuth } from "../../../hooks/useAuth";

export default function ListUserComponent() {
    // TODO: Set delete function and update function
    const { getUsers, usersList } = useAuth()

    useEffect(() => {
        getUsers()
    }, [])

    return <ListTableComponent items={usersList} key={usersList.length} modelMap={false} />
}