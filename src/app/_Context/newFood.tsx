'use client';
import { FoodType } from "@/lib/Type-Props";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
type FoodContextTypes = {
    addCategory: FoodType[];
    setAddCategory: (callfood: FoodType[]) => void;
};
export const FoodContexts = createContext<FoodContextTypes>(
    {} as FoodContextTypes
);
export const useFoods = () => {
    return useContext(FoodContexts);
};
function FoodProvider({ children }: { children: ReactNode }) {
    const [addCategory, setAddCategory] = useState<FoodType[]>([]);
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:2000/food");
            const jsonData = await response.json();
            setAddCategory(jsonData.getfood);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <FoodContexts.Provider value={{ addCategory, setAddCategory }}>
            {children}
        </FoodContexts.Provider>
    );
}
export default FoodProvider;