import React, { useState } from 'react'
import { IoMdStar } from 'react-icons/io';
import { LuPencil } from "react-icons/lu";
import { MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setOpen, setSideBarOpen } from '../redux/appSlice';
import ArchievedMails from './ArchievedMails';
import { useNavigate } from 'react-router-dom';

const sidebarItems = [
    {
        icon: <LuPencil size={'24px'} />,
        text: "Inbox"
    },
    {
        icon: <IoMdStar size={'24px'} />,
        text: "Starred"
    },
    {
        icon: <MdOutlineWatchLater size={'24px'} />,
        text: "Snoozed"
    },
    {
        icon: <TbSend2 size={'24px'} />,
        text: "Sent"
    },
    {
        icon: <MdOutlineDrafts size={'24px'} />,
        text: "Drafts"
    },
    {
        icon: <MdOutlineKeyboardArrowDown size={'24px'} />,
        text: "More"
    },
]

function Sidebar() {
    // const [open, setOpen] = useState(false)

    const dispatch = useDispatch()
    const { sideBarOpen } = useSelector(Store => Store.appSlice)
    const navigate = useNavigate()

    const handleClick = (text) => {
        if (text === "Starred") {
            dispatch(setLoading(true))
            dispatch(setSideBarOpen(false))
            dispatch(setLoading(false))
            navigate('/starred')
        }
    }
    return (
        <div className={`${sideBarOpen}? 'block': 'hidden' w-[100%] md:block md:w-[15%]`}>
            <div className='p-3'>
                <button onClick={() => dispatch(setOpen(true))} className='flex items-center gap-2 p-4 rounded-2xl hover:shadow-md bg-[#C2E7FF]'>
                    <LuPencil size={'24px'} />
                    Compose
                </button>
            </div>
            <div className='text-gray-500 '>
                {
                    sidebarItems.map((item, index) => {
                        return (
                            <div key={index}
                                onClick={() => handleClick(item.text)}
                                className='flex items-center gap-4 pl-6 py-1 rounded-full hover:cursor-pointer hover:bg-gray-200 my-2'>
                                {item.icon}
                                <p>{item.text}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar
