"use client";

import { IoIosLogOut } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

import { createClient } from "@/app/components/utilityComponents/supabase/client";
import { useUser } from "@/app/hooks/useUser";

import SearchBar from "../utilityComponents/SearchBar";
import DateRangePicker from "../utilityComponents/DateRangePicker";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function NavHeader({ search, setSearch }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const { profile } = useUser();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="grid grid-cols-[70px_140px_1fr] h-[70px] items-center">
      <div className="h-full bg-(--prime) text-4xl text-white flex items-center justify-center font-bold rounded-tl-lg">
        lk
      </div>

      <h2 className="pl-5 font-bold text-(--black)/90">Oversigt</h2>

      <div className="flex justify-between items-center px-5">
        <DateRangePicker />

        <div className="w-full px-10">
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="flex items-center gap-4 min-w-[300]">
          <h3 className="font-bold truncate pr-1">
            {profile?.full_name ?? ""}
          </h3>

          <IoPersonCircleOutline className="text-5xl text-(--black)" />

          <IoIosLogOut
            onClick={logout}
            className="text-[40px] cursor-pointer text-(--black) hover:text-(--contrast) ml-auto"
          />
        </div>
      </div>
    </div>
  );
}
