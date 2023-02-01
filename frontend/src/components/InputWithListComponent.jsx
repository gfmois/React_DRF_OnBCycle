export default function InputWithListComponent({
  onItemSelected,
  items,
  actionOnInput,
  placeholder,
}) {
  return (
    <>
      <div className="gap-2 p-2 flex flex-col w-full h-full">
        <input
          type="text"
          id="inputwlist"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          onInputCapture={actionOnInput}
        />
        {items ? (
          <div className="gap-2 flex flex-col p-1 w-full h-[110px] overflow-y-scroll remove-scroll">
            {items.map((e) => (
              <div
                key={e.id}
                className="bg-gray-700 rounded-md h-full w-full p-2 cursor-pointer"
                onClick={() => onItemSelected(e)}
              >
                {e.place_name}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
