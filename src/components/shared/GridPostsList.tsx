import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'
import { useAuthContext } from '@/context/AuthContext'

const GridPostsList = ({ posts, showStats = true, showUser = true }: {
    posts: Models.Document[],
    showUser?: boolean,
    showStats?: boolean,
}) => {

    const { user } = useAuthContext()

    return (
        <ul className="grid-container">
            {posts.map((posts) => (
                <li key={posts.$id} className="relative min-w-80 h-80">
                    <Link to={`/post-details/${posts.$id}`} className="grid-post_link">
                        <img
                            src={posts.imageUrl}
                            alt="post"
                            className="h-full w-full object-cover"
                        />
                    </Link>

                    <div className="grid-post_user">
                        {showUser && (
                            <div className="flex items-center justify-start gap-2 flex-1">
                                <img
                                    src={
                                        posts?.creator.imageUrl ||
                                        "/assets/icons/profile-placeholder.svg"
                                    }
                                    alt="creator"
                                    className="w-8 h-8 rounded-full"
                                />
                                <p className="line-clamp-1">{posts?.creator.name}</p>
                            </div>
                        )}
                        {showStats && <PostStats post={posts} userId={user.id} />}
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default GridPostsList
