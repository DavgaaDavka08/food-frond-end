"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const formSchema = z.object({
  categoryName: z.string().min(2).max(50),
});
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

import { Button } from "@/components/ui/button";
import {} from "@/components/ui/popover";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { Label } from "../ui/label";
import { FoodType } from "@/lib/Type-Props";

export function PopoverDemoTwo() {
  const [getDatas, setGetDatas] = useState<FoodType[]>([]);
  const [postDatas, setPostDatas] = useState<FoodType[]>([]);
  console.log("postDatas :>> ", postDatas);
  const [open, setOpen] = useState(false);
  const [updateDatas, setUpdateDatas] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });
  ////
  const getData = async () => {
    try {
      const data = await fetch("http://localhost:9999/food");
      const jsonData = await data.json();
      console.log("aaaa", jsonData);
      setGetDatas(jsonData.getfood);
    } catch (error) {
      console.log("error", error);
    }
  };
  ////
  const PostData = async (categoryName: string) => {
    try {
      const postData = await fetch("http://localhost:9999/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ FoodName: categoryName }),
      });

      if (!postData.ok) {
        throw new Error(`getdata status:${postData.status}`);
      }

      const getJson = await postData.json();
      console.log("Post response:", getJson);

      setPostDatas(getJson.postData || []);
    } catch (error) {
      console.log("error", error);
    }

    await getData();
  };
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);
  const deleteData = async (id: string) => {
    const isConfirmed = window.confirm("Would you like to undo this action?");
    if (!isConfirmed) return;
    try {
      const response = await fetch(`http://localhost:9999/food/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response :>> ", response);
      await getData();
    } catch (error) {
      console.error("Устгах үед алдаа гарлаа:", error);
    }
  };
  ///

  const updateData = async (id: string) => {
    try {
      const updatedata = await fetch(`http://localhost:9999/food/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ FoodName: updateDatas }),
      });
      if (!updatedata.ok) {
        throw new Error(`update:>Status${updatedata.status}`);
      }
      const fetchUpDateData = updatedata.json();
      console.log("amjilttai oorjilloo", fetchUpDateData);
      await getData();
    } catch (error) {
      console.log("oorchlohod aldaa garlaa", error);
    }
  };
  const editData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdateDatas(value);
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await PostData(values.categoryName);
    await getData();
    alert("ok");
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-4 flex-wrap">
        {getDatas?.map((data, index) => (
          <ContextMenu key={index}>
            <ContextMenuTrigger className="border-[1px] border-black px-5 rounded-full cursor-pointer py-2">
              {data.FoodName}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem onClick={() => deleteData(data._id)} inset>
                Delete
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
                      onClick={() => {
                        updateData(data._id);
                      }}
                      type="submit"
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </ContextMenuContent>
          </ContextMenu>
        ))}
        <DialogTrigger asChild>
          <Button
            className="flex w-[40px] h-[40px] py-2 px-4 items-center gap-2 rounded-full bg-[#EF4444]"
            variant="outline"
          >
            <Image src={"/plus.svg"} alt="" width={46} height={46} />
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="w-[426px] h-[254px] flex flex-col justify-between gap-7">
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
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[392px]"
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-end">
              <Button type="submit">Add Category</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
