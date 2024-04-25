import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignInForm from "./_auth/forms/SignInForm"
import SignUpForm from "./_auth/forms/SignUpForm"
import RootLayout from "./_root/RootLayout"
import {
    Home,
    Profile,
    Explore,
    People,
    Saved,
    PostDetails,
    AllUsers,
    CreatePost,
    EditPost,
} from "@/_root/pages"

import AuthLayout from "./_auth/AuthLayout"
import { Toaster } from "./components/ui/toaster"

const routes = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/profile/:id',
                element: <Profile />
            },
            {
                path: '/explore',
                element: <Explore />
            },
            {
                path: '/all-users',
                element: <People />
            },
            {
                path: '/saved',
                element: <Saved />
            },
            {
                path: '/post-details/:id',
                element: <PostDetails />
            },
            {
                path: '/creaete-post',
                element: <CreatePost />
            },
            {
                path: '/users',
                element: <AllUsers />
            },
            {
                path: '/edit/:id',
                element: <EditPost />
            }
        ],
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: 'signin',
                element: <SignInForm />,
            },
            {
                path: 'signup',
                element: <SignUpForm />
            }
        ]
    }
])

function App() {
    return (
        <main className="flex h-screen">
            <RouterProvider router={routes} />
            <Toaster />
        </main>
    )
}

export default App
