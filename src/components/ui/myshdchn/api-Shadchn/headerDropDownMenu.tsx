"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../dialog"
import { Input } from "../../input"
////
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
const formSchema = z.object({
    password: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})
export function DropdownMenuDemo() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    })
    const router = useRouter();
    const getData = async (password: string) => {
        try {
            const getdata = await fetch("http://localhost:2000/goadmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            })
            if (!getdata.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }
            const jsonData = await getdata.json()
            toast.success("Амжилттай нэвтэрлээ!");
            setTimeout(() => {
                router.push("/admin")
            }, 1000);
            console.log('object :>> ', jsonData);
        } catch (error) {
            toast.error("Нэвтрэхэд алдаа гарлаа!");
            console.error("Error signing in:", error);
        }
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await getData(values.password)
        console.log(values)
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className=" py-2 px-4 justify-center items-center gap-2 rounded-full bg-[#EF4444] " variant="outline">
                    <Image src="user.svg" alt="" width={26} height={26} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 gap-4 justify-center items-center flex flex-col ">
                <DropdownMenuLabel>go Admin</DropdownMenuLabel>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-[80px] h-[36px] py-2 px-3 justify-center items-center  rounded-full "> push Admin</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="shadcn" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
