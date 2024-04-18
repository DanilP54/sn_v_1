import { bottomBarLinks } from '@/constants'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import CreatePostModal from './CreatePostModal'

const BottomBar = () => {
  const { pathname } = useLocation()

  return (
    <section className='bottom-bar'>
      <ul className='bottom-bar'>
        {
          bottomBarLinks.map(({ imgURL, label, route }) => {
            const isActive = pathname === route
            return (
              <li key={label} className='group'>
                <NavLink to={route} className={`${isActive && "rounded-[10px] bg-primary-500 "
                  } flex-center flex-col gap-2 p-2 transition`}>
                  <img src={imgURL} alt={label} width={16} height={16} className={`group-hover:invert-white ${isActive &&
                    'invert-white'}`} />
                  <span className='tiny-medium text-light-2'>{label}</span>
                </NavLink>
              </li>
            )
          })
        }
      </ul>
    </section >
  )
}

export default BottomBar
