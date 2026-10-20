import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useChat } from '../hooks/UseChat'

const Dashboard = () => {

    const {user}=useSelector(state => state.auth)
    
    const {InitSocketClient}=useChat();
    useEffect(()=>{
        InitSocketClient()
    },[])
    
    

  return (
    <div>Dashboard</div>
  )
}


export default Dashboard