import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InputWithLabel } from "./food-menu-input";
import { TextareaWithLabel } from "./food-menu-text-ariea";
import { InputFile } from "./food-menu-input-file";

export function PopoverDemoFoodMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">all disehs</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex w-[460px] h-[592px] p-6 flex-col items-start gap-6 bg-white rouded-[12px]">
          <div className="">
            <h4 className="font-medium leading-none">
              Add new Dish to Appetizers
            </h4>
          </div>
          <div className="flex items-start gap-6">
            <InputWithLabel />
            <InputWithLabel />
          </div>
          <div>
            <TextareaWithLabel />
          </div>
          <div>
            <InputFile />
          </div>
          <div>
            <Button />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
