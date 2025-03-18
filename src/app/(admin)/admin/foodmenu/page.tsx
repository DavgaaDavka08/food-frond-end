"use client";
import { DialogDemos } from "@/components/myshdchn/food-menu-dialog";
import { PopoverDemoTwo } from "@/components/myshdchn/food-menu-popover2";
import { FoodType } from "@/lib/Type-Props";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Catagory() {
  const [getDatas, setGetDatas] = useState([]);
  const getData = async () => {
    try {
      const data = await fetch("http://localhost:9999/food");
      const jsonData = await data.json();
      console.log("aaaa", jsonData);
      setGetDatas(jsonData.getfood);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
      {getDatas.map((item: FoodType, index) => {
        return (
          <div
            key={index}
            className="w-[92%] h-[582px] max-w-[92%] flex p-6   flex-col  items-start gap-4 border border-[#E4E4E7] rounded-sm  bg-white"
          >
            <h4 className="text-[#09090B] font-inter text-[20px] font-bold leading-7 tracking-[-0.5px]">
              <p>{item.FoodName}</p>
            </h4>
            <div className="flex ">
              <DialogDemos />
            </div>
          </div>
        );
      })}
    </div>
  );
}
