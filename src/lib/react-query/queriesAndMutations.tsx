import { useMutation, useQueryClient, useQuery, useInfiniteQuery } from "@tanstack/react-query"

import {
    createPost,
    createUserAccount,
    deletePost,
    deleteSavedPost,
    getCurrentUser, getInfintyPosts, getPostById,
    getRecentPosts,
    getUserById,
    getUsers,
    likePost,
    savePost,
    searchPosts,
    signInAccount,
    signOutAccount,
    updatePost
} from "../appwrite/api"
import { INewPostType, INewUserType, IUpdatePost } from "@/types"
import { QUERY_KEYS } from "./queryKeys"


// create user
export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUserType) => createUserAccount(user)
    })
}

// sign in
export const useSignInAccountMutation = () => {
    return useMutation({
        mutationFn: (user: { email: string, password: string }) => signInAccount(user)
    })
}

// sign out
export const useSignOutAccountMutation = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

// create post
export const useCreatePostMutation = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (post: INewPostType) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

// update post
export const useUpdatePostMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

// get posts
export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    })
}

// like post
export const useLikePostMutation = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ postId, likesArray }: { postId: string, likesArray: string[] }) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_INFINITE_POSTS]
            })
        }
    })
}

// save post
export const useSavePostMutation = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['savepost'],
        mutationFn: ({ postId, userId }: { postId: string, userId: string }) => savePost(postId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

// delete saved post
export const useDeleteSavedPostMutation = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ savedId }: { savedId: string }) => deleteSavedPost(savedId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

// get current user
export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser,
    })
}

// delete post
export const useDeletePostMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ postId, imageId }: {
            postId: string | undefined,
            imageId: string | undefined
        }) => deletePost(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetPostByIdMutation = (postId?: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId
    })
}

export const useGetInfinityPosts = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn: getInfintyPosts as any,
        initialPageParam: 0,
        getNextPageParam: (lastPage: any) => {

            if (lastPage && lastPage.documents.length === 0) {
                return null;
            }
            const lastId = lastPage.documents[lastPage.documents.length - 1].$id
            return lastId;

        }
    })
}

export const useSearchPost = (searchTerm: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
        queryFn: () => searchPosts(searchTerm),
        enabled: !!searchTerm
    })
}

export const useGetPostById = (postId?: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId,
    });
};

export const useGetUserById = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
    });
};

export const useGetUsers = (limit?: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: () => getUsers(limit),
    });
};

