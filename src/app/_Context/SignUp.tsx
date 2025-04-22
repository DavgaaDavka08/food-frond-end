'use client';
import { FoodType } from "@/lib/Type-Props";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
type SignUpTypes = {
    addSignUp: FoodType[];
    setAddSignUp: (addSignUp: FoodType[]) => void;
};
export const SignUp = createContext<SignUpTypes>(
    {} as SignUpTypes
);
export const useSignUp = () => {
    return useContext(SignUp);
};
function FoodSignUp({ children }: { children: ReactNode }) {
    const [addSignUp, setAddSignUp] = useState<FoodType[]>([]);
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:2000/nevtreh");
            const jsonData = await response.json();
            setAddSignUp(jsonData.getfood);
            console.log('nevtrehhh ', jsonData);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    console.log('addCategory context dataa!!!!! :>> ', addSignUp);
    return (
        <SignUp.Provider value={{ addSignUp, setAddSignUp }}>
            {children}
        </SignUp.Provider>
    );
}
export default FoodSignUp;