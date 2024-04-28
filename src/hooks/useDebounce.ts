import React, { useEffect } from "react";


export const useDebounce = (value: string, delay: number) => {

    const [debounceValue, setDebounceValue] = React.useState('')

    useEffect(() => {
        const t = setTimeout(() => setDebounceValue(value), delay)
        return () => clearTimeout(t)
    }, [value, delay])



    return debounceValue

}




