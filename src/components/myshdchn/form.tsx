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
import { Button } from "../ui/button";

const Forms = () => {
  const [getDatas, setGetDatas] = useState<any[]>([]);
  const [postDatas, setPostDatas] = useState<any[]>([]);
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
      setPostDatas(getJson.postData);
    } catch (error) {
      console.log("error", error);
    }
    getData();
  };
  useEffect(() => {
    getData();
  }, []);

  ///
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    PostData(values.categoryName);
    alert("ok");
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>cfd</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                  <p>{postDatas}</p>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {getDatas?.map((data, index) => {
              return (
                <div key={index}>
                  <p>{data.FoodName}</p>
                </div>
              );
            })}
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
export default Forms;
