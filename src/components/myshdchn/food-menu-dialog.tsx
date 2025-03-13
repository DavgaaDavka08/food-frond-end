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

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const uploadImage = async (file: File | null) => {
  if (!file) return null;

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
  } catch (error) {
    return { error: "Зураг байршуулж чадсангүй" };
  }
};

const formSchema = z.object({
  categoryName: z
    .string()
    .min(1, { message: "Хоолны нэрийг заавал оруулна уу" }),
  price: z.string().min(1, { message: "Үнийг заавал оруулна уу" }),
  ingredients: z
    .string()
    .min(5, { message: "Орц найрлагыг 5-аас дээш тэмдэгтээр бичнэ үү" }),
  image: z.string().nonempty("Зураг оруулна уу"),
});

export function DialogDemos() {
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
    const imageUrl = await uploadImage(foodImageFile);
    if (!imageUrl) return;

    form.setValue("image", imageUrl);

    const response = await fetch("http://localhost:8000/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foodName: values.categoryName,
        price: values.price,
        image: imageUrl,
        ingredients: values.ingredients,
        category: "676e370164d1f8cafda026ac",
      }),
    });

    const jsonData = await response.json();
    console.log("data", jsonData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[496px] h-[594px] flex p-6 flex-col items-start gap-6 rounded-[12px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-4 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            </form>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
              </form>
            </Form>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
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
                </form>
              </Form>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Зураг</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={handleChange} />
                      </FormControl>
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="Зураг"
                          className="w-32 h-32 mt-2"
                        />
                      )}
                      <FormMessage />
                      <Button type="submit">Илгээх</Button>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
