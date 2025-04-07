
import Image from "next/image";
import Header from "./_Components/Header";
import FoodCategories from "./_Components/Categories";
import { Food } from "./_Components/Food";
export default function Home() {
  return (
    <div className="bg-[#404040]">
      <Header />
      <Image src="/photo.png" alt="" width={1500} height={200} />
      <FoodCategories />
      <Food />
    </div >
  );
}
