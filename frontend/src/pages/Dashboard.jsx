import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate();

  const [user,setUser] = useState('');

  useEffect(() =>{
   const getUser = async ()=>{ 
    try 
    {
      const response = await axios.get('http://localhost:3000/api/auth/me',{withCredentials:true });
      setUser(response.data.user);
    } 
    catch(error)
    {
      console.log("Message:", error.response?.data);
      navigate('/login');
    }
   }
   getUser();
  },[]);

  return (
    <>
      <Navbar />
      <div className='px-6 pt-6'>
        <h1 className='text-2xl font-bold text-gray-900'>
          {user ? `Welcome, ${user.name}` : 'Welcome'}
        </h1>
      </div>
      <Contact />
    </>
  )
}

export default Dashboard