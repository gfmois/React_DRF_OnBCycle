import ListTableComponent from "../../ListTableComponent"
import { useRent } from "../../../hooks/useRent"

export default function ListRentsComponent() {
    const { rents } = useRent()
    return (
        <ListTableComponent items={rents} onlyView={true} modelMap={false} removeBtn={false} />
    )
}