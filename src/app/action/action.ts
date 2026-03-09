"use server";

import { z } from "zod";
import { createClient } from "@/app/components/utilityComponents/supabase/client";

/* ============================
   SCHEMA
============================ */

const loginSchema = z.object({
  accountMail: z.string().email("Venligst indtast en gyldig Email"),
  password: z.string().min(1, "Venligst indtast et password"),
});

/* ============================
   TYPES
============================ */

export type LoginData = z.infer<typeof loginSchema>;

export type FormState = {
  success: boolean;
  data?: LoginData;
  error?: Record<string, string[]>;
};

/* ============================
   SERVER ACTION
============================ */

export async function submitLogin(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const rawData = {
    accountMail: String(formData.get("accountMail") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  // Validate with Zod
  const parsed = loginSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const { accountMail, password } = parsed.data;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: accountMail,
    password,
  });

  if (error) {
    return {
      success: false,
      error: {
        password: ["Forkert email eller password"],
      },
    };
  }

  return {
    success: true,
    data: parsed.data,
  };
}
