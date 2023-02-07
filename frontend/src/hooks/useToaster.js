import { useContext } from "react";
import ToastContext from "../context/ToasterContext"

export function useToast() {
    const { toast, cleanToast, loadToast } = useContext(ToastContext)

    return { toast, cleanToast, loadToast }
}