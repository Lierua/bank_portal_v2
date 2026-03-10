import { createClient } from "@/app/components/utilityComponents/supabase/client";
import { Profile } from "@/app/types/user";

export async function getCurrentUserProfile(): Promise<Profile | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, role, bank_assigned")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Profile fetch error:", error);
    return null;
  }

  return data;
}
