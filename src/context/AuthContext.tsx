import { IContextType, IUserType } from '@/types';
import React from 'react'
import { getCurrentUser } from '@/lib/appwrite/api';
import { useNavigate } from 'react-router-dom';
import QueryProvider from '@/lib/react-query/QueryProvider';


export const INITIAL_USER = {
    id: '',
    email: '',
    name: '',
    username: '',
    imageUrl: '',
    bio: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
}

const AuthContext = React.createContext<IContextType>(INITIAL_STATE);

export const useAuthContext = () => {
    return React.useContext(AuthContext);
}

const AuthProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [user, setUser] = React.useState<IUserType>(INITIAL_USER);
    const [isLoading, setLoading] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const navigate = useNavigate();


    const checkAuthUser = async () => {
        setLoading(true)

        try {

            const currentUser = await getCurrentUser()

            if (currentUser) {
                setUser({
                    id: currentUser.$id,
                    email: currentUser.email,
                    name: currentUser.name,
                    username: currentUser.username,
                    bio: currentUser.bio,
                    imageUrl: currentUser.imageUrl,
                })
                setIsAuthenticated(true);
                return true;
            }

            return false

        } catch (error) {
            return false
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const cookieFallback = localStorage.getItem('cookieFallback')
        if (
            cookieFallback === '[]' ||
            cookieFallback === null ||
            cookieFallback === undefined
        ) navigate('/signin')

        checkAuthUser()
    }, [])

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    }

    return (

        <AuthContext.Provider value={value}>
            <QueryProvider>
                {children}
            </QueryProvider>
        </AuthContext.Provider >

    )
}

export default AuthProvider;