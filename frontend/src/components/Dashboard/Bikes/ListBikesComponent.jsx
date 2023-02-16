import ListTableComponent from "../../ListTableComponent";
import { useBikes } from "../../../hooks/useBikes";

export default function ListBikesComponent() {
    const { bikes } = useBikes()
    return (
        <ListTableComponent items={bikes} modelMap={false} onlyView={false} />
    )
}