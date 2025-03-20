import { Input } from "@/components/ui/input";
import Image from "next/image";

export function InputDemo() {
  return (
    <div className="flex relative">
      <Image
        src="/location.svg"
        alt=""
        className="absolute left-[10px] top-[7px]"
        width={10}
        height={10}
      />
      <Input
        className="b bg-[#fff] w-[251px] h-[36px] flex items-center gap-[var(--spacing-1,4px)] px-[45px] py-[15px]"
        type="email"
        placeholder="Delivery address:"
      />
      ;
    </div>
  );
}
