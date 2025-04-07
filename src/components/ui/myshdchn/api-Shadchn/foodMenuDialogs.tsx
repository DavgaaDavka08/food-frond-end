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
import { useState } from "react";
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

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const uploadImage = async (file: File | null) => {
  if (!file) {
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    return result.secure_url;
  } catch (error: unknown) {
    return { error: "failed to upload image" };
  }
};

import { DialogDemoEdits } from "@/components/dialogedit";
const formSchema = z.object({
  categoryName: z.string().min(1, { message: "Enter food name" }),
  price: z.string().min(1, { message: "Enter price" }),
  ingredients: z.string().min(5, { message: "Enter at least 5 characters" }),
  image: z.string().nonempty("Zuragaa oruulna uu"),
});
export function DialogDemos({ category }: { category: string }) {
  const [foodImageFile, setFoodImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [addCategory, setAddCategory] = useState<FoodType[]>([]);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      price: "",
      ingredients: "",
      image: "",
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setFoodImageFile(file);

    const tempImageUrl = URL.createObjectURL(file);
    setPreviewUrl(tempImageUrl);
    form.setValue("image", "uploaded");
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    createFood(values);
  }
  const createFood = async (values: z.infer<typeof formSchema>) => {
    const imageUrl = await uploadImage(foodImageFile);

    const data = await fetch("http://localhost:8000/food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodName: values.categoryName,
        price: 100,
        image: imageUrl,
        ingredients: "guril mah",
        category: "676e370164d1f8cafda026ac",
      }),
    });
    const jsonData = await data.json();

    console.log("data", jsonData);
  };

  return (
    <div className="flex h-[850px] max-w-[1200px] flex-wrap p-5 items-start gap-4">
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger onClick={() => setOpen(true)} asChild>
          <div className="w-[280px] h-[292px] flex flex-col justify-center items-center gap-6 sm:p-4 flex-1 self-stretch rounded-[20px] border border-dashed border-red-500">
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
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="image"
                        type="file"
                        onChange={handleChange}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          {previewUrl && (
            <div className="border">
              <img className="size-48 object-cover" src={previewUrl} alt="" />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {addCategory?.filter(food => food?.category?._id === category).map((data, index) => (
        <div key={index} className="w-[280px] bg-white h-[292px] flex flex-col p-4 items-start gap-4 rounded-xl shadow-md border border-gray-200">
          <div className="relative w-full">
            <Image
              src={data.image || "/fallback-image.png"}
              alt="Food image"
              width={280}
              height={140}
              className="rounded-md object-cover"
            />
            <div>
              <DialogDemoEdits />
            </div>
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
  );
}
// 