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


const CreatePostModal = () => {

    const { user } = useAuthContext()


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex gap-4 items-center justify-start w-full group hover:bg-primary-500"
                >
                    <img src="/assets/icon/gallery-add.svg" className='group-hover:invert-white' alt="create post" />
                    <p className="small-medium lg:base-medium">Create Post</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-black">
                <DialogHeader>
                    <DialogTitle>New Post</DialogTitle>
                </DialogHeader>
                <div className="flex gap-4 py-4">
                    <div>
                        <Link to={`/profile/${user.id}`}>
                            <Avatar>
                                <AvatarImage src={user.imageUrl} />
                            </Avatar>
                        </Link>
                    </div>
                    <div className='w-full'>
                        <PostForm />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePostModal;
