"use client";

import { IoIosLogOut } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import SearchBar from "../utilityComponents/SearchBar";
import DateRangePicker from "../utilityComponents/DateRangePicker";
import LocationDropdown from "./LocationDropdown";

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: (v: string) => void;
};

export default function NavHeader({
  search,
  setSearch,
  location,
  setLocation,
}: Props) {
  const router = useRouter();

  const logout = () => {
    document.cookie = "dev-login=; Max-Age=0; path=/";
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="grid grid-cols-[70px_200px_1fr] h-[70px] items-center">
      <div className="h-full bg-(--prime) text-4xl text-white flex items-center justify-center font-bold rounded-tl-lg">
        lk
      </div>

      <h2 className="pl-5 font-bold text-(--black)/90">Oversigt</h2>

      <div className="flex justify-between items-center px-5">
        <div className="flex items-center gap-8">
          <div className="w-[250px]">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          <DateRangePicker />

          {/*           <LocationDropdown location={location} setLocation={setLocation} /> */}
        </div>

        <div className="flex items-center gap-4">
          <h3 className="font-bold">Line Christiansen</h3>
          <IoPersonCircleOutline className="text-5xl" />
          <IoIosLogOut
            onClick={logout}
            className="text-[40px] cursor-pointer hover:text-(--contrast)"
          />
        </div>
      </div>
    </div>
  );
}
