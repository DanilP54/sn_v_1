import { Client, Databases, Account, Storage, Avatars } from 'appwrite';


export const appWriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STARAGE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
}

export const clinet = new Client()

clinet
    .setProject(appWriteConfig.projectId)
    .setEndpoint(appWriteConfig.url)

export const account = new Account(clinet)
export const database = new Databases(clinet)
export const storage = new Storage(clinet)
export const avatar = new Avatars(clinet)
