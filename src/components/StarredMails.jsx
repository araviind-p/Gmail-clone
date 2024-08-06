import React, { useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setStarredMails } from '../redux/appSlice';
import ClipLoader from "react-spinners/ClipLoader";

function StarredMails() {
    const { starredMails, loading } = useSelector(store => store.appSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchStarredMails = async () => {
            try {
                dispatch(setLoading(true));
                const q = query(collection(db, "emails"), where("starred", "==", true));
                const querySnapshot = await getDocs(q);
                const mails = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                dispatch(setStarredMails(mails));
            } catch (error) {
                console.error("Error fetching starred mails: ", error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchStarredMails();
    }, [dispatch]);

    return (
        <div className='overflow-x-hidden w-[98%] '>
            {loading ? (
                <div className='flex items-center justify-center h-96 w-screen'>
                    <ClipLoader size={50} aria-label="Loading Spinner" data-testid="loader" />
                </div>
            ) : starredMails.length === 0 ? (
                <p className='text-gray-500 text-center text-lg font-medium mt-[15%]'>
                    No starred mails found.
                </p>
            ) : (
                <div className='overflow-x-hidden w-[98%] '>
                    {starredMails.map(email => <Message key={email.id} email={email} />)}
                </div>
            )}
        </div>
    );
}

export default StarredMails;
