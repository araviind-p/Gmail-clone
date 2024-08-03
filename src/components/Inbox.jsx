import React, { useState } from 'react'
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoMdMore, IoMdRefresh } from 'react-icons/io';
import { GoTag } from "react-icons/go";
import Messages from './Messages';
import { useSelector } from 'react-redux';

const mailType = [
    {
        icon: <MdInbox size={'20px'} />,
        text: "Primary"
    },
    {
        icon: <GoTag size={'20px'} />,
        text: "Promotions"
    },
    {
        icon: <FaUserFriends size={'20px'} />,
        text: "Social"
    },
]

function Inbox() {
    const [mailTypeSelected, setMailTypeSelected] = useState(0)
    const { sideBarOpen } = useSelector(store => store.appSlice)
    return (
        <div className={`${sideBarOpen && "hidden"} flex-1 rounded-xl w-dvh`}>
            <div className='flex items-center justify-between px-4 overflow-y-hidden'>
                <div className='flex items-center gap-2 text-gray-700 py-2 '>
                    <div className='flex items-center gap-1'>
                        <MdCropSquare size={'20px'} />
                        <FaCaretDown size={'20px'} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoMdRefresh size={'20px'} />
                    </div>
                    <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <IoMdMore size={'20px'} />
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <p className=' text-sm text-gray-500'>1-50 of 1000</p>
                    <button className='hover:rounded-full hover:bg-gray-100'><MdKeyboardArrowLeft size="24px" /></button>
                    <button className='hover:rounded-full hover:bg-gray-100'><MdKeyboardArrowRight size="24px" /></button>
                </div>
            </div>
            <div className='h-[90dvh] overflow-y-auto'>
                <div className='flex items-center gap-4 justify-start w-screen'>
                    {
                        mailType.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    className={`${mailTypeSelected === index ? 'border-b-4 border-b-blue-600 text-blue-600' : 'border-b-4 border-b-transparent'} flex items-center gap-4 p-1 md:p-4 w-auto hover:bg-gray-100`}
                                    onClick={() => setMailTypeSelected(index)}
                                >
                                    {item.icon}
                                    <span>{item.text}</span>
                                </button>
                            )
                        })
                    }
                </div>
                <div className='flex justify-center items-center'>
                    <Messages />
                </div>
            </div>
        </div>
    )
}

export default Inbox
