import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputFile() {
  return (
    <div className="flex p-4 flex-col justify-center items-center gap-2 rounded-[6px] border border-dashed border-[rgba(37,99,235,0.20)] bg-[rgba(37,99,235,0.05)]">
      <Label htmlFor="picture">Picture</Label>
      <Input className="w-[412px] h-[160px]" id="picture" type="file" />
    </div>
  );
}
