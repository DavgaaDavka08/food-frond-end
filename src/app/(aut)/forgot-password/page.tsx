"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function FristpageLogin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();
  const next = () => {
    router.push("/");
  };
  const forgetData = async (email: string) => {
    try {
      const response = await fetch("http://localhost:2000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();

      toast.success("code ilgeele");
      console.log("Login successful:", data);
    } catch (error) {
      toast.error("code ilgeej chadsangui");
      console.error("Error signing in:", error);
    }
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await forgetData(values.email);
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
                    email
                  </FormLabel>
                  <h3 className="text-gray-500 text-base font-normal leading-6">
                    Set a new password with a combination of letters and numbers
                    for better security.
                  </h3>
                </div>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-[392px] h-[40px] px-[8px] py-[12px] flex items-center rounded-md border border-gray-300 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
        </form>
      </Form>
    </div>
  );
}
