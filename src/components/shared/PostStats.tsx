import { useAuthContext } from '@/context/AuthContext';
import { useDaleteSavedPostMutation, useLikePostMutation, useSavePostMutation } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite'
import React from 'react'

const PostStats = ({ post, userId }: {
    post: Models.Document;
    userId: string;
}) => {

    const likesList = post?.likes.map((user: Models.Document) => user?.$id)

    const [likes, setLikes] = React.useState<string[]>(likesList)
    const [isSaved, setIsSaved] = React.useState(false)

    const { mutate: likePost } = useLikePostMutation()
    const { mutate: savePost } = useSavePostMutation()
    const { mutate: deleteSavedPost } = useDaleteSavedPostMutation()


    const { user } = useAuthContext()


    React.useEffect(() => {
        
    }, [])



    return (
        <div className='flex justify-between items-center px-1 z-20'>
            <div className='flex gap-2 mr-5'>
                <img
                    src={'assets/icon/like.svg'}
                    alt="lile image"
                    onClick={() => { }}
                    className='cursor-pointer'
                />
                <p className='small-medium lg:base-medium'>0</p>
            </div>
            <div className='flex gap-2'>
                <img
                    src={'assets/icon/save.svg'}
                    alt="lile image"
                    onClick={() => { }}
                    className='cursor-pointer'
                />
            </div>
        </div>
    )
}

export default PostStats
