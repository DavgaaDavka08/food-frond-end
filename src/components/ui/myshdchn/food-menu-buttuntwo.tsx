import { Button } from "@/components/ui/button";

export function ButtonSecondary({ onClose }: { onClose: () => void }) {
  return (
    <Button
      className="flex w-[36px] h-[36px] justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300"
      variant="secondary"
      onClick={onClose}
    >
      ×
    </Button>
  );
}
