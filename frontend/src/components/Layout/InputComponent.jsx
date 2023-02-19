export default function InputComponent({ placeholder, required = false, id, text_label, type = "text", form }) {
    const { register, handleSubmit } = form
    return (
        <div className="w-full">
            {type == 'textarea'
                ? <><label for="{id}" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text_label}</label>
                    <textarea id="{id}" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder={placeholder} {...register(id || 'example', { required })}></textarea></>
                : <><label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text_label}</label>
                    <input type={type} id={id} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} {...register(id || 'example', { requred: required })} /></>
            }
        </div>
    )
}