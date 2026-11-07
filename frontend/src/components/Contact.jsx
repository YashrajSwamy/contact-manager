import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Contact = () => {

  const [contacts,setContacts] = useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('');

  const submitHandler = (e) =>{
    e.preventDefault();
    setQuery(search);
  }

  const deleteContact = async (id) =>{
    if (!window.confirm('Do You Want To Delete This Contact??')) return;
    try 
    {
      const response = await axios.delete(`http://localhost:3000/api/contacts/${id}`,{withCredentials:true });
      setContacts(contacts.filter((contact) =>contact._id!==id));
      alert('Contact Delted');
    }
    catch(error) 
    {
      console.log("Message:", error.response?.data);
      alert(error.response?.data?.message || 'Something went wrong');
    }
  }

  useEffect(() =>{
    const getContacts = async ()=>{
    try 
    {
      const response = await axios.get('http://localhost:3000/api/contacts',{withCredentials:true});
      setContacts(response.data);
    }
    catch(error) 
    {
      console.log("Message:", error.response?.data);
    }
    }
    getContacts();
  },[]);

  const filteredContacts = contacts.filter((contact) =>{
    const text = query.toLowerCase();
    return (
      contact.name?.toLowerCase().includes(text) ||
      contact.phone?.toLowerCase().includes(text) ||
      contact.email?.toLowerCase().includes(text)
    );
  });

  return (
    <>
      <div className='px-6 py-6'>
        <form
          onSubmit={submitHandler}
          className='flex mb-4'>
          <input
            type="text"
            placeholder="Search by name, phone or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 border border-gray-300 rounded-l-md px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'/>
          <button
            type="submit"
            className='bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-md px-5 py-2.5'>
            Search
          </button>
        </form>

        <div className='flex justify-end mb-4'>
          <Link
            to="/add-contact"
            className='bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2'
          >+ Add Contact
          </Link>
        </div>

        <div className='border border-gray-200 rounded-lg overflow-x-auto'>
          <table className='w-full text-left'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-4 py-3 font-semibold text-gray-900'>Name</th>
                <th className='px-4 py-3 font-semibold text-gray-900'>Phone</th>
                <th className='px-4 py-3 font-semibold text-gray-900'>Email</th>
                <th className='px-4 py-3 font-semibold text-gray-900'>Address</th>
                <th className='px-4 py-3 font-semibold text-gray-900 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length===0&&(
                <tr><td colSpan={5} className='px-4 py-6 text-center text-gray-500'>No contacts found.</td></tr>)}

              {filteredContacts.map((contact) => (
                <tr key={contact._id} className='border-b border-gray-200 last:border-b-0'>
                  <td className='px-4 py-3 text-gray-900'>{contact.name}</td>
                  <td className='px-4 py-3 text-gray-900'>{contact.phone}</td>
                  <td className='px-4 py-3 text-gray-900'>{contact.email}</td>
                  <td className='px-4 py-3 text-gray-900'>{contact.address}</td>
                  <td className='px-4 py-3'>
                    <div className='flex justify-center gap-2'>
                      <Link
                        to={`/edit-contact/${contact._id}`}
                        className='border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm rounded-md px-3 py-1 transition-colors'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteContact(contact._id)}
                        className='border border-red-500 text-red-500 hover:bg-red-50 text-sm rounded-md px-3 py-1 transition-colors cursor-pointer'
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Contact