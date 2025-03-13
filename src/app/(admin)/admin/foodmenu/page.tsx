import { DialogDemos } from "@/components/myshdchn/food-menu-dialog";

import { PopoverDemoTwo } from "@/components/myshdchn/food-menu-popover2";

import Forms from "@/components/myshdchn/form";
import { InputWithButton } from "@/components/myshdchn/submit-input";
import Image from "next/image";

export default function Catagory() {
  return (
    <div className="w-[100%] h-screen  items-center gap-5 m-auto flex flex-col bg-[#F4F4F5]">
      <div className="w-[92%] h-[89px] flex flex-col items-end">
        <Image alt="" src="/Avatar.svg" width={35} height={35} />
      </div>
      <div className="w-[92%] flex p-6  flex-col  items-start gap-4 border border-[#E4E4E7] rounded-sm  bg-white">
        <h4 className="text-[#09090B] font-inter text-[20px] font-bold leading-7 tracking-[-0.5px] ">
          Dishesh
        </h4>
        <div>
          <PopoverDemoTwo />
        </div>
      </div>
      <div className="w-[92%] flex p-6  flex-col  items-start gap-4 border border-[#E4E4E7] rounded-sm  bg-white">
        <div>
          <DialogDemos />
        </div>
      </div>
    </div>
  );
}
