"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ButtonOutline } from "@/components/myshdchn/mybuttunoutline";

const formSchema = z.object({
  password: z.string().min(6, "hamgiin bagadaa 6").max(8, "8 aas bvv hetvvl"),
  PasswordCompirm: z
    .string()
    .min(6, "hamgiin bagadaa 6")
    .max(8, "8 aas bvv hetvvl"),
});
export default function SecondPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      PasswordCompirm: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("amjilttaui");
  }

  return (
    <div className="flex w-[416px] h-[288px] flex-col justify-center items-start gap-[24px]">
      <ButtonOutline />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-wrap gap-1">
                  <FormLabel className="font-inter text-[24px] font-semibold leading-[32px] text-[#09090B]">
                    Create your account
                  </FormLabel>
                  <h6 className="text-gray-500 text-base font-normal leading-6">
                    Sign up to explore your favorite dishes.
                  </h6>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password address"
                    className="w-[392px] h-[40px] px-[8px] py-[12px] flex  items-center rounded-md border border-gray-300 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="PasswordCompirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Comfirm"
                    className="w-[392px] h-[40px] px-[8px] py-[12px] flex  items-center rounded-md border border-gray-300 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="flex w-[392px] h-[40px] px-8 py-0 justify-center items-center gap-8 rounded-md opacity-20 bg-[#18181B] text-white text-sm font-medium leading-5"
            variant="outline"
            type="submit"
          >
            Sign Up
          </Button>
          <div className="flex w-[316px]  items-center  gap-3 justify-center">
            <h3 className="text-gray-500 text-base font-normal leading-6">
              Already have an account?
            </h3>
            <p className="text-16px font-normal leading-6 text-[#2563EB]">
              Log in
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
