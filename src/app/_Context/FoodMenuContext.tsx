"use client";
import { FoodType } from "@/lib/Type-Props";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type FoodContextType = {
  callData: FoodType;
  setCallData: (_callData: FoodType) => void;
};
///222context -ee uusgeh
export const FoodContext = createContext<FoodContextType>(
  {} as FoodContextType
);
/// use gedeg ug asiglah use gedeg ug ashiglaj baij haa saigvv duudaj bolno
export const useFood = () => {
  //reactiin hook components dotorl ajilna
  return useContext(FoodContext);
};
//111wrapoer buyuu gaduur ni orooh context uusgeh
const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [callData, setCallData] = useState<FoodType>();
  const getData = async () => {
    try {
      const getCategory = await fetch(
        "http://localhost:2000/api/food-category/:foodCategoryId"
      );
      const jsonCategory = await getCategory.json();
      console.log("jsonCategory :>> ", jsonCategory);

      setCallData(jsonCategory.getfood || []); // getfood байхгүй бол хоосон массив өгөх
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    //333uusgesen contex aa provideraar ni orooj ogoh
    <FoodContext.Provider value={{ callData, setCallData }}>

      {children}
    </FoodContext.Provider>
  );

};

export default FoodProvider;
