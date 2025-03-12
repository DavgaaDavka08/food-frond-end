"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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

  ///
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await PostData(values.categoryName);
    alert("ok");
    setOpen(false); // Close popover after submitting
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex gap-4 flex-wrap">
        {getDatas?.map((data, index) => (
          <ContextMenu key={index}>
            <ContextMenuTrigger className="border-[1px] border-black px-5 rounded-full cursor-pointer py-2">
              {data.FoodName}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem inset>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[426px] h-[254px] flex flex-col justify-between gap-7">
        <div className="flex justify-between">
          <h4 className="font-medium leading-none">Add new category</h4>
          <ButtonSecondary onClose={() => setOpen(false)} />
        </div>
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
      </PopoverContent>
    </Popover>
  );
}
