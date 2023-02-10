import ListTableComponent from "../../ListTableComponent";

export default function ListInboxItemsComponent() {
    const head = ['Message', 'Title', 'Type', 'User', 'Status']

    return (
        <ListTableComponent thead={head} />
    )
}