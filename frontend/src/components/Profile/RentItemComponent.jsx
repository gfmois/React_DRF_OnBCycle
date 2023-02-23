export default function RentItemComponent({ rent }) {
    return (
        <div className="grid grid-cols-3 text-black gap-2 object-center">
            <div className="flex items-center rounded-full h-full justify-start p-1">
                <img src={rent.station_img} alt="Station Img" className="w-24 h-24 rounded-full" />
            </div>
            <div>
                <div className="flex flex-row gap-1">FROM: <p>{rent.from}</p></div>
                <div className="flex flex-row gap-1">TO: <p>{rent.to}</p></div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-2 text-sm">START: <p className="text-xs">{rent.start_date}</p></div>
                    <div className="flex flex-row gap-2 text-sm">END: <p className="text-xs">{rent.end_date}</p></div>
                </div>
                
            </div>
            <div className="text-sm">{rent.str_date}</div>
        </div>
    )
}