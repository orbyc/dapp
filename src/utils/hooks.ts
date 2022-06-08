import { useCallback, useState } from "react";

type FetchResult<T> = { data: T | undefined, loading: boolean, error: Error | undefined }

export default function useFetch<T>(source: Promise<T>): FetchResult<T> {
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error>()

    useCallback(() => {
        source
            .then((value) => {
                setData(value);
                setLoading(false)
            })
            .catch(e => {
                setError(e);
                setLoading(false)
            })
    }, [source, setData, setLoading, setError])

    return { data, loading, error }
}