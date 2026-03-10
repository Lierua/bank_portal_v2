"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosLogIn } from "react-icons/io";

import ButtonOne from "@/app/components/utilityComponents/ButtonOne";
import InputField from "@/app/components/utilityComponents/formUtilities/InputField";
import Error from "@/app/components/utilityComponents/formUtilities/Error";

import { submitLogin, FormState } from "@/app/action/action";

export default function Login() {
  const router = useRouter();

  const initialState: FormState = {
    success: false,
  };

  const [state, formAction] = useActionState<FormState, FormData>(
    submitLogin,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      document.cookie = "dev-login=true; path=/";
      router.push("/requests");
    }
  }, [state.success, router]);

  return (
    <main className="flex h-screen items-center justify-center">
      <form
        action={formAction}
        className="h-[550px] w-[400px] bg-white flex flex-col gap-2 p-10 rounded-3xl shadow"
      >
        <IoIosLogIn className="text-6xl self-start mx-auto" />
        <div className="w-full grid gap-2 mb-6">
          <h1 className="mx-auto">Log in</h1>
          <div className="h-[3px] bg-gray-300 rounded-full w-[80%] mx-auto" />
        </div>

        <div className="flex flex-col">
          <InputField<FormState>
            state={state}
            dataInput="accountMail"
            type="email"
            placeholder="Email"
          />
          <div className="h-[30]">
            <Error<FormState> state={state} stateType="accountMail" />
          </div>
        </div>

        <div className="flex flex-col">
          <InputField<FormState>
            state={state}
            dataInput="password"
            type="password"
            placeholder="Password"
          />
          <div className="h-[30]">
            <Error<FormState> state={state} stateType="password" />
          </div>
        </div>

        <ButtonOne type="submit" label="Log ind (dev)" />
      </form>
    </main>
  );
}
