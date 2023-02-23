export default function InputComponent({ placeholder, required = false, value, id, text_label, type = "text", form, isView = false}) {
    const { register, handleSubmit } = form
    return (
        <div className="w-full">
            {type == 'textarea'
                ? <><label htmlFor="{id}" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text_label}</label>
                    <textarea disabled={isView} id="{id}" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" value={value} placeholder={placeholder} {...register(id || 'example', { required, value })}></textarea></>
                : <><label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text_label}</label>
                    <input type={type} disabled={isView} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={value} placeholder={placeholder} {...register(id || 'example', { required, value })} /></>
            }
        </div>
    )
}