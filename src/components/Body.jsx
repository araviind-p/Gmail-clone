import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './shared/Navbar';

function Body() {
  const { sideBarOpen } = useSelector(store => store.appSlice);

  return (
    <div className='flex flex-col h-full'>
      <Navbar /> {/* Ensure Navbar is included */}
      <div className='flex flex-1'>
        {
          sideBarOpen && (
            <Sidebar />
          )
        }
        <main className='flex-1'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Body
