import { useState,useEffect } from "react";

export default function useMessage(initialValue = "", duration = 3000) {
    const [message, setMessage] = useState(initialValue);

    useEffect(() => {
        let timer;
        if (message !== "") {
            timer = setTimeout(() => setMessage(""), duration);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [message, duration]);

    return [message, setMessage];
}
