"use client"
import { FoodMenuDialogDemo } from "@/components/ui/myshdchn/api-Shadchn/foodMenuDialog";
import { DialogDemos } from "@/components/ui/myshdchn/api-Shadchn/foodMenuDialogs";
import { FoodType } from "@/lib/Type-Props";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Catagory() {
  const [getCategory, setGetCategory] = useState<FoodType[]>([]);
  const getData = async () => {
    try {
      const getCategory = await fetch(
        "http://localhost:2000/api/food-category/:foodCategoryId"
      );
      const jsonCategory = await getCategory.json();
      console.log("jsonCategory :>> ", jsonCategory);
      setGetCategory(jsonCategory.getfood); // getfood maani isfect iin getfoodshvv
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-[100%] h-screen  bg-[#F4F4F5] m-auto ">
      <div className="items-center w-[100%] h-[400px]  gap-8 justify-center flex flex-col ">
        <div className="w-[92%]  flex flex-col items-end">
          <Link href="/">
            <Image alt="" src="/Avatar.svg" width={35} height={35} />
          </Link>
        </div>
        <div className="w-[92%]  flex p-6  flex-col  items-start gap-4 border border-[#E4E4E7] rounded-sm  bg-white">
          <h4 className="text-[#09090B] font-inter text-[20px] font-bold leading-7 tracking-[-0.5px] ">
            Dishesh Category
          </h4>
          <div className="flex flex-wrap items-center content-center gap-x-3 gap-y-3 self-stretch">
            <p className="font-inter text-sm not-italic font-medium leading-5 flex h-9 px-4 py-2 items-center gap-2 rounded-full border border-[#EF4444]">All Dishesh</p>
            <p className="font-inter text-sm not-italic font-medium leading-5 flex h-9 px-4 py-2 items-center gap-2 rounded-full border border-[#EF4444]">Appetizers</p>
            <p className="font-inter text-sm not-italic font-medium leading-5 flex h-9 px-4 py-2 items-center gap-2 rounded-full border border-[#EF4444]">Salads</p>
            <p className="font-inter text-sm not-italic font-medium leading-5 flex h-9 px-4 py-2 items-center gap-2 rounded-full border border-[#EF4444]">Pizzas</p>
            <p className="font-inter text-sm not-italic font-medium leading-5 flex h-9 px-4 py-2 items-center gap-2 rounded-full border border-[#EF4444]">Lunch Favorite</p>
            <p className="font-inter text-sm not-italic font-medium leading-5 flex h-9 px-4 py-2 items-center gap-2 rounded-full border border-[#EF4444]">Fish &
              See Foods
            </p>
            <p className="font-inter text-sm not-italic font-medium leading-5 flex h-9 px-4 py-2 items-center gap-2 rounded-full border border-[#EF4444]">Brunch</p>
            <p className="font-inter text-sm not-italic font-medium leading-5 flex h-9 px-4 py-2 items-center gap-2 rounded-full border border-[#EF4444]">Side Dish</p>
            <p className="font-inter text-sm not-italic font-medium leading-5 flex h-9 px-4 py-2 items-center gap-2 rounded-full border border-[#EF4444]">deserts</p>
            <p className="font-inter text-sm not-italic font-medium leading-5 flex h-9 px-4 py-2 items-center gap-2 rounded-full border border-[#EF4444]">bevereges</p>
            <div>
              <FoodMenuDialogDemo />
            </div>
          </div>


        </div>
        <div className="w-[92%] flex flex-col  items-start gap-4 rounded-sm ">
          {getCategory?.map((data: FoodType, index) => {
            return <div key={index} className="w-[100%] flex p-6  flex-col  items-start gap-4 border border-[#E4E4E7] rounded-sm  bg-white">
              <div>
                <p>{data.categoryName}</p>
                <DialogDemos />
              </div>
            </div>
          })}
        </div>
      </div>
    </div>

  );
}
