import { useState } from 'react';

export const useDataManager = (callback, defaultData, onError) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(defaultData);

    const call = (...args) => {
        setIsLoading(true);
        setTimeout(async () => {
            try {
                const data = await callback(...args);
                setData(data);
            } catch (error) {
                if (onError) {
                    onError(error);
                }
            }
            setIsLoading(false);
        });
    };

    return [call, isLoading, data];
};

export const useToggle = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const toggle = () => setValue((value) => !value);

    return [value, toggle];
};
