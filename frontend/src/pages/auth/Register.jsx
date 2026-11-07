import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const submitHandler = async (e) =>{
        e.preventDefault();

        try 
        {
            const response = await axios.post('http://localhost:3000/api/auth/register',{name,email,password },{withCredentials:true});
            console.log(response.data.message);
            navigate('/login');
        } 
        catch(error) 
        {
            console.log(error);
            alert(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-white'>
            <div className='w-full max-w-md bg-white border border-gray-200 rounded-xl px-6 py-8 mx-4'>
                <h1 className='text-2xl font-bold text-center text-gray-900 mb-6'>Create Account</h1>

                <form onSubmit={submitHandler} className='flex flex-col'>
                    <label htmlFor="name" className='text-base font-medium text-gray-900 mb-1.5'>Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        className='w-full border border-gray-300 rounded-md px-4 py-2.5 mb-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    />

                    <label htmlFor="email" className='text-base font-medium text-gray-900 mb-1.5'>Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className='w-full border border-gray-300 rounded-md px-4 py-2.5 mb-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    />

                    <label htmlFor="password" className='text-base font-medium text-gray-900 mb-1.5'>Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className='w-full border border-gray-300 rounded-md px-4 py-2.5 mb-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    />

                    <button
                        type="submit"
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md py-2.5 mt-1 transition-colors'
                    >
                        Register
                    </button>
                </form>

                <p className='text-center text-gray-900 mt-4'>
                    Already have an account?{' '}
                    <Link to="/login" className='text-blue-600 hover:underline'>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register