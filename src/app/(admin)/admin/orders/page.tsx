import Image from "next/image";

export default function Catagory() {
  return (
    <div className="w-[100%] h-screen] justify-center items-center flex flex-col bg-[#F4F4F5]">
      <div className="w-[92%] h-[718px]   flex flex-col gap-[24px]  m-auto items-end ">
        <Image alt="" src="/Avatar.svg" width={35} height={35} />

        <div className="w-[100%] flex p-4 justify-between  items-center border border-[#E4E4E7] rounded-sm  bg-white">
          <div className="flex flex-col w-[485.2px] items-start">
            <h4 className="text-[#09090B] font-inter text-[20px] font-bold leading-7 tracking-[-0.5px] ">
              order
            </h4>
            <h3>32items</h3>
          </div>
          <div>mkdlfs</div>
        </div>
      </div>
    </div>
  );
}
