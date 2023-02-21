import ListTableComponent from "../../ListTableComponent";
import { useBikes } from "../../../hooks/useBikes";

export default function ListBikesComponent() {
    const { bikes, updateBike } = useBikes()

    const update = (data) => {
        updateBike(data)
    }

    return (
        <ListTableComponent items={bikes} modelMap={false} onlyView={false} updateAction={update} />
    )
}