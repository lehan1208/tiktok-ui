import { useState, useEffect } from 'react'

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState('')

    useEffect(() => {
        const handler = setTimeout(() => { setDebounceValue(value) }, delay);

        return () => clearTimeout(handler);
        // useEffect return về 1 hàm clearTimeout khi dep(value) thay đổi hoặc component bị unMount

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return debounceValue;
}

export default useDebounce