import { useDeletePostMutation, useGetPostByIdMutation } from "@/lib/react-query/queriesAndMutations.tsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/shared/Loader.tsx";
import { multiFormatDateString } from "@/lib/utils.ts";
import { useAuthContext } from "@/context/AuthContext.tsx";
import { Button } from "@/components/ui/button.tsx";
import PostStats from '@/components/shared/PostStats';
import { useToast } from "@/components/ui/use-toast";
import UpdatePostModal from "@/components/shared/UpdatePostModal";

const PostDetails = () => {
    const { toast } = useToast()
    const { id } = useParams();
    const navigate = useNavigate()


    const { data: post, isLoading } = useGetPostByIdMutation(id || '')
    const { mutateAsync: deletePost } = useDeletePostMutation()
    const { user } = useAuthContext()


    const handleDeletePost = async () => {

        const deletedPost = await deletePost({
            postId: post?.$id,
            imageId: post?.imageId
        })

        if (!deletedPost) {
            return toast({
                variant: "destructive",
                title: "Error",
                description: "Friday, February 10, 2023 at 5:57 PM",
            })
        }

        navigate('/')


    }

    return (
        <div className='post_details-container '>
            {
                isLoading ? <Loader /> : (
                    <div className='post_details-card'>

                        <img
                            src={post?.imageUrl}
                            alt='creator'
                            className='post_details-img'
                        />
                        <div className='post_details-info'>
                            <div className='flex-between w-full'>
                                <Link to={`/profile/${post?.creator?.$id}`}
                                    className='flex items-center gap-3'
                                >
                                    <img
                                        src={post?.creator?.imageUrl || 'assets/icon/profile-placeholder.svg'}
                                        alt="avatar"
                                        className='rounded-full w-12 lg:h-12'
                                    />
                                    <div className='flex flex-col'>
                                        <span className='base-medium lg:body-bold text-light-1'>
                                            {post?.creator?.name} {post?.creator?.username}
                                        </span>
                                        <div className='flex-start text-light-3'>
                                            <p className='subtle-semibold lg:small-regular'>
                                                {multiFormatDateString(post?.$createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <div className='flex-center gap-4'>
                                    <div className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                                        {
                                            post && <UpdatePostModal post={post} />
                                        }

                                    </div>
                                    <Button
                                        onClick={handleDeletePost}
                                        variant="ghost"
                                        className={`ghost_details-delete_btn ${user.id !== post?.creator?.$id && 'hidden'}`}
                                    >
                                        <img
                                            src={'/assets/icon/delete.svg'}
                                            className="w-6 h-6 lg:w-7 lg:h-7"
                                            alt="delete icon"
                                        />
                                    </Button>
                                </div>
                            </div>
                            <hr className={'border w-full border-dark-4/80'} />
                            <div className='small-medium lg:base-madium py-5 flex-1'>
                                <p>{post?.captions}</p>
                            </div>
                            <div className='w-full'>
                                {
                                    post && <PostStats post={post} userId={user.id} />

                                }
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default PostDetails
