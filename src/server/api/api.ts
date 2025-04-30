import { useState } from "react";
import { server } from "../server";

export interface APIResponse<TRequest, TResponse> {
  callback: (request: TRequest) => Promise<TResponse>;
  loading?: boolean;
  error?: string;
}

export const useAPI = <TRequest, TResponse>(
  url: string
): APIResponse<TRequest, TResponse> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const callback = async (args: TRequest) => {
    setLoading(true);
    setError(undefined);

    const { data, error } = await server.functions.invoke(url, {
      body: { name: "Functions", args },
    });

    if (error) {
      setError(data.error.message ?? "Unknown error");
    }

    setLoading(false);

    return data;
  };

  return { callback, loading, error };
};
