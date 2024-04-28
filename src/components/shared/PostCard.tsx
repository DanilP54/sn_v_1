import { multiFormatDateString } from '@/lib/utils'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import UpdatePostModal from './UpdatePostModal'
import { useAuthContext } from '@/context/AuthContext'
import PostStats from './PostStats'


interface PostTypeProps {
    post: Models.Document
}


const PostCard = ({ post }: PostTypeProps) => {

    const { user } = useAuthContext()

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

                        <span className='base-medium lg:body-bold text-light-1'>
                            {post.creator?.name} {post.creator?.username}
                        </span>

                        <div className='flex-start text-light-3'>
                            <p className='subtle-semibold lg:small-regular'>
                                {multiFormatDateString(post.$createdAt)}
                            </p>
                        </div>
                    </div>

                </div>

                <div className={`${user.id !== post.creator.$id && 'hidden'}`}>
                    <UpdatePostModal post={post} />
                </div>
            </div>


            <Link to={`/post-details/${post.$id}`}>
                <div className='small-medium lg:base-madium py-5'>
                    <p>{post?.captions}</p>
                </div>
            </Link>


            {
                post.imageUrl && (
                    <Link to={'#'}>
                        <img src={post?.imageUrl} className='rounded-lg mt-5' alt="post image" />
                    </Link>
                )
            }

            <div className='py-4'>
                <PostStats post={post} userId={user.id} />
            </div>

        </div>
    )
}

export default PostCard
