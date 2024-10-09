import { useState, useEffect } from "react";

export function useLocalStorage(key, inititialValue) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key);
        if(jsonValue != null) return JSON.parse(jsonValue);

        if(typeof inititialValue === 'function') {
            return (inititialValue)()
        } else {
            return inititialValue
        }


    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)) 
    } , [key, value])


    return [value, setValue];
}