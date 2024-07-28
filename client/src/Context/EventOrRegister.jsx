import React from 'react'
import EventPage from '../components/Events/events'
import Login from '../pages/Login/Login.jsx'
import { MainContext } from './MainContext'

function EventOrRegister() {
    const {showRegister,setShowRegister} = React.useContext(MainContext)
    

  return (
   <>
    {showRegister ? <Login/> : <EventPage/>}
   
   
   </>
  )
}

export default EventOrRegister;