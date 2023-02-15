import ListTableComponent from "../../ListTableComponent"
import { useSlots } from "../../../hooks/useSlots"

export default function ListSlotsComponent() {
    const { slots } = useSlots()
    return (
        <ListTableComponent onlyView={false} items={slots} modelMap={false} />
    )
}