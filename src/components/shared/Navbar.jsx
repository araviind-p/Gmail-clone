import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, setSideBarOpen, setTempEmails, setUser } from '../../redux/appSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [input, setInput] = useState('')
    const [toggle, setToggle] = useState(false)

    const navigate = useNavigate()

    const { user, sideBarOpen, tempEmails } = useSelector(store => store.appSlice)
    const dispatch = useDispatch()
    const signOutHandler = () => {
        signOut(auth).then(() => {
            dispatch(setUser(null))
            localStorage.removeItem("userLoggedIn")
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        dispatch(setSearchText(input))
    }, [input])



    return (
        <div className='flex justify-between items-center mx-3 h-16'>
            <div className='flex items-center gap-10'>
                <div className="flex items-center gap-2">
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer '>
                        <RxHamburgerMenu onClick={() => dispatch(setSideBarOpen(!sideBarOpen))} size={"20px"} />
                    </div>
                    <img
                        onClick={() => {
                            navigate('/')
                            dispatch(setSideBarOpen(false))
                        }}
                        className='w-8 cursor-pointer' src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png" alt="gmail-logo" />
                    <h1
                        onClick={() => {
                            navigate('/')
                            dispatch(setSideBarOpen(false))
                        }}
                        className='hidden md:block text-2xl text-gray-500 font-medium cursor-pointer'>Gmail</h1>
                </div>
            </div>
            <div className='w-[30%] md:w-[50%]  grow mx-2'>
                <div className='flex items-center bg-[#EAF1FB] px-2 py-3 my-3 rounded-full'>
                    <IoIosSearch size={'24px'} className='text-gray-700' />
                    <input
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                            dispatch(setSearchText(e.target.value))}}
                        type="text"
                        className='rounded-full w-full bg-transparent outline-none px-1'
                        placeholder='Search Mail'
                    />
                </div>
            </div>
            <div >
                <div className='flex items-center gap-2'>

                    <div className='md:block hidden p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <CiCircleQuestion size={'20px'} />
                    </div>
                    <div className='md:block hidden p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoSettingsOutline size={'20px'} />
                    </div>
                    <div className='md:block hidden p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <PiDotsNineBold size={'20px'} />
                    </div>
                    <div className='cursor-pointer relative'>
                        <Avatar
                            onClick={() => setToggle(!toggle)}
                            src={user?.photoURL} size='40' round={true} />
                        <AnimatePresence>
                            {
                                toggle && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.1 }}
                                        className='absolute right-2 z-20 shadow-lg bg-white rounded-md'
                                    >
                                        <p onClick={signOutHandler} className='p-2 text-red-500'>Logout</p>
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
