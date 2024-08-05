import React from 'react';
import { useSelector } from 'react-redux';

function ArchievedMails() {
    // Extract archived mails from the Redux store
    const { archievedMails } = useSelector(store => store.appSlice);

    return (
        <div className='p-4'>
            {
                // Check if there are any archived mails
                Object.keys(archievedMails).length === 0 ? (
                    <p>No archived mails</p>
                ) : (
                    // Map through the archived mails object and render each mail
                    Object.entries(archievedMails).map(([id, mail]) => (
                        <div key={id} className='p-2 border-b'>
                            <h2 className='font-bold'>{mail.subject}</h2>
                            <p>{mail.message}</p>
                            <p className='text-gray-500'>{mail.to}</p>
                        </div>
                    ))
                )
            }
        </div>
    );
}

export default ArchievedMails;
