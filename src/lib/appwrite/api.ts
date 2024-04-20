import { ID, Models, Query } from "appwrite";
import { INewPostType, INewUserType } from "@/types";
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

// createPost

export async function createPost(post: INewPostType) {

    try {
        let newFile: Promise<Models.File>;

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
                captions: post.text,
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

// Upload File

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

// File Url

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



export function getRecentPosts() {
    try {
        const posts = database.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.postCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(20)],
        )

        if (!posts) throw Error;

        return posts
    }
    catch (error) {
        console.log(error)
    }
}