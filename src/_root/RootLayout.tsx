// import React from 'react'
import BottomBar from '@/components/shared/BottomBar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar'
import AuthProvider from '@/context/AuthContext'
import { Outlet } from 'react-router-dom'



const RootLayout = () => {
  return (
    <AuthProvider>
      <div className="w-full md:flex">
        <Topbar />
        <LeftSidebar />
          <section className='flex h-full flex-1'>
            <Outlet />
          </section>
          <BottomBar />
      </div>
    </AuthProvider>
  )
}

export default RootLayout
