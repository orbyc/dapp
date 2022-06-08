import { NotificationContext, pushNotification } from "context/notification";
import { useContext, useEffect, useState } from "react";

type FetchResult<T> = { data: T | undefined, loading: boolean, error: Error | undefined }

export function useFetch<T>(source: Promise<T>): FetchResult<T> {
    const { dispatch } = useContext(NotificationContext)

    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error>()

    useEffect(() => {
        source
            .then((value) => {
                setData(value);
                setLoading(false)
            })
            .catch(e => {
                setError(e);
                setLoading(false)
                dispatch(pushNotification({ message: e, type: "ERROR" }))
            })
    }, [source, setData, setLoading, setError, dispatch])

    return { data, loading, error }
}