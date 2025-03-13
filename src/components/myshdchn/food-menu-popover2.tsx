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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonSecondary } from "./food-menu-buttuntwo";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { promises } from "dns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";

export function PopoverDemoTwo() {
  const [getDatas, setGetDatas] = useState<any[]>([]);
  const [postDatas, setPostDatas] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
    },
  });
  //
  const getData = async () => {
    try {
      const data = await fetch("http://localhost:9999/food");
      const jsonData = await data.json();
      console.log("aaaa", jsonData);
      setGetDatas(jsonData.getfood);
    } catch (error) {
      console.log("error");
    }
  };
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
      await getData();
    } catch (error) {
      console.error("Устгах үед алдаа гарлаа:", error);
    }
  };
  ///
  const updateData = async (id: string) => {
    try {
      const updatedata = await fetch(`http://localhost:9999/food/${id}`, {
        method: "UPDATE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!updatedata.ok) {
        throw new Error(`update:>Status${updatedata.status}`);
      }
      const fetchUpDateData = updatedata.json();
      console.log("amjilttai oorjilloo", fetchUpDateData);
    } catch (error) {
      console.log("oorchlohod aldaa garlaa", error);
    }
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await PostData(values.categoryName);
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
              <ContextMenuItem inset>update</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
      <DialogTrigger asChild>
        <Button
          className="flex w-[36px] h-[36px] py-2 px-4 items-center gap-2 rounded-full bg-[#EF4444]"
          variant="outline"
        >
          +
        </Button>
      </DialogTrigger>
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
