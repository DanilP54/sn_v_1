import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { toast } from '../ui/use-toast'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Image } from 'lucide-react'
import EmojiPopover from '../shared/EmojiPopover'
import { Input } from '../ui/input'
import { ACCEPTED_IMAGES_TYPES, PostValidation } from '@/lib/validation'
import FileUpload from "@/components/shared/FileUpload.tsx";


const PostForm = () => {

    const [mediaUrl, setMediaUrl] = React.useState<string[]>([])

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            text: '',
            uploadImages: [],
        }
    })

    const watchFile = useWatch({ name: 'uploadImages', control: form.control })
    console.log(watchFile)

    function onSubmit(data: z.infer<typeof PostValidation>) {
        console.log(data)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadFile = e.target.files
        if (uploadFile) {
            const checkType = checkValidMedia(uploadFile)
            


        }
    }

    const checkValidMedia = (media: FileList) => {
        const checkType = Array.from(media).every(file => ACCEPTED_IMAGES_TYPES.includes(file.type))
        if(checkType) {
            toast({
                title: 
            })
        }
    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-7'>
                    <div className='relative'>
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            value={field.value}
                                            spellCheck={true}
                                            placeholder="Tell us a little bit about yourself"
                                            className="resize-none bg-gray-950 border"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='absolute top-0 right-2 z-10'>
                            <EmojiPopover />
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-5'>
                            <FormField
                                control={form.control}
                                name="uploadImages"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload handleOnChange={handleOnChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <Button variant='outline' type="submit">Post</Button>
                        </div>
                    </div>

                </form>
            </Form>
        </>
    )
}

export default PostForm;
