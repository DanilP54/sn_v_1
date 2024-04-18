import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccountMutation } from '@/lib/react-query/queriesAndMutations'
import { useAuthContext } from '@/context/AuthContext'
const Topbar = () => {

    const navigate = useNavigate()

    const { mutate: signOut, isSuccess } = useSignOutAccountMutation()
    const { user } = useAuthContext()

    React.useEffect(() => {
        if (isSuccess) navigate(0)
    }, [isSuccess])

    return (
        <section className="topbar">
            <div className="flex-between py-4 px-5">
                <Link to="/" className="flex gap-3 items-center">
                    <img
                        src="/assets/image/logo.svg"
                        alt="logo"
                        width={100}
                        height={325}
                    />
                </Link>
                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        className="shad-button_ghost"
                        onClick={() => signOut()}
                    >
                        <img src="/assets/icon/logout.svg" width={20} height={25} alt="logout" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                        <img
                            src={user.imageUrl}
                            alt="profile"
                            className="h-8 w-8 rounded-full"
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Topbar
