import ListTableComponent from "../../ListTableComponent";
import FormModalComponent from "../../FormModalComponent"
import { useEffect, useState } from "react"
import { useAuth } from "../../../hooks/useAuth";

export default function ListUserComponent() {
    const head = ['id', 'name', 'email', 'phone']
    const { getUsers, usersList } = useAuth()
    const [user, setUser] = useState(false)
    const [keys, setKeys] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        setKeys(Object.keys(user))
    }, [user])

    return !user ?
        <ListTableComponent thead={head} items={usersList} key={usersList.length} itemClicked={setUser} />
        : <FormModalComponent cols={keys} changeVisibility={(() => setUser(false))} item={user} />
}