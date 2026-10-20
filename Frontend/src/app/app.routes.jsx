
import { createBrowserRouter } from 'react-router'
import Register from '../Features/Auth/pages/Register'
import Login from '../Features/Auth/pages/login'
import Home from '../Features/Auth/pages/Home'
import Dashboard from '../Features/Auth/chat/pages/Dashboard'
import Protected from '../Features/Auth/Components/Protected'

export const router = createBrowserRouter([
    {
     path:'/register',
     element:<Register/>
    },
    {
        path:'/'
        ,element:<Protected><Dashboard/></Protected>
    },
    {
        path:'/login',
        element: <Login/>
    }
])