import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="flex h-[36px] w-[165px] px-[16px] py-[8px] justify-center items-center gap-[8px] rounded-full opacity-20 bg-[var(--background-bg-primary,#18181B)]"
          variant="outline"
        >
          <p className="text-[var(--text-text-primary-foreground,#FAFAFA)] font-inter text-[14px] font-medium leading-[20px]">
            Change delivery state
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
