import { Input } from "@/components/ui/input";

export function InputDemoPage() {
  return (
    <Input
      type="email"
      placeholder="Enter your email address"
      className="w-[392px] h-[40px] px-[8px] py-[12px] flex  items-center rounded-md border border-gray-300 bg-white"
    />
  );
}
