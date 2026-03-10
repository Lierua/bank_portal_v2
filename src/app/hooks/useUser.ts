"use client";

import { useEffect, useState } from "react";
import { getCurrentUserProfile } from "@/app/services/userService";
import { Profile } from "@/app/types/user";

export function useUser() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile);
      setLoading(false);
    };

    loadUser();
  }, []);

  return {
    profile,
    loading,
  };
}
