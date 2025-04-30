import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../server";

export const useSignout = () => {
  const navigate = useNavigate();

  const callback = async () => {
    await server.auth.signOut();
    navigate("/login");
  };

  return { callback };
};

export const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const callback = async (email: string, password: string) => {
    setLoading(true);
    setError(undefined);

    const { error } = await server.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    setLoading(false);
  };

  return { callback, loading, error };
};

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const callback = async (
    email: string,
    password: string,
    username: string
  ) => {
    setLoading(true);
    setError(undefined);

    const { data, error } = await server.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // After sign up, insert into profiles table
    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await server
        .from("profiles")
        .insert([{ id: userId, display_name: username }]);

      if (profileError) {
        setError(profileError.message ?? "Unknown error");
        setLoading(false);
        return;
      }
    }

    setLoading(false);
  };

  return { callback, loading, error };
};
