import { Button } from "@/components/ui/button";

interface ButtonEmailProps {
  handleclick: () => void; // Функцийн төрлийг тодорхойлох
  text: string; // Текст нь string төрлийн байна
}

export function ButtonEmail({ handleclick, text }: ButtonEmailProps) {
  return (
    <Button
      className="flex w-[392px] h-[40px] px-8 py-0 justify-center items-center gap-8 rounded-md opacity-20 bg-[#18181B] text-white text-sm font-medium leading-5"
      variant="outline"
      onClick={handleclick}
    >
      {text}
    </Button>
  );
}
