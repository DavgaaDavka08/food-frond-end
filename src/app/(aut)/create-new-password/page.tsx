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
import { ButtonOutline } from "@/components/ui/myshdchn/mybuttunoutline";
import { CheckboxDemo } from "@/components/ui/myshdchn/check-box";
const formSchema = z
  .object({
    password: z.string().min(4, "4 deoosh"),
    passwordConfirm: z.string().min(4, "Хамгийн багадаа 6 тэмдэгт байх ёстой"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "batalgaajuulalt buruu",
    path: ["passwordConfirm"],
  });
export default function SecondPage({ email }: { email: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex w-[416px] h-[288px] flex-col justify-center items-start gap-[24px]">
      <ButtonOutline />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-wrap gap-1">
            <FormLabel className="font-inter text-[24px] font-semibold leading-[32px] text-[#09090B]">
              Create a strong password
            </FormLabel>
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>nuuts ug</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="w-[392px] h-[40px] px-[8px] py-[12px] rounded-md border border-gray-300 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>nuuts ug batalgaajuulah</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-[392px] h-[40px] px-[8px] py-[12px] rounded-md border border-gray-300 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CheckboxDemo />
          <Button
            className="flex w-[392px] h-[40px] px-8 py-0 justify-center items-center gap-8 rounded-md bg-[#18181B] text-white text-sm font-medium leading-5"
            variant="outline"
            type="submit"
          >
            Sign Up
          </Button>

          <div className="flex w-[316px] items-center gap-3 justify-center">
            <h3 className="text-gray-500 text-base font-normal leading-6">
              Already have an account?
            </h3>
            <p className="text-16px font-normal leading-6 text-[#2563EB] cursor-pointer">
              Log in
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
