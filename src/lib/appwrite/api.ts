import { ID, Models, Query } from "appwrite";
import { INewPostType, INewUserType, IUpdatePost } from "@/types";
import { account, database, avatar, appWriteConfig, storage } from "./config";


export async function createUserAccount(user: INewUserType) {

    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )

        if (!newAccount) throw Error;

        const avatarUrl = await avatar.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        })

        return newUser

    } catch (error) {
        console.log(error)
        return error
    }

}

export async function saveUserToDB(user: {
    accountId: string;
    name: string;
    email: string;
    imageUrl: URL;
    username?: string;
}) {

    try {
        const newUserDocument = await database.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        return newUserDocument

    } catch (error) {
        console.log(error)
    }

}

export async function signInAccount(user: { email: string, password: string }) {

    try {
        const session = await account.createEmailSession(user.email, user.password)
        return session
    } catch (error) {
        console.log(error)
    }
}


export async function getCurrentUser() {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error

        const currentUser = await database.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            [
                Query.equal("accountId", currentAccount.$id),
            ],
        )

        if (!currentUser) throw Error

        return currentUser.documents[0]

    } catch (error) {
        console.log(error)
    }
}

export async function signOutAccount() {
    try {
        const deletedSession = await account.deleteSession("current")
        if (!deletedSession) throw Error;

        return deletedSession;
    } catch (error) {
        console.log()
    }
}


export async function createPost(post: INewPostType) {

    try {
        let newFile: Models.File | undefined;

        if (post.uploadImages) {
            newFile = await uploadFile(post.uploadImages)
        }


        if (!newFile) throw Error;

        const fileUrl = await getFileUrl(newFile.$id)

        if (!fileUrl) {
            await deleteFile(newFile.$id)
            throw Error
        }

        const newPost = await database.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                captions: post.caption,
                imageUrl: fileUrl || null,
                imageId: newFile.$id,
            }
        )

        if (!newPost) {
            await deleteFile(newFile.$id)
            throw Error
        }

        return newPost

    } catch (error) {
        console.log(error)
    }


}

export async function updatePost(post: IUpdatePost) {

    const hasFile = post?.uploadImages.length > 0;

    try {

        let image = {
            imageUrl: post.imageUrl,
            imageId: post.imageId,
        }

        if (hasFile) {
            const uplodedFile = await uploadFile(post.uploadImages)
            if (!uplodedFile) throw Error;

            const fileUrl = await getFileUrl(uplodedFile.$id)

            if (!fileUrl) {
                await deleteFile(uplodedFile.$id)
                throw Error
            }

            image = {
                ...image,
                imageUrl: fileUrl,
                imageId: uplodedFile.$id,
            }
        }

        const updatePost = await database.updateDocument(
            appWriteConfig.databaseId,
            appWriteConfig.postCollectionId,
            post.postId,
            {
                captions: post.caption,
                ...image
            }
        )

        if (!updatePost) {
            await deleteFile(post.imageId)
            throw Error
        }

        return updatePost

    } catch (error) {
        console.log(error)
    }
}


export async function uploadFile(file: File[]) {
    try {
        const uploadedFile = await storage.createFile(
            appWriteConfig.storageId,
            ID.unique(),
            file[0],
        )

        if (!uploadedFile) throw Error;

        return uploadedFile;

    } catch (error) {
        console.log(error)
    }
}


export async function getFileUrl(fileId: string) {
    try {
        const fileUrl = await storage.getFilePreview(
            appWriteConfig.storageId,
            fileId,
        )

        console.log(fileUrl)

        if (!fileUrl) throw Error;

        return fileUrl

    } catch (error) {
        console.log(error)
    }
}


export async function deleteFile(fileId: string) {
    try {
        const deletedFile = storage.deleteFile(
            appWriteConfig.storageId,
            fileId,
        )

        if (!deletedFile) throw Error

        return deletedFile

    } catch (error) {
        console.log(error)
    }
}


export async function getRecentPosts() {
    try {
        const posts = await database.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.postCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(20)],
        )

        if (!posts) throw Error;

        return posts
    } catch (error) {
        console.log(error)
    }
}


export async function likePost(postId: string, likesArray: string[]) {
    try {
        const updatePost = await database.updateDocument(
            appWriteConfig.databaseId,
            appWriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray
            }
        )

        if (!updatePost) throw Error;

        return updatePost
    } catch (error) {
        console.log(error)
    }
}


export async function savePost(postId: string, userId: string) {
    try {
        const savedPost = await database.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        )

        if (!savedPost) throw Error;

        return savedPost;
    } catch (error) {
        console.log(error)
    }
}


export async function deleteSavedPost(savedId: string) {
    try {
        const deletedSavedPost = await database.deleteDocument(
            appWriteConfig.databaseId,
            appWriteConfig.savesCollectionId,
            savedId,
        )

        if (!deletedSavedPost) throw Error;

        return deletedSavedPost;
    } catch (error) {
        console.log(error)
    }
}

export async function deletePost(postId: string | undefined, imageId: string | undefined) {


    if (!postId || !imageId) throw Error;

    try {
        const deletedFile = await storage.deleteFile(
            appWriteConfig.storageId,
            imageId
        )
        console.log(deleteFile)
        if (!deletedFile) throw Error;

        const deletedPost = await database.deleteDocument(
            appWriteConfig.databaseId,
            appWriteConfig.postCollectionId,
            postId
        )

        if (!deletedPost) throw Error;

        return deletedPost

    } catch (error) {
        console.log(error)
    }
}


export async function getPostById(id?: string) {
    console.log(id)
    if (!id) throw Error

    try {
        const post = await database.getDocument(
            appWriteConfig.databaseId,
            appWriteConfig.postCollectionId,
            id
        )

        if (!post) throw Error

        return post;

    } catch (error) {
        console.log(error)
    }
}

export async function getInfintyPosts({ pageParam }: { pageParam: number }) {
    const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(10)]

    if (pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()))
    }

    try {
        const posts = await database.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.postCollectionId,
            queries
        )

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error)
    }
}


export async function searchPosts(searchTerm: string) {
    console.log(searchTerm)
    try {
        const post = await database.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.postCollectionId,
            [Query.search("captions", searchTerm)]
        )

        if (!post) throw Error;

        return post;
    } catch (error) {
        console.log(error)
    }
}

export async function getUserById(userId: string) {
    try {
        const user = await database.getDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            userId
        );

        if (!user) throw Error;

        return user;
    } catch (error) {
        console.log(error);
    }
}


export async function getUsers(limit?: number) {
    const queries: any[] = [Query.orderDesc("$createdAt")];

    if (limit) {
        queries.push(Query.limit(limit));
    }

    try {
        const users = await database.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            queries
        );

        if (!users) throw Error;

        return users;
    } catch (error) {
        console.log(error);
    }
}