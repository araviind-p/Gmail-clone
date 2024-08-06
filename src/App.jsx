import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Inbox from './components/Inbox';
import Mail from './components/Mail';
import SendMail from './components/SendMail';
import Login from './components/Login';
import ArchievedMails from './components/ArchievedMails';
import StarredMails from './components/StarredMails';
import { useSelector } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />
      },
      {
        path: "/mail/:id",
        element: <Mail />
      },
      {
        path: "/archieved",
        element: <ArchievedMails />
      },
      {
        path: "/starred",
        element: <StarredMails />
      }
    ]
  }
]);

function App() {
  const { user } = useSelector(store => store.appSlice);

  return (
    <div className='bg-[#F6F8FC] h-dvh w-dvh overflow-hidden'>
      {!user ? (
        <Login />
      ) : (
        <>
          <RouterProvider router={router} />
          <div className='absolute bottom-0 right-20 z-10 w-[30%]'>
            <SendMail />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
