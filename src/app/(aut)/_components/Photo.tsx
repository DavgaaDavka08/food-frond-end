import Image from "next/image";

export default function Photo() {
  return (
    <div>
      <Image src="/main.png" alt="" width={856} height={904} />
    </div>
  );
}
