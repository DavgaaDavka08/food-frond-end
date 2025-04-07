"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
//
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
//
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { FoodType } from "@/lib/Type-Props";
import { Label } from "@/components/ui/label";
const formSchema = z.object({
  categoryName: z.string().min(2).max(50),
});
export function FoodMenuDialogDemo() {
  const categories = [{
    hool: "mongulian food",
    salad: "Salads",
    tsai: "Drinks"
  }
  ]
  const [getCategory, setGetCategory] = useState<FoodType[]>([]);
  const [addCategory, setAddCategory] = useState<FoodType[]>([]);
  console.log("addCategory :>> ", addCategory);
  const [updateDatas, setUpdateDatas] = useState("");
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });
  //api
  const getData = async () => {
    try {
      const getCategory = await fetch(
        "http://localhost:2000/api/food-category/:foodCategoryId"
      );
      const jsonCategory = await getCategory.json();
      console.log("jsonCategory :>> ", jsonCategory);
      setGetCategory(jsonCategory.getcategory);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  //addCategory
  const addData = async ({ categoryName }: { categoryName: string }) => {
    try {
      const addCategory = await fetch(
        "http://localhost:2000/api/food-category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryName: categoryName }),
        }
      );
      if (!addCategory.ok) {
        throw new Error(`getdata status:${addCategory.status}`);
      }
      const jsonCategory = await addCategory.json();
      console.log("jsonCategory :>> ", jsonCategory);
      setAddCategory([jsonCategory.newCategory]);

    } catch (error) {
      console.log("error :>> ", error);
    }
    getData();
  };
  const deleteData = async (id: string) => {
    try {
      const deleteCategory = await fetch(
        `http://localhost:2000/api/food-category/${id}`,
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

  const updateData = async (id: string, categoryName: string) => {
    try {
      const updatedata = await fetch(
        `http://localhost:2000/api/food-category/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryName }),
        }
      );
      console.log("id :>> ", id);
      if (!updatedata.ok) {
        throw new Error(`update:>Status${updatedata.status}`);
      }
      const fetchUpDateData = await updatedata.json();
      console.log("Амжилттай өөрчлөгдлөө", fetchUpDateData);
      await getData();
      setOpen(false);
    } catch (error) {
      console.log("oorchlohod aldaa garlaa", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const editData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdateDatas(value);
    setOpen(false);
    await getData();
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("category", values);
    await addData(values);
    setOpen(false);
    await getData()
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex py-2 px-4 items-center gap-8 ">
        {categories.map((item, index) => {
          return <div className="flex gap-3 items-center" key={index}>
            <Button>{item.hool}</Button>
            <Button>{item.salad}</Button>
            <Button>{item.tsai}</Button>
          </div>
        })}
        {getCategory?.map((data: FoodType, index) => {
          return (
            <ContextMenu key={index}>
              <ContextMenuTrigger className="border-[1px] border-black px-5 rounded-full cursor-pointer py-2">
                <p className="  text-[#18181B] text-sm font-medium leading-5">
                  {data.categoryName}
                </p>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                <ContextMenuItem inset onClick={() => deleteData(data._id)}>
                  Dlete
                </ContextMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">update</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          onChange={editData}
                          id="name"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() => updateData(data._id, updateDatas)}
                        type="submit"
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex w-[40px] h-[40px] py-2 px-4 items-center gap-2 rounded-full bg-[#EF4444]"
          >
            <Image src="/plus.svg" alt="" width={40} height={40} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
