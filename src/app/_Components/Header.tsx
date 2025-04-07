
import { DialogDemoHeaders } from "@/components/ui/myshdchn/api-Shadchn/headerdialogy";
import { DropdownMenuDemo } from "@/components/ui/myshdchn/api-Shadchn/headerDropDownMenu";
import { InputDemoHeaders } from "@/components/ui/myshdchn/HeaderInput";
import { SheetDemo } from "@/components/ui/myshdchn/sheet";
import Image from "next/image";
export default function Header() {
  return (
    <div className="w-full h-[84px] bg-[#18181B]">
      <div className="w-[1440px] flex  py-[12px] px-[88px] justify-between m-auto items-center ">
        <div className="flex items-center gap-3">
          <Image width={50} height={50} src="/logo.svg" alt="" />
          <div>
            <div className="flex">
              <h4 className="text-[#FAFAFA] font-inter text-[20px] font-semibold leading-[28px] tracking-[-0.5px]">
                Nom
              </h4>
              <h4 className="text-[#EF4444] font-inter text-[20px] font-semibold leading-[28px] tracking-[-0.5px]">
                Nom
              </h4>
            </div>
            <h5 className="text-[#F4F4F5] text-center font-inter text-[12px] font-normal leading-[16px]">
              Swift delivery
            </h5>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <div className="absolute left-3 cursor-pointer">
              <DialogDemoHeaders />
            </div>
            <InputDemoHeaders />
          </div>
          <SheetDemo />
          <DropdownMenuDemo />
        </div>
      </div>
    </div>
  );
}
