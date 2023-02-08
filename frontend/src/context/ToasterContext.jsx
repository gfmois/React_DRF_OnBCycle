import React, { useCallback, useState } from "react";

const Context = React.createContext();

export function ToastContextProvider({ children }) {
    const [toast, setToast] = useState(null)

    const loadToast = useCallback((message, icon) => { setToast({ message, icon }); console.log('CALLED') }, []);
    const cleanToast = useCallback(() => { setToast(null) }, []);

    return (
        <Context.Provider value={{ toast, loadToast, cleanToast }}>
            { children }
        </Context.Provider>
    )
}

export default Context