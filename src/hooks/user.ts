import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { server } from "../server/server";

interface ExtendedUser extends User {
  display_name?: string;
  is_admin?: boolean;
}

export const useGetCurrentUser = () => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (user) {
      const { data, error } = await server
        .from("profiles")
        .select("display_name, is_admin")
        .eq("id", user.id)
        .single();

      if (error) {
        setError(error.message);
        return;
      }

      setUser({
        ...user,
        display_name: data.display_name,
        is_admin: data.is_admin,
      });
    }
  };

  const fetchUser = async () => {
    setError(null);
    setLoading(true);

    const { data, error } = await server.auth.getUser();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setUser(data.user);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
    fetchProfile();
  }, []);

  return { user, loading, error };
};
