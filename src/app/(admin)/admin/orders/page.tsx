import { DatePickerWithRange } from "@/components/myshdchn/admin-date";
import { PopoverDemo } from "@/components/myshdchn/adminPopover";
import Image from "next/image";

export default function Catagory() {
  return (
    <div className="w-[90vw] flex flex-col items-end gap-6  ">
      <Image src="/Avatar.svg" alt="" width={35} height={35} />
      <div className=" w-[90vw] h-full bg-white p-7  border border-[#E4E4E7] rounded-sm ">
        <div className="flex justify-between items-center">
          <div className="w-[485px] h-[44x] flex flex-col items-start">
            <p className="text-[var(--text-text-foreground,#09090B)] font-inter text-[20px] font-bold leading-[28px] tracking-[-0.5px]">
              Order
            </p>
            <p className="text-[var(--text-text-muted-foreground,#71717A)] font-inter text-[12px] font-medium leading-[16px">
              23items
            </p>
          </div>
          <div>
            <DatePickerWithRange />
          </div>
          <div>
            <PopoverDemo />
          </div>
        </div>

        <div className="flex justify-between items-center"></div>
      </div>
    </div>
  );
}
