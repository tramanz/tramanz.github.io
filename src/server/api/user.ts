import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { server } from "../server";

interface ExtendedUser extends User {
  display_name?: string;
  is_admin?: boolean;
}

export const useGetCurrentUser = () => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setError(null);
    setLoading(true);

    const { data: authData, error: authError } = await server.auth.getUser();

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const { data: profilesData, error: profilesError } = await server
      .from("profiles")
      .select("display_name, is_admin")
      .eq("id", authData.user.id)
      .single();

    if (profilesError) {
      setError(profilesError.message);
      setLoading(false);
      return;
    }

    setUser({
      ...authData.user,
      ...profilesData,
    });
    setLoading(false);
  }, [setUser, setError, setLoading]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error };
};
