
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
export function DialogDemo() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Delivery State</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[435px] h-[200px] flex flex-col items-center m-auto justify-between">
                <div className="flex gap-4 ">
                    <Button className="w-[94px] h-[32px] rounded-xl items-center justify-center gap-2 ">Deliverd</Button>
                    <Button className="w-[94px] h-[32px] rounded-xl items-center justify-center gap-2 ">Pending</Button>
                    <Button className="w-[94px] h-[32px] rounded-xl items-center justify-center gap-2 ">Cancel</Button>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
