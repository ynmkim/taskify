import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

export const useAsync = <T>(asyncFunction: () => Promise<AxiosResponse<T>> | void, lazyMode: boolean = false) => {
  const [error, setError] = useState<null | any>(null);
  const [data, setData] = useState<null | T>(null);
  const [status, setStatus] = useState<null | number>(null);

  const execute = async () => {
    setError(null);
    setData(null);
    setStatus(null);
    try {
      const response = await asyncFunction();
      setData(response?.data ?? null);
      setStatus(response?.status ?? null);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (!lazyMode) {
      execute();
    }
  }, [lazyMode]);

  return { execute, error, data, status };
};
