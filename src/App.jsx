import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Body from './components/Body'
import Inbox from './components/Inbox'
import Mail from './components/Mail'
import SendMail from './components/SendMail'
import Login from './components/Login'
import { useSelector } from 'react-redux'

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
      }
    ]
  }
])

function App() {
  const {user} = useSelector(store => store.appSlice)
  return (
    <div className='bg-[#F6F8FC] h-dvh w-dvh overflow-hidden'>
      {
        !user ? (
          <Login />
        ) : (
          <>
            <Navbar />
            <RouterProvider router={router} />
            <div className='absolute bottom-0 right-20 z-10 w-[30%]'>
              <SendMail />
            </div>
          </>
        )
      }
    </div>
  )
}

export default App
