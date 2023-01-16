import {useCallback, useState} from 'react';

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(
        async (url: string, method = 'GET', data: Record<string, any> | null = null, headers: Record<string, string> = {}) => {
            setIsLoading(true);
            let body;

            try {
                if (data) {
                    body = JSON.stringify(data);
                    headers['Content-Type'] = 'application/json';
                }

                const res = await fetch('http://127.0.0.1:5555' + url, {method, body, headers});
                const resData = await res.json();

                if (!res.ok) {
                    throw new Error(resData || 'Something went wrong');
                }

                setIsLoading(false);

                return resData;
            } catch (err) {
                setIsLoading(false);
                setError(err as string);
                throw err;
            }
        }, []);

    return {isLoading, request, error};
};
