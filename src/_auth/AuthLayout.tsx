import AuthProvider from '@/context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {

    const isAuth = false

    return (
        <>
            <AuthProvider>
                {
                    isAuth ? (
                        <Navigate to='/' />
                    ) : (
                        <section className='grid h-full grid-cols-1 grid-rows-1 xl:grid-cols-2 xl:grid-rows-1'>
                            <Outlet />
                            <img
                                src='/assets/image/side-image.webp'
                                alt="logo"
                                className='hidden hue-rotate-80 xl:block h-full w-full object-cover'
                            />

                        </section>
                    )
                }
            </AuthProvider>
        </>
    )
}

export default AuthLayout
