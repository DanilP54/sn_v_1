import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignInForm from "./_auth/forms/SignInForm"
import SignUpForm from "./_auth/forms/SignUpForm"
import RootLayout from "./_root/RootLayout"
import {
    Home,
    Profile,
    Explore,

    Saved,
    PostDetails,
    AllUsers,
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
                element: <AllUsers />
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
                path: '/users',
                element: <AllUsers />
            },
           
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
