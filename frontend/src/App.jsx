import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginScreen from './LoginScreen'
import UserScreen from './MainScreen'

function App() {
  const [userId, setUserId] = useState(0);

  const handleUserId = (id) => {
    setUserId(id);
    //alert(`New Id: ${id}`);
  }

  const handleLogout = () => {
    var t = userId ? "yes" : "no";
    setUserId(0);
    //alert(`User Logged out`);
  }

  if (userId){
    return(
      <UserScreen userId={userId} logOut={handleLogout}/>
    )
  } else { 
    return (        
        <LoginScreen handleUserId={handleUserId}/>        
    )
  }
}

export default App
