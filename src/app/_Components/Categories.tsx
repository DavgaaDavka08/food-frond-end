"use client"
import { Button } from "@/components/ui/button"
import { useFood } from "../_Context/FoodMenuContext"

export default function FoodCategories() {
    const { callData } = useFood()
    const categories = [{
        hool: "mongulian food",
        salad: "Salads",
        tsai: "Drinks"
    }
    ]
    return (
        <div className="w-full h-[150px] m-auto flex items-center flex-col  ">
            <h2 className="text-3xl font-bold text-white mb-6">Categories</h2>
            <div className="flex gap-4 items-start justify-center">
                {categories.map((item, index) => {
                    return <div className="flex gap-3 items-center" key={index}>
                        <Button>{item.hool}</Button>
                        <Button>{item.salad}</Button>
                        <Button>{item.tsai}</Button>
                    </div>
                })}

                {callData?.map((item, index) => {
                    return <div className="flex gap-3 items-center" key={index}>
                        <Button><p className="text-[#EF4444]">{item.categoryName}</p></Button>
                    </div>
                })}
            </div>
        </div>
    )
}


