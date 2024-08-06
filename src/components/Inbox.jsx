import React, { useState, useEffect } from 'react'
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoMdMore, IoMdRefresh } from 'react-icons/io';
import { GoTag } from "react-icons/go";
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckedMails, setTempEmails } from '../redux/appSlice';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

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
    const [mailTypeSelected, setMailTypeSelected] = useState(0);
    const { sideBarOpen, emails, checkedMails, tempEmails } = useSelector(store => store.appSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        const q = query(collection(db, "emails"), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allEmails = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            // dispatch(setTempEmails(allEmails));
            console.log('Temp Emails Type:', typeof allEmails);
            console.log('Temp Emails Content:', allEmails);
        });
        // Cleanup the subscription on component unmount
        return () => unsubscribe();
    }, [dispatch]);

    const selectAllMessages = () => {
        // Determine if all emails are currently checked
        const q = query(collection(db, "emails"), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allEmails = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(setCheckedMails(allEmails));
            console.log('Temp Emails Type:', typeof allEmails);
            console.log('Temp Emails Content:', allEmails);
        });
        // const allChecked = checkedMails.length === tempEmails.length;

        // if (allChecked) {
        //     // If all emails are checked, uncheck all
        //     dispatch(setCheckedMails([]));
        // } else {
        //     // Otherwise, check all emails
        //     dispatch(setCheckedMails(tempEmails));
        // }
    };

    return (
        <div className={`${sideBarOpen && "hidden"} flex-1 rounded-xl w-dvh`}>
            <div className='flex items-center justify-between px-4 overflow-y-hidden'>
                <div className='flex items-center gap-2 text-gray-700 py-2 '>
                    <div
                        className='flex items-center gap-1 cursor-pointer'
                        onClick={selectAllMessages}
                    >
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
                <div className='flex w-screen justify-center'>
                    <div className='flex justify-center items-center w-11/12'>
                        <Messages />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inbox;
