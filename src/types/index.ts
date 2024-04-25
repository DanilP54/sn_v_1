import React from "react"

export interface INewUserType {
    name: string
    username: string
    email: string
    password: string
}
export interface IUserType {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
}

export interface IContextType {
    user: IUserType;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUserType>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
}

export interface INavLink {
    imgURL: string;
    route: string;
    label: string;
}

export interface INewPostType {
    userId: string;
    caption: string;
    uploadImages: File[]
}

export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    uploadImages: File[];
};