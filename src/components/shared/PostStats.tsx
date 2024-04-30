import { useDeleteSavedPostMutation, useGetCurrentUser, useLikePostMutation, useSavePostMutation } from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked, checkSavedPost } from '@/lib/utils';
import { Models } from 'appwrite';
import React from 'react';

const PostStats = ({ post, userId }: {
    post: Models.Document;
    userId: string;
}) => {

    const { data: currentUser } = useGetCurrentUser()

    const [isSaved, setIsSaved] = React.useState(false)
    const [likes, setLikes] = React.useState<string[]>(() => {
        return post?.likes.map((user: Models.Document) => user?.$id)
    })

    const savedPost = checkSavedPost(currentUser?.save, post.$id)
    const likedPost = checkIsLiked(likes, userId)



    const { mutate: likePost } = useLikePostMutation()
    const { mutate: savePost } = useSavePostMutation()
    const { mutate: deleteSavedPost } = useDeleteSavedPostMutation()


    React.useEffect(() => {
        setIsSaved(!!savedPost)
    }, [currentUser])


    const handleLikePost = (e: React.MouseEvent) => {
        e.preventDefault()

        let newLikes = [...likes]

        newLikes.includes(userId)
            ? newLikes = newLikes.filter((id) => id !== userId)
            : newLikes.push(userId)

        console.log('newLikes: ', newLikes)
        setLikes(newLikes)
        likePost({ postId: post?.$id || '', likesArray: newLikes })
    }

    const handleSavePost = (e: React.MouseEvent) => {
        e.preventDefault()

        savedPost
            ? deleteSavedPost({ savedId: savedPost.$id })
            : savePost({ postId: post?.$id || '', userId })

        setIsSaved((prevIsSaved) => !prevIsSaved)
    }



    return (
        <div className='flex justify-between items-center px-1 z-20'>
            <div className='flex gap-2 mr-5'>
                <img
                    src={likedPost ? '/assets/icon/liked.svg' : '/assets/icon/like.svg'}
                    alt="like post image"
                    onClick={handleLikePost}
                    className='cursor-pointer'
                />
            </div>
            <div className='flex gap-2'>
                <img
                    src={isSaved ? "/assets/icon/saved.svg" : "/assets/icon/save.svg"}
                    alt="save post image"
                    onClick={handleSavePost}
                    className="cursor-pointer"
                />
            </div>
        </div>
    )
}

export default PostStats
