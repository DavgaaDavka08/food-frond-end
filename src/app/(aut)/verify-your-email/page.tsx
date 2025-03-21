"use client";
import { Button } from "@/components/ui/button";
import { ButtonOutline } from "@/components/ui/myshdchn/mybuttunoutline";

export default function FristpageLogin() {
  return (
    <div className="flex w-[416px] h-[288px] flex-col justify-center items-start gap-[14px]">
      <ButtonOutline />
      <p className="font-inter text-[24px] font-semibold leading-[32px] text-[#09090B]">
        email
      </p>
      <p className="text-gray-500 text-base font-normal leading-6">
        We just sent an email to Test@gmail.com. Click the link in the email to
        verify your account.
      </p>
      <Button
        className="flex w-[392px] h-[40px] px-8 py-0 justify-center items-center gap-8 rounded-md bg-[#18181B] text-white text-sm font-medium leading-5"
        variant="outline"
        type="submit"
      >
        Reset Email
      </Button>
    </div>
  );
}
