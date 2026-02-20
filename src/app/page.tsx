import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const loggedIn = cookieStore.get("dev-login");

  if (!loggedIn) {
    redirect("/login");
  }

  redirect("/requests");
}
