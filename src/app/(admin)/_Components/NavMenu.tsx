import {
  ButtonAdmin,
  ButtonAdminTree,
  ButtonAdminTwo,
} from "@/components/myshdchn/buttun-admin";
import Link from "next/link";

export default function NavMenu() {
  return (
    <div className="w-[295px] h-screen  flex pt-9 pb-9 px-[var(--spacing-5,20px)] flex-col items-start gap-10 flex-shrink-0">
      <div className="flex gap-2">
        <img src="/logo.svg" alt="" />
        <div className="flex flex-col">
          <h4 className="text-[18px] normal leading-7 font-semibold text-[#09090B]">
            NomNom
          </h4>
          <p className="font-[Inter] text-[12px] normal leading-4 font-semibold text-[#71717A]">
            Swift delivery
          </p>
        </div>
      </div>
      <Link href={"/admin/foodmenu"}>
        <ButtonAdmin />
      </Link>

      <Link href={"/admin/orders"}>
        <ButtonAdminTwo />
      </Link>
      <Link href={"/admin/outline"}>
        <ButtonAdminTree />
      </Link>
    </div>
  );
}
