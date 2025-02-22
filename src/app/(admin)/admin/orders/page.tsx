import { DatePickerWithRange } from "@/components/myshdchn/admin-date";
import { PopoverDemo } from "@/components/myshdchn/adminPopover";
import { AlignVerticalJustifyStart } from "lucide-react";

export default function Catagory() {
  return (
    <div className="w-[1180px] h-[948px] flex flex-col items-end gap-6  ">
      <img src="/Avatar.svg" alt="" />
      <div className=" w-[1149px] h-screen bg-white  p-4 border border-[#E4E4E7] rounded-sm ">
        <div className="flex justify-between items-center   ">
          <div className="w-[485px] h-[44x] flex flex-col items-start">
            <p>Order</p>
            <p>23items</p>
          </div>
          <div>
            <DatePickerWithRange />
          </div>
          <div>
            <PopoverDemo />
          </div>
        </div>
        <div>njfdksbfj</div>
      </div>
    </div>
  );
}
