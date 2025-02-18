import { ButtonEmail } from "@/components/myshdchn/my-buttun-email";
import { InputDemoPage } from "@/components/myshdchn/my-page-input";
import { ButtonOutline } from "@/components/myshdchn/mybuttunoutline";

export default function FristPage() {
  return (
    <div>
      <div className="flex w-[416px] h-[288px] flex-col justify-center items-start gap-[24px]">
        <ButtonOutline />
        <div className="flex flex-wrap gap-1">
          <h6 className="font-inter text-[24px] font-semibold leading-[32px] text-[#09090B]">
            Create your account
          </h6>
          <h6 className="text-gray-500 text-base font-normal leading-6">
            Sign up to explore your favorite dishes.
          </h6>
        </div>
        <InputDemoPage />
        <ButtonEmail
          handleclick={() => alert("Button clicked!")}
          text="Sign Up"
        />
        <div className="flex gap-[12px]">
          <h3 className="text-gray-500 text-base font-normal leading-6">
            Already have an account?
          </h3>
          <p className="text-16px font-normal leading-6 text-[#2563EB]">
            Log in
          </p>
        </div>
      </div>
    </div>
  );
}
