import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import Image from "next/image"

export function DropdownMenuDemo() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className=" py-2 px-4 justify-center items-center gap-2 rounded-full bg-[#EF4444] " variant="outline">
                    <Image src="user.svg" alt="" width={26} height={26} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 gap-4 justify-center items-center flex flex-col ">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <Button className="w-[80px] h-[36px] py-2 px-3 justify-center items-center  rounded-full ">
                    Log out
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
