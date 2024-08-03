import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Body() {
  const {sideBarOpen} = useSelector(Store=>Store.appSlice)
  return (
    <div className='flex'>
      {
        sideBarOpen && (
          <Sidebar/>
        )
      }
      <Outlet/>
    </div>
  )
}

export default Body
