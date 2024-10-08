import React, { useEffect, useState } from 'react'
import Message from './Message'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setEmails, setLoading, setStarredMails, setTempEmails } from '../redux/appSlice'
import Sidebar from './Sidebar'
import ClipLoader from "react-spinners/ClipLoader";

function Messages() {
  const { emails, searchText, sideBarOpen, loading, tempEmails } = useSelector(store => store.appSlice)
  // const [tempEmails, setTempEmails] = useState(emails);


  const dispatch = useDispatch()
  // dispatch(setTempEmails(emails))
  useEffect(() => {
    dispatch(setLoading(true))
    const q = query(collection(db, "emails"), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      dispatch(setEmails(allEmails))

    })
    dispatch(setLoading(false))
    //cleanup
    return () => unsubscribe();
  }, [])


  // useEffect(() => {
  //   const filteredEmail = emails?.filter((email) => {
  //     return email?.subject?.toLowerCase().includes(searchText.toLowerCase()) || email?.to?.toLowerCase().includes(searchText.toLowerCase()) || email?.message?.toLowerCase().includes(searchText.toLowerCase())
  //   })
  //   dispatch(setTempEmails(filteredEmail))
  // }, [searchText, emails, dispatch])
  useEffect(() => {
    const filteredEmail = emails?.filter((email) => {
      return email?.subject?.toLowerCase().includes(searchText.toLowerCase()) ||
        email?.to?.toLowerCase().includes(searchText.toLowerCase()) ||
        email?.message?.toLowerCase().includes(searchText.toLowerCase());
    });
    dispatch(setTempEmails(filteredEmail));
  }, [searchText, emails, dispatch]);


  return (
    <>
      {
        loading ? (
          <div className='flex items-center justify-center h-96 w-screen'>
            <ClipLoader size={50} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        ) : (

          <div className='overflow-x-hidden w-[98%] '>

            {
              (tempEmails && !sideBarOpen) && tempEmails?.map((email) => <Message key={email.id} email={email} />)
            }

          </div>
        )
      }
    </>
  )
}

export default Messages
