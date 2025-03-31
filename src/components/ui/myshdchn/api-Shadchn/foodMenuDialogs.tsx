"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { FoodType } from "@/lib/Type-Props";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../form";
const formSchema = z.object({
  categoryName: z.string().min(1, { message: "Enter food name" }),
  price: z.string().min(1, { message: "Enter price" }),
  ingredients: z.string().min(5, { message: "Enter at least 5 characters" }),

});
export function DialogDemos({ category }: { category: string }) {
  const [addCategory, setAddCategory] = useState<FoodType[]>([]);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      price: "",
      ingredients: "",
    },
  });
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  };
  return (
    <div className="flex h-[850px] max-w-[1200px] flex-wrap p-5 items-start gap-4">
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger onClick={() => setOpen(true)} asChild>
          <div className="w-[270px] h-[242px] flex flex-col justify-center items-center gap-6 sm:p-4 flex-1 self-stretch rounded-[20px] border border-dashed border-red-500">
            <Button className="flex w-[40px] h-[40px] px-4 items-center gap-2 rounded-full bg-[#EF4444]" variant="outline">
              <Image src="/plus.svg" alt="Add" width={46} height={46} />
            </Button>
            <h4>Add new Dish</h4>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[496px] h-[594px] flex p-6 flex-col items-start gap-6 rounded-[12px]">
          <DialogHeader>
            <DialogTitle>Add Food</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="categoryName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Name</FormLabel>
                  <FormControl><Input placeholder="Enter food name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl><Input placeholder="Enter price" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="ingredients" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl><Input placeholder="List ingredients..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {addCategory?.filter(food => food?.category?._id === category).map((data, index) => (
        <div key={index} className="w-[270px] h-[242px] flex flex-col justify-center items-center border rounded-lg p-4">
          <Image src={data.image || "/fallback-image.png"} alt="Food image" width={139} height={109} />
          <p>{data.foodName}</p>
          <p>${data.price}</p>
          <p>{data.ingredients}</p>
        </div>
      ))}
    </div>
  );
}
