"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
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
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
});

export default function FristpageLogin({ next }: { next: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const Nevtreh = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:2000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();

      toast.success("Амжилттай нэвтэрлээ!");
      console.log("Login successful:", data);
      router.push("/");
    } catch (error) {
      toast.error("Нэвтрэхэд алдаа гарлаа!");
      console.error("Error signing in:", error);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await Nevtreh(values.email, values.password);
    console.log(values);
  }

  return (
    <div className="flex w-[416px] h-[288px] flex-col justify-center items-start gap-[24px]">
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
                    Нэвтрэх
                  </FormLabel>
                  <h6 className="text-gray-500 text-base font-normal leading-6">
                    Log in to enjoy your favorite dishes
                  </h6>
                </div>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-[392px] h-[40px] px-[8px] py-[12px] flex items-center rounded-md border border-gray-300 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="w-[392px] h-[40px] px-[8px] py-[12px] flex items-center rounded-md border border-gray-300 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <Link href="/reset-your-password">
                  <h6 className="text-[#09090B] text-base font-normal leading-6 cursor-pointer">
                    Forgot Password?
                  </h6>
                </Link>
              </FormItem>
            )}
          />
          <Button
            className="flex w-[392px] h-[40px] px-8 py-0 justify-center items-center gap-8 rounded-md bg-[#18181B] text-white text-sm font-medium leading-5"
            variant="outline"
            type="submit"
          >
            Log In
          </Button>
          <div className="flex w-[316px] items-center gap-3 justify-center">
            <h3 className="text-gray-500 text-base font-normal leading-6">
              брхшр
            </h3>
            <p
              className="text-16px font-normal leading-6 text-[#2563EB] cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
