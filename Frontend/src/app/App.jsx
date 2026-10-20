import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { useAuth } from "../Features/Auth/hook/useAuth"
import { useEffect } from "react"


function App() {

  const {Handlegetme}=useAuth()

useEffect(()=>{
  Handlegetme()
},[])
  

  return (
   
    <RouterProvider router={router}/>
    
   
  )
}

export default App
