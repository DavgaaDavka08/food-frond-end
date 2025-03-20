
import { FoodMenuDialogDemo } from "@/components/myshdchn/api-Shadchn/foodMenuDialog";
import Image from "next/image";
import Link from "next/link";
export default function Catagory() {
  return (
    <div className="w-[100%] h-screen  bg-[#F4F4F5] m-auto ">
      <div className="items-center w-[100%] h-[256px] gap-8 justify-center flex flex-col ">
        <div className="w-[92%]  flex flex-col items-end">
          <Link href="/">
            <Image alt="" src="/Avatar.svg" width={35} height={35} />
          </Link>
        </div>
        <div className="w-[92%] flex p-6  flex-col  items-start gap-4 border border-[#E4E4E7] rounded-sm  bg-white">
          <h4 className="text-[#09090B] font-inter text-[20px] font-bold leading-7 tracking-[-0.5px] ">
            Dishesh
          </h4>
          <div>
            <div>
              <FoodMenuDialogDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
