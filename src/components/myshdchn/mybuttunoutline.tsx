import { Button } from "@/components/ui/button";

export function ButtonOutline() {
  return (
    <Button
      className="rounded-[6px] border border-grey bg-white w-[36px] h-[36px] flex px-[6px] py-[6px] justify-center items-center gap-8 "
      variant="outline"
    >
      <img src="/arrow.svg" alt="" />
    </Button>
  );
}
