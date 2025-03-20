"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function FristpageLogin({ next }: { next: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex w-[416px] h-[288px] flex-col justify-center items-start gap-[34px]">
      <ButtonOutline />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-1">
                  <FormLabel className="font-inter text-[24px] font-semibold leading-[32px] text-[#09090B]">
                    email
                  </FormLabel>
                  <h3 className="text-gray-500 text-base font-normal leading-6">
                    Enter your email to receive a password reset link.
                  </h3>
                </div>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your password"
                    className="w-[392px] h-[40px] px-[8px] py-[12px] flex items-center rounded-md border border-gray-300 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <div className="flex w-[316px] items-center gap-3 justify-center">
                  <h3 className="text-gray-500 text-base font-normal leading-6">
                    Dont Have a account
                  </h3>
                  <p
                    className="text-16px font-normal leading-6 text-[#2563EB] cursor-pointer"
                    onClick={() => router.push("/signup")}
                  >
                    Sign Up
                  </p>
                </div>
              </FormItem>
            )}
          />

          <Button
            className="flex w-[392px] h-[40px] px-8 py-0 justify-center items-center gap-8 rounded-md bg-[#18181B] text-white text-sm font-medium leading-5"
            variant="outline"
            type="submit"
          >
            Send Link
          </Button>
        </form>
      </Form>
    </div>
  );
}
