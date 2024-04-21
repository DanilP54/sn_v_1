import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage } from '../ui/avatar'
import { useAuthContext } from '@/context/AuthContext'
import PostForm from '../form/PostForm'
import { Link } from 'react-router-dom'
import { Models } from 'appwrite'

interface UpdatePostProps {
    post: Models.Document
}


const UpdatePostModal = ({ post }: UpdatePostProps) => {

    const { user } = useAuthContext()






    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex gap-4 items-center justify-start w-full group p-0"
                >
                    <img src="/assets/icon/edit.svg" className='w-6' alt="update post" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-black">
                <DialogHeader>
                    <DialogTitle>Update Post</DialogTitle>
                </DialogHeader>
                <div className="flex gap-4 py-4">
                    <div>
                        <Link to={`/profile/${post.creator?.$id}`}>
                            <Avatar>
                                <AvatarImage src={user.imageUrl} />
                            </Avatar>
                        </Link>
                    </div>
                    <div className='w-full'>
                        <PostForm post={post} action="update" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdatePostModal;
