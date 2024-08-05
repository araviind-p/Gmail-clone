import React from 'react';
import { MdCropSquare } from 'react-icons/md';
import { RiStarLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setSelectedEmail, setStarredMails } from '../redux/appSlice';
import { motion } from 'framer-motion';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ClipLoader from "react-spinners/ClipLoader";

function Message({ email }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading } = useSelector(state => state.appSlice)
    const openMail = () => {
        dispatch(setSelectedEmail(email));
        navigate(`/mail/${email.id}`);
    };

    const toggleStarredStatus = async () => {
        try {
            
            const newStarredStatus = !email.starred; // Use email's starred status from props
            await updateDoc(doc(db, "emails", email.id), { starred: newStarredStatus });
            // Fetch and update starred mails in Redux
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
            dispatch(setStarredMails(mails)); // Update Redux state
        } catch (error) {
            console.error("Error fetching starred mails: ", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex items-start justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md'
        >
            {
                loading ?
                    (
                        <div className='flex items-center justify-center h-96 w-screen'>
                            <ClipLoader size={50} aria-label="Loading Spinner" data-testid="loader" />
                        </div>
                    ) : (
                        <>
                            <div className='flex items-center gap-3'>
                                <div className='flex-none text-gray-300'>
                                    <MdCropSquare className='w-5 h-5' />
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
                        </>)}
        </motion.div>
    );
}

export default Message;
