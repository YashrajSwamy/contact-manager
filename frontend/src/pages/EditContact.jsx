import React, { useState, useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'

const EditContact = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('');

    useEffect(() =>{
        const getContact = async () =>{
                    try 
        {
            const response = await axios.get(`http://localhost:3000/api/contacts/${id}`,{withCredentials:true });
            setName(response.data.name);
            setPhone(response.data.phone);
            setEmail(response.data.email);
            setAddress(response.data.address || '');
        } 
        catch(error) 
        {
            console.log("Message:", error.response?.data);
            alert(error.response?.data?.message || 'Something went wrong');
        }
        }
        getContact();
    },[]);

    const submitHandler = async (e) =>{
        e.preventDefault();
        try 
        {
            const response = await axios.patch(`http://localhost:3000/api/contacts/${id}`,{name,phone,email,address },{withCredentials:true });
            console.log(response.data);
            navigate('/');
        } 
        catch(error) 
        {
            console.log("Message:", error.response?.data);
            alert(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <>
            <Navbar />
            <div className='px-6 py-6'>
                <div className='border border-gray-200 rounded-xl px-6 py-6 bg-white'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-6'>Edit Contact</h1>

                    <form onSubmit={submitHandler} className='flex flex-col'>
                        <label htmlFor="name" className='text-base font-medium text-gray-900 mb-1.5'>Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            className='w-full border border-gray-300 rounded-md px-4 py-2.5 mb-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />

                        <label htmlFor="phone" className='text-base font-medium text-gray-900 mb-1.5'>Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Enter phone number"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            required
                            maxLength={10}
                            className='w-full border border-gray-300 rounded-md px-4 py-2.5 mb-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />

                        <label htmlFor="email" className='text-base font-medium text-gray-900 mb-1.5'>Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            className='w-full border border-gray-300 rounded-md px-4 py-2.5 mb-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />

                        <label htmlFor="address" className='text-base font-medium text-gray-900 mb-1.5'>Address</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Enter address (optional)"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            className='w-full border border-gray-300 rounded-md px-4 py-2.5 mb-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        />

                        <div className='flex gap-4 mt-2'>
                            <button
                                type="submit"
                                className='bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-8 py-2.5 transition-colors'
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md px-8 py-2.5 transition-colors'
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditContact