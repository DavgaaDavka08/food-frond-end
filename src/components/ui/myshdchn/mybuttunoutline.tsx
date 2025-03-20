import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ButtonOutline() {
  return (
    <Button
      className="rounded-[6px] border border-grey bg-white w-[36px] h-[36px] flex px-[6px] py-[6px] justify-center items-center gap-8 "
      variant="outline"
    >
      <Image width={50} height={50} src="/arrow.svg" alt="" />
    </Button>
  );
}
