import ListTableComponent from "../../ListTableComponent"

export default function ListSlotsComponent() {
    return (
        <ListTableComponent thead={['id', 'id_station', 'status']} />
    )
}