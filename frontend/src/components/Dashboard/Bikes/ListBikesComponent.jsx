import ListTableComponent from "../../ListTableComponent";
import { useBikes } from "../../../hooks/useBikes";

export default function ListBikesComponent() {
    const { bikes, updateBike, deleteBike, cols, createBike } = useBikes()
    console.log(cols);

    return (
        <ListTableComponent items={bikes} addAction={createBike} model={cols} modelMap={false} onlyView={false} updateAction={updateBike} removeAction={({ id_bike }) => deleteBike(id_bike)} />
    )
}