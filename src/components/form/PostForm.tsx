import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import EmojiPopover from '../shared/EmojiPopover'
import { ACCEPTED_IMAGES_TYPES, PostValidation } from '@/lib/validation'
import FileUpload from "@/components/shared/FileUpload.tsx";
import { useCreatePostMutation, useUpdatePostMutation } from "@/lib/react-query/queriesAndMutations.tsx";
import { useAuthContext } from "@/context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { Models } from 'appwrite'
import { X } from 'lucide-react'
import {useToast} from "@/components/ui/use-toast.ts";


const PostForm = ({ post, action }: {
    post: Models.Document;
    action: "update" | "create";
}) => {

    const navigate = useNavigate()

    const toast = useToast()

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post.captions : '',
            uploadImages: [],
        }
    })



    const { mutateAsync: createPost, isLoading: isCreatedPost } = useCreatePostMutation()
    const { mutateAsync: updatePost, isLoading: isUpdatePost } = useUpdatePostMutation()



    const watchFile = useWatch({ name: 'uploadImages', control: form.control })
    const watchCaption = useWatch({ name: 'caption', control: form.control })


    const [mediaUrl, setMediaUrl] = React.useState<string[]>([])


    const { user } = useAuthContext()

    async function onSubmit(data: z.infer<typeof PostValidation>) {

        if (action === "update" && post) {
            const updatedPost = await updatePost({
                postId: post.$id,
                imageId: post?.imageId,
                imageUrl: post?.imageUrl,
                ...data
            })

            if (!updatedPost) {
                return  toast({
                    title: "Please try again",
                    description: 'Any Error',
                })
            }
        } else {
            const newPost = await createPost({ ...data, userId: user.id })

            if (!newPost) {
                return toast({
                    title: "Please try again",
                    description: 'Any Error',
                })
            }

            // navigate('/')
        }



    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadFile = e.target.files
        if (uploadFile) {
            const validateMedia = checkValidMedia(uploadFile)
            if (validateMedia) {
                const url = URL.createObjectURL(uploadFile[0])
                setMediaUrl((prevMedia) => [...prevMedia, url])
            }
        }
    }

    const checkValidMedia = (media: FileList) => {
        const checkType = Array.from(media).every(file => ACCEPTED_IMAGES_TYPES.includes(file.type))
        if (!checkType) {
            return toast({
                variant: 'destructive',
                title: 'Error',
                description: '.jpg, .jpeg, .png, files are not accepted.'
            })
        }
        form.setValue('uploadImages', [...watchFile, ...media])
        return true
    }

    // 

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-7'>


                    <div className='relative border rounded-lg bg-gray-950'>
                        <FormField
                            control={form.control}
                            name="caption"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            value={field.value}
                                            spellCheck={true}
                                            placeholder="Tell us a little bit about yourself"
                                            className="resize-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none bg-transparent border-none w-11/12"
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


                    {
                        action === 'update' && post ? (
                            <div className='relative'>
                                <img className='rounded-lg' src={post.imageUrl} alt="" />
                                <Button type='button' className='p-0 m-0 absolute right-0 bg-slate-700 top-0 h-min rounded-none rounded-se-lg'>
                                    <X size={18} color='white' />
                                </Button>
                            </div>
                        ) : null
                    }



                    <div className='flex justify-between items-center'>

                        <div className='flex items-center gap-5'>
                            <FormField
                                control={form.control}
                                name="uploadImages"
                                render={() => (
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
                            <Button disabled={isCreatedPost} variant='outline' type="submit">
                                {action === "update" ? "Update Post" : "Post"}
                            </Button>
                        </div>

                    </div>

                </form>

            </Form >
        </>
    )
}

export default PostForm;
