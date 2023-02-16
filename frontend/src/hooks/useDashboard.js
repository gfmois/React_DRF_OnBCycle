import { useCallback, useState } from "react";

export function useDashboard() {
    const [bikes, setBikes] = useState([])
    const [issues, setIssues] = useState([])
    
    const getBikes = useCallback(() => {
        
    })
}