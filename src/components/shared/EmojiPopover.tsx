import {Button} from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Smile} from "lucide-react"

const EmojiPopover = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="p-0">
                    <Smile size={21} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-70 bg-black">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                            Set the dimensions for the layer.
                        </p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default EmojiPopover;