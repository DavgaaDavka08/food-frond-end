import { PopoverDemoFoodMenu } from "@/components/myshdchn/food-menu-popover";
import { PopoverDemoTwo } from "@/components/myshdchn/food-menu-popover2";

import Forms from "@/components/myshdchn/form";
import { InputWithButton } from "@/components/myshdchn/submit-input";
import Image from "next/image";

export default function Catagory() {
  return (
    <div className="w-[100%] h-screen] justify-center items-center flex flex-col bg-[#F4F4F5]">
      <div className="w-[92%] h-screen   flex flex-col gap-[24px]  m-auto items-end ">
        <Image alt="" src="/Avatar.svg" width={35} height={35} />
        <div className="w-[100%] flex p-6  flex-col  items-start gap-4 border border-[#E4E4E7] rounded-sm  bg-white">
          <div className="flex flex-col w-[485.2px] items-start">
            <h4 className="text-[#09090B] font-inter text-[20px] font-bold leading-7 tracking-[-0.5px] ">
              Dishesh
            </h4>
          </div>
          <div>
            <PopoverDemoFoodMenu />
          </div>
          <div>
            <PopoverDemoTwo />
          </div>
        </div>
      </div>
    </div>
  );
}
