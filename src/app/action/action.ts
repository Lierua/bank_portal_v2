"use server";

import { z } from "zod";

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

// form inputs
export type LoginData = z.infer<typeof loginSchema>;

// form state returned to UI
export type FormState = {
  success: boolean;
  data?: LoginData;
  error?: Record<string, string[]>;
};

/* ============================
   SERVER ACTION
============================ */

export async function submitLogin(
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const rawData: LoginData = {
    accountMail: formData.get("accountMail") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
      data: rawData,
    };
  }

  return {
    success: true,
    data: parsed.data,
    error: {},
  };
}
