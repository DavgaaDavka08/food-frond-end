
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FoodType } from "@/lib/Type-Props"
import Image from "next/image"
import { useEffect, useState } from "react"

export function DialogDemoEdits() {
    const [getFood, setGetFood] = useState<FoodType[]>([]);
    const [addFood, setAddFood] = useState<FoodType[]>([]);
    //api
    const getData = async () => {
        try {
            const response = await fetch("http://localhost:2000/food");
            const jsonData = await response.json();
            setGetFood(jsonData.getfood);
            console.log('object :>> ', jsonData);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    //addCategory
    const addData = async ({ categoryName }: { categoryName: string }) => {
        try {
            const data = await fetch("http://localhost:2000/food", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    foodName: "s",
                    price: 100,
                    image: "s",
                    ingredients: "guril mah",
                    category: "676e370164d1f8cafda026ac",
                }),
            });
            const jsonData = await data.json();
            console.log("data", jsonData);
            getData()
        } catch (error) {
            console.log("error :>> ", error);
        }
        getData();
    };
    const deleteData = async (id: string) => {
        try {
            const deleteCategory = await fetch(
                "http://localhost:2000/food:id",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!deleteCategory.ok) {
                throw new Error(`getdata status:${deleteCategory.status}`);
            }
            console.log("deleteCategory ajillaj baina uu?????/ :>> ", deleteCategory);
        } catch (error) {
            console.log("error :>> ", error);
        }
        getData();
    };
    useEffect(() => {
        getData()
    }, [])
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="w-[472px] h-auto p-6 rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Dishes info</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    {/* Dish name */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="dish-name">Dish name</Label>
                        <Input id="dish-name" className="w-full" />
                    </div>

                    {/* Dish category */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="dish-category">Dish category</Label>
                        <div className="relative">
                            <select
                                id="dish-category"
                                className="w-full h-10 rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm focus:outline-none"
                                defaultValue="Appetizer"
                            >
                                <option value="Appetizer">Appetizer</option>
                                <option value="Main">Main</option>
                                <option value="Dessert">Dessert</option>
                            </select>
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="ingredients">Ingredients</Label>
                        <textarea
                            id="ingredients"
                            className="w-full min-h-[80px] rounded-md border border-input px-3 py-2 text-sm shadow-sm resize-none"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" className="w-full" />
                    </div>

                    {/* Image */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="image">Image</Label>
                        <div className="relative w-full h-[120px] overflow-hidden rounded-md">
                            <Image
                                src="/plus.svg"
                                alt=""
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full mt-4">
                        <Button variant="destructive">🗑️</Button>
                        <Button type="submit">Save changes</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}



