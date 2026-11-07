import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const logoutHandler = async () =>{
        try 
        {
            const response = await axios.post('http://localhost:3000/api/auth/logout',{},{withCredentials:true });
            console.log(response.data.message);
            navigate('/login');
        } 
        catch(error)
        {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-between items-center bg-gray-50 border-b border-gray-200 px-6 py-4'>
            <Link to="/" className='text-xl font-bold text-gray-900'>Contact Manager</Link>
            <button
                onClick={logoutHandler}
                className='text-blue-600 font-medium hover:underline cursor-pointer'
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar