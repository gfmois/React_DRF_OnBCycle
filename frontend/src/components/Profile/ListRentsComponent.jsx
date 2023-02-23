import RentItemComponent from "./RentItemComponent"

export default function ListRentsCompoenent({ rents = [] }) {
    return (
        <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-2 w-full h-full overflow-y-scroll remove-scroll">
            {
                rents.map((rent) =>
                    <div className="bg-white w-full md:h-[25%] p-1 rounded-lg shadow-lg">
                        <RentItemComponent rent={rent} />
                    </div>
                )
            }
        </div>
    )
}