import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Body from './components/Body'
import Inbox from './components/Inbox'
import Mail from './components/Mail'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Body />,
    children:[
      {
        path:"/",
        element:<Inbox/>
      },
      {
        path:"/mail/:id",
        element:<Mail/>
      }
    ]
  }
])

function App() {

  return (
    <div className='bg-[#F6F8FC] h-dvh w-dvh overflow-hidden'>
      <Navbar />
      <RouterProvider router={router}/>
    </div>
  )
}

export default App