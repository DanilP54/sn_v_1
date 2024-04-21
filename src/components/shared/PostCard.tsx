import { multiFormatDateString } from '@/lib/utils'
import { Models } from 'appwrite'
import React from 'react'
import { Link } from 'react-router-dom'
import UpdatePostModal from './UpdatePostModal'

interface PostTypeProps {
    post: Models.Document
}


const PostCard = ({ post }: PostTypeProps) => {
    console.log(post)
    return (
        <div className='post-card'>
            <div className=' flex-between'>
                <div className='flex items-center gap-3'>
                    <Link to={`/profile/${post.creator.$id}`}>
                        <img
                            src={post.creator?.imageUrl || 'assets/icon/profile-placeholder.svg'}
                            alt="avatar"
                            className='rounded-full w-12 lg:h-12'
                        />
                    </Link>

                    <div className='flex flex-col'>
                        <p className='base-medium lg:body-bold text-light-1'>
                            {post.creator?.name}
                        </p>
                        <div className='flex-center gap-2 text-light-3'>
                            <p className='subtle-semibold lg:small-regular'>
                                {multiFormatDateString(post.$createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <UpdatePostModal post={post} />
                </div>
            </div>

        </div>


    )
}

export default PostCard
