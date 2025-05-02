"use client";
import { FoodType } from "@/lib/Type-Props";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFood } from "../_Context/FoodMenuContext";
export const Food = () => {
  const [addCategory, setAddCategory] = useState<FoodType[]>([]);
  const { callData } = useFood();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:2000/food");
      const jsonData = await response.json();
      console.log("Food data!!!", jsonData);
      setAddCategory(jsonData.getfood);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // console.log("data", callData, addCategory)
  return (
    <div>
      <div className="w-[95%] h-screen  flex flex-col items-start  m-auto justify-around">
        {(callData ?? []).map((data: FoodType, index: number) => (
          <div key={index}>
            <p className="text-[19`px] text-red-500">{data.categoryName}</p>
            <div className="flex m-auto items-center gap-9 flex-wrap">
              {addCategory
                ?.filter((food) => data._id === food.category?._id)
                .map((data, index) => (
                  <div
                    key={index}
                    className="w-[280px] bg-white h-[292px] flex flex-col p-4 items-start gap-4 rounded-xl shadow-md border border-gray-200"
                  >
                    <div className="relative w-full">
                      <Image
                        src={data.image || "/fallback-image.png"}
                        alt="Food image"
                        width={280}
                        height={140}
                        className="rounded-md object-cover"
                      />

                      <Button className="absolute bottom-2 right-2 bg-white w-7 h-7 flex items-center justify-center rounded-full shadow-md text-red-500 text-lg font-bold">
                        +
                      </Button>
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <p className="text-[12px] leading-[28px] font-semibold tracking-[-0.6px] text-[#EF4444] font-inter">
                        {data.foodName}
                      </p>
                      <p className="text-[11px] leading-[20px] font-bold text-[#09090B] font-inter border border-black px-1 rounded-sm">
                        ${data.price}
                      </p>
                    </div>
                    <p className="text-[12px] text-[#09090B] font-normal leading-[18px] font-inter">
                      {data.ingredients}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
