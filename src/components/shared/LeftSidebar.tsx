import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuthContext } from '@/context/AuthContext';
import { useSignOutAccountMutation } from '@/lib/react-query/queriesAndMutations';
import { sideBarLinks } from '@/constants';
import CreatePostModal from './CreatePostModal';

const LeftSidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccountMutation()
  const { user } = useAuthContext()

  React.useEffect(() => {
    if (isSuccess) navigate(0)

  }, [isSuccess])

  const handleSignOut = (e) => {
    e.preventDefault()
    signOut()

  }


  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/image/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

      </div>
      <ul className='flex flex-col gap-6'>
        {
          sideBarLinks.map(({ imgURL, route, label }) => {
            const isActive = pathname === route

            return (
              <li key={label} className={`leftsidebar-link group ${isActive && "bg-primary-500"
                }`}>
                <NavLink to={route} className='flex gap-4 items-center p-3'>
                  <img src={imgURL} alt={label} className={`group-hover:invert-white ${isActive && "invert-white"
                    }`} />
                  <span>{label}</span>
                </NavLink>
              </li>
            )
          })
        }
      </ul>
      <div>
        <CreatePostModal />
      </div>
      <div>
        <Link to={`/profile/${user.id}`} className="flex gap-5 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name} {user.username}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        {/* <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={(e) => handleSignOut(e)}>
          <img src="/assets/icon/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button> */}
      </div>
    </nav>
  )
}

export default LeftSidebar
