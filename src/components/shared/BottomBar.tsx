import { bottomBarLinks } from '@/constants'
import { NavLink, useLocation } from 'react-router-dom'


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
                <NavLink to={route} className={`${isActive && "rounded-[5px] bg-primary-500"
                  } flex-center flex-col gap-1 p-2 transition`}>
                  <img src={imgURL} alt={label} width={26} height={26} className={`group-hover:invert-white ${isActive &&
                    'invert-white'}`} />
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
