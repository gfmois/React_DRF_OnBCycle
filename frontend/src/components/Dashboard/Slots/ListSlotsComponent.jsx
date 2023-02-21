import ListTableComponent from "../../ListTableComponent"
import { useSlots } from "../../../hooks/useSlots"

export default function ListSlotsComponent() {
    const { slots, updateSlot, removeSlot, cols, addSlot } = useSlots()
    const remove = (item) => removeSlot(item.id_slot)
    
    return (
        <ListTableComponent model={cols} addAction={addSlot} onlyView={false} items={slots} modelMap={false} updateAction={updateSlot} removeAction={remove} />
    )
}