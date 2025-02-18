import { Input } from "@/components/ui/input";

export function InputDemo() {
  return (
    <div className="flex relative">
      <img
        src="/location.svg"
        alt=""
        className="absolute left-[10px] top-[7px]"
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
