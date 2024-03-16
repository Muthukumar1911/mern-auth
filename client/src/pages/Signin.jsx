import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Signin() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state) => state.user)
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    dispatch(signInStart())
    e.preventDefault()
    const {password, email} = formData
    console.log(formData)
    await axios.post('http://127.0.0.1:3000/api/auth/signin', {
      password,
      email
    })
    .then((res) => {
      console.log(res)
      dispatch(signInSuccess(res))
      navigate('/')
    })
    .catch((err) => {
      console.log(err)
      dispatch(signInFailure(err))
    })
  }
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
    
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
     
      <input type='email' placeholder='Email' id='email' 
      className='bg-slate-100 p-3' onChange={handleChange}/>
      
      <input type='text' placeholder='Password' id='password' 
      className='bg-slate-100 p-3' onChange={handleChange}/>

      <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading..' : 'Sign In'}</button>
    
    <div className='flex gap-2 mt-5'>
      <p>Dont have an account?</p>
      <Link to='/signup'>
      <span className='text-blue-500'>Sign Up</span></Link>
    </div>
    </form>
    <p className='text-red-600 font-bold'>{error ? 'Something went wrong !' : ''}</p>
    </div>
  )
}
