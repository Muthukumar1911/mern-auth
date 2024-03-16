import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const {username, password, email} = formData
    console.log(formData)
    await axios.post('http://127.0.0.1:3000/api/auth/signup', {
      username,
      password,
      email
    })
    .then((res) => {
      console.log(res)
      setLoading(false)
      setError(false)
      navigate('/')
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
      setError(true)
    })
  }
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
    
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <input type='text' placeholder='Username' id='username' 
      className='bg-slate-100 p-3' onChange={handleChange}/>
      
      <input type='email' placeholder='Email' id='email' 
      className='bg-slate-100 p-3' onChange={handleChange}/>
      
      <input type='text' placeholder='Password' id='password' 
      className='bg-slate-100 p-3' onChange={handleChange}/>

      <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading..' : 'Sign Up'}</button>
    
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to='/signin'>
      <span className='text-blue-500'>Sign In</span></Link>
    </div>
    </form>
    <p className='text-red-600 font-bold'>{error ? 'Something went wrong !' : ''}</p>
    </div>
  )
}
