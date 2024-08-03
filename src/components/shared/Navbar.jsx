import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
import Avatar from 'react-avatar';
import { useDispatch } from 'react-redux';
import { setSearchText } from '../../redux/appSlice';

function Navbar() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSearchText(input))
    }, [input])
    return (
        <div className='flex justify-between items-center mx-3 h-16'>
            <div className='flex items-center gap-10'>
                <div className="flex items-center gap-2">
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <RxHamburgerMenu size={"20px"} />
                    </div>
                    <img className='w-8' src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png" alt="gmail-logo" />
                    <h1 className='text-2xl text-gray-500 font-medium'>Gmail</h1>
                </div>
            </div>
            <div className='md:block hidden w-[50%] mr-60'>
                <div className='flex items-center bg-[#EAF1FB] px-2 py-3 mt-4 rounded-full '>
                    <IoIosSearch size={'24px'} className='text-gray-700' />
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        type="text"
                        className='rounded-full w-full bg-transparent outline-none px-1'
                        placeholder='Search Mail'
                    />
                </div>
            </div>
            <div className='md:block hidden'>
                <div className='flex items-center gap-2'>
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <CiCircleQuestion size={'20px'} />
                    </div>
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoSettingsOutline size={'20px'} />
                    </div>
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <PiDotsNineBold size={'20px'} />
                    </div>
                    <div className='cursor-pointer '>
                        <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s' size='40' round={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
