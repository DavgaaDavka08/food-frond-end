import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon, Settings, Truck } from "lucide-react";

export function ButtonAdmin() {
  return (
    <Button
      className="flex h-[40px] w-[165px] px-0 py-6 items-center rounded-full gap-[10px] border-hidden  focus:text-white focus:bg-[#18181B]"
      variant="outline"
    >
      <LayoutDashboardIcon />
      Food menu
    </Button>
  );
}
export function ButtonAdminTwo() {
  return (
    <Button
      className="flex h-[40px] w-[165px] px-0 py-6 items-center rounded-full gap-[10px] border-hidden   focus:text-white focus:bg-[#18181B]"
      variant="outline"
    >
      <Truck className="size-11" />
      Outline
    </Button>
  );
}
export function ButtonAdminTree() {
  return (
    <Button
      className="flex h-[40px] w-[165px] px-0 py-6 items-center rounded-full gap-[10px] border-hidden  focus:text-white focus:bg-[#18181B]"
      variant="outline"
    >
      <Settings className="w-[50px] h-[50px] " />
      Outline
    </Button>
  );
}
