import Image from "next/image";
import { CalendarForm } from "./_order-shadcin/calendar";
import { Button } from "@/components/ui/button";
import { CheckboxDemo } from "./_order-shadcin/checkBox";
import { DialogDemo } from "./_order-shadcin/Dialogy";
export default function Catagory() {

  return (
    <div className="w-[100%] h-screen] justify-center items-center flex flex-col bg-[#F4F4F5]">
      <div className="w-[92%] h-[700px]  flex flex-col gap-[24px]  m-auto items-end ">
        <Image alt="" src="/Avatar.svg" width={35} height={35} />
        <div className="w-[100%] flex p-4 justify-between  items-center border border-[#E4E4E7] rounded-sm  bg-white">
          <div className="flex flex-col w-[485.2px] items-start">
            <h4 className="text-[#09090B] font-inter text-[20px] font-bold leading-7 tracking-[-0.5px] ">
              order
            </h4>
            <h3>32items</h3>
          </div>
          <div>
            <CalendarForm />
          </div>
          <div>
            <Button className="bg-gray-500 rounded-2xl text-black ">chanche Delivery State</Button>
          </div>
        </div>
        <div className="w-[100%] flex p-4 justify-between  items-center border border-[#E4E4E7] rounded-sm  bg-white">
          <div className="flex gap-8 flex-col items-center justify-between w-[100%]">
            <div className="flex items-center justify-between w-[100%]">
              <CheckboxDemo />
              <h3>%</h3>
              <h4>Custumer</h4>
              <h3>Food</h3>
              <h3>Date</h3>
              <h3>total</h3>
              <h3><DialogDemo /></h3>
            </div>
            <div className="flex items-center justify-between w-[100%]">
              <CheckboxDemo />
              <h3>%</h3>
              <h4>Custumer</h4>
              <h3>Food</h3>
              <h3>Date</h3>
              <h3>total</h3>
              <h3><DialogDemo /></h3>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
