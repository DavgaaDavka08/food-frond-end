'use client';
import { FoodType } from "@/lib/Type-Props";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
type FoodContextType = {
  callData: FoodType[];
  setCallData: (_callData: FoodType[]) => void;
};
export const FoodContext = createContext<FoodContextType>(
  {} as FoodContextType
);
export const useFood = () => {
  return useContext(FoodContext);
};
function FoodProvider({ children }: { children: ReactNode }) {
  const [callData, setCallData] = useState<FoodType[]>([]);

  const getData = async () => {
    try {
      const getCategory = await fetch(
        "http://localhost:2000/api/food-category/:foodCategoryId"
      );
      const jsonCategory = await getCategory.json();
      setCallData(jsonCategory.getcategory);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  useEffect(() => {
    getData()
  }, [])
  console.log('callData context dataa!!!!!!s:>> ', callData);
  return (
    <FoodContext.Provider value={{ callData, setCallData }}>
      {children}
    </FoodContext.Provider>
  );
}
export default FoodProvider;