import { useDaleteSavedPostMutation, useGetCurrentUser, useLikePostMutation, useSavePostMutation } from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked, checkSavedPost } from '@/lib/utils';
import { Models } from 'appwrite';
import React from 'react';

const PostStats = ({ post, userId }: {
    post: Models.Document;
    userId: string;
}) => {

    const { data: currentUser } = useGetCurrentUser()
    const savedPost = checkSavedPost(currentUser?.save, post.$id)

    const [likes, setLikes] = React.useState<string[] | undefined>(() => {
        if (!post) return undefined
        return post?.likes.map((user: Models.Document) => user?.$id)
    })
    const [isSaved, setIsSaved] = React.useState(false)

    const { mutate: likePost } = useLikePostMutation()
    const { mutate: savePost } = useSavePostMutation()
    const { mutate: deleteSavedPost } = useDaleteSavedPostMutation()



    React.useEffect(() => {
        setIsSaved(!!savedPost)
    }, [currentUser])



    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation()

        let newLikes = [...likes]
        const hasLiked = newLikes.includes(userId)

        if (hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId)
        } else {
            newLikes.push(userId)
        }

        setLikes(newLikes)
        likePost({ postId: post.$id, likesArray: newLikes })
    }

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation()

        if (savedPost) {
            setIsSaved(false)
            deleteSavedPost({ savedId: savedPost.$id })
        } else {
            setIsSaved(true)
            savePost({ postId: post.$id, userId })
        }
    }



    return (
        <div className='flex justify-between items-center px-1 z-20'>
            <div className='flex gap-2 mr-5'>
                <img
                    src={
                        `${checkIsLiked(likes, userId)
                            ? 'assets/icon/liked.svg'
                            : 'assets/icon/like.svg'}`
                    }
                    alt="like image"
                    onClick={handleLikePost}
                    className='cursor-pointer'
                />
            </div>
            <div className='flex gap-2'>
                <img
                    src={isSaved ? 'assets/icon/saved.svg' : 'assets/icon/save.svg'}
                    alt="like image"
                    onClick={handleSavePost}
                    className='cursor-pointer'
                />
            </div>
        </div>
    )
}

export default PostStats
