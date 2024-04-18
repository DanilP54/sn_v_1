import { ID, Query } from "appwrite";
import { INewUserType } from "@/types";
import { account, database, avatar, appWriteConfig } from "./config";


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