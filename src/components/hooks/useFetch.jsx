import { useState, useCallback } from "react";

function useFetch() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //TODO: http Hook
    const act = useCallback(async (url, options, cb) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(url, options);
            const data = await res.json();

            if(data) cb(data);

        } catch(err) {
            setError(err);
        }
        setLoading(false);
    }, []);

    return [loading, error, act];
}

export default useFetch;