import React, { useState, useEffect } from 'react';
import { MdCropSquare } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa'; // Import the FaCheckCircle icon
import { RiStarLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckedCount, setCheckedMails, setLoading, setSelectedEmail, setStarredMails } from '../redux/appSlice';
import { motion } from 'framer-motion';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ClipLoader from "react-spinners/ClipLoader";

function Message({ email }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, checkedMails, tempEmails, checkedCount } = useSelector(state => state.appSlice);
    const [checked, setChecked] = useState(false); // Local state for checkbox

    useEffect(() => {
        // Check if email is in the checkedMails list from Redux state
        const isChecked = checkedMails.some(mail => mail.id === email.id);
        setChecked(isChecked);
    }, [checkedMails, email.id]);

    const openMail = () => {
        dispatch(setSelectedEmail(email));
        navigate(`/mail/${email.id}`);
    };

    const toggleStarredStatus = async () => {
        try {
            const newStarredStatus = !email.starred;
            await updateDoc(doc(db, "emails", email.id), { starred: newStarredStatus });
            fetchStarredMails();
        } catch (error) {
            console.error("Error updating starred status: ", error);
        }
    };

    const fetchStarredMails = async () => {
        try {
            const q = query(collection(db, "emails"), where("starred", "==", true));
            const querySnapshot = await getDocs(q);
            const mails = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            dispatch(setStarredMails(mails));
        } catch (error) {
            console.error("Error fetching starred mails: ", error);
        }
    };

    const handleCheckboxClick = () => {
        if (checked) {
            dispatch(setCheckedCount(-1))
        } else {
            dispatch(setCheckedCount(1))
        }
        dispatch(setCheckedMails(email)); // Dispatch the entire email object
        setChecked(!checked); // Toggle the local checkbox state
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md
            ${checked ? 'bg-gray-200' : ''} `}
        >
            {loading ? (
                <div className='flex items-center justify-center h-96 w-screen'>
                    <ClipLoader size={50} aria-label="Loading Spinner" data-testid="loader" />
                </div>
            ) : (
                <>
                    <div className='flex items-center gap-3'>
                        <div
                            onClick={handleCheckboxClick}
                            className={`flex-none ${checked ? 'text-blue-500' : 'text-gray-300'}`}
                        >
                            {checked ? (
                                <FaCheckCircle className='w-5 h-5 text-blue-500' />
                            ) : (
                                <MdCropSquare className='w-5 h-5' />
                            )}
                        </div>
                        <div onClick={toggleStarredStatus} className='flex-none'>
                            <RiStarLine className={`w-5 h-5 ${email.starred ? 'text-yellow-400' : 'text-gray-300'}`} />
                        </div>
                        <div onClick={openMail}>
                            <h1 className='font-semibold'>{email?.to}</h1>
                        </div>
                    </div>

                    <div onClick={openMail} className='flex-1 ml-4'>
                        <p className='text-gray-600 truncate inline-block max-w-full'>{email?.message}</p>
                    </div>
                    <div onClick={openMail} className='flex-none text-gray-400 text-sm'>
                        <p>{new Date(email?.createdAt?.seconds * 1000).toTimeString()}</p>
                    </div>
                </>
            )}
        </motion.div>
    );
}

export default Message;
