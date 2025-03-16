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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Image from "next/image";
import { FoodType } from "@/lib/Type-Props";

const UPLOAD_PRESET = "food-image";
const CLOUD_NAME = "748589482997997";

const uploadImage = async (file: File | null) => {
  console.log("Upload image working", file);
  if (!file) return null;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("api_key", CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log("image upload succes", result);
    return result.secure_url;
  } catch (error) {
    console.log(error);
    return { error: "zurag bairshuul" };
  }
};

const formSchema = z.object({
  categoryName: z.string().min(1, { message: "hoolni ner" }),
  price: z.string().min(1, { message: "vniig oruul" }),
  ingredients: z.string().min(5, { message: "orts 5 aas deesh" }),
  image: z.string().nonempty("zurag oruul"),
});

export function DialogDemos() {
  const [addCategory, setAddCategory] = useState([]);
  const [foodImageFile, setFoodImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

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
    const file = e.target.files?.[0];
    if (!file) return;

    setFoodImageFile(file);
    const tempImageUrl = URL.createObjectURL(file);
    setPreviewUrl(tempImageUrl);
    form.setValue("image", "uploaded");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("NEMDEG AJILJ EHELLEE");
    const imageUrl = await uploadImage(foodImageFile);
    if (!imageUrl) return;
    form.setValue("image", imageUrl);
    ///
    const getData = async () => {
      try {
        const data = await fetch("http://localhost:9999/food");
        const jsonData = await data.json();
        console.log("aaaa", jsonData);
        setAddCategory(jsonData.getfood);
      } catch (error) {
        console.log("error");
      }
    };
    ////

    const response = await fetch("http://localhost:9999/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        FoodName: values.categoryName,
        price: values.price,
        image: imageUrl,
        ingredients: values.ingredients,
        category: "676e370164d1f8cafda026ac",
      }),
    });
    const jsonData = await response.json();
    console.log("data", jsonData);
    getData();
  };
  return (
    <div className="flex h-[550px] max-w-[1200px]  flex-wrap p-5 items-start gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-[270px] h-[242px] flex flex-col justify-center items-center gap-6 p-2 sm:p-4 flex-1 self-stretch rounded-[20px] border border-dashed border-red-500">
            <Button
              className="flex w-[40px] h-[40px] py-2 px-4 items-center gap-2 rounded-full bg-[#EF4444]"
              variant="outline"
            >
              <Image src={"/plus.svg"} alt="" width={46} height={46} />
            </Button>
            <h4>Add new Dish to Salads </h4>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[496px] h-[594px] flex p-6 flex-col items-start gap-6 rounded-[12px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-4 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="categoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>categoryName</FormLabel>
                      <FormControl>
                        <Input placeholder="Type food name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter price...</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter price..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ingredients</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[400px] h-[86px] flex py-2 px-4 flex-col items-start p-2 flex-1 self-stretch  rounded-md border border-gray-300 bg-white shadow-sm"
                          placeholder="List ingredients..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>zurag</FormLabel>
                      <FormControl>
                        <Input {...rest} type="file" onChange={handleChange} />
                      </FormControl>
                      {previewUrl && (
                        <Image
                          src={previewUrl}
                          alt=""
                          className="w-32 h-32 mt-2"
                          width={32}
                          height={32}
                        />
                      )}
                      <FormMessage />
                      <Button type="submit">Илгээх</Button>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {addCategory.map((data: FoodType, index) => (
        <div
          key={index}
          className="w-[270px] flex-wrap  h-[242px] flex flex-col justify-center items-center sm:p-4 flex-1 self-stretch rounded-[20px] border"
        >
          <div>
            <Image
              className="flex justify-end items-end   flex-1 self-stretch rounded-[12px]"
              alt=""
              src={data?.image}
              width={239}
              height={129}
            />

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center gap-[10px]">
                <p className="text-red-500 text-sm font-medium leading-5 font-inter">
                  {data.FoodName}
                </p>
                <p className="text-[--text-text-foreground] text-xs font-normal leading-4 font-inter">
                  ${data.price}
                </p>
              </div>
              <div>
                <p className="text-[--text-text-foreground] text-[12px] font-normal leading-4 font-inter">
                  {data.ingredients}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
