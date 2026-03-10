import { createClient } from "@/app/components/utilityComponents/supabase/client";
import { transformRequest } from "../components/utilityComponents/supabase/transformRequest";
import type { Request } from "../types/request";

export async function getRequests(): Promise<Request[]> {
  const supabase = createClient();

  const { data, error } = await supabase.from("loan_requests").select(`
      *,
      budgets (
        *,
        budget_lines (*)
      )
    `);

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  if (!data) return [];

  return data.map(transformRequest);
}

/* =========================
   Toggle Request Handler
========================= */

export async function toggleRequestHandler(
  requestId: number,
  handlerId: string | null,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("loan_requests")
    .update({
      flagged: handlerId,
    })
    .eq("id", requestId)
    .select()
    .single();

  if (error) {
    console.error("Handler update failed");
    console.error("message:", error.message);
    console.error("details:", error.details);
    console.error("hint:", error.hint);
    console.error("code:", error.code);
    return null;
  }

  return data;
}
