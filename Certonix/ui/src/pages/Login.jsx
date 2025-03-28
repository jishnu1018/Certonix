import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

    const navigate = useNavigate()

    const handlelogin = async(e)=>
    {
        e.preventDefault()
        try
        {
            const response = await fetch('/api/login',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({Email:email,Password:password})
            })

            if(!response.ok)
            {
                const errData = await response.json()
                throw new Error(errData.msg|| 'Login failed')
            }

            navigate('/home')
        }

        catch(err)
        {
            setError(err.message || 'invalid - credentials')
        }
    }


   return (
    <div className="flex items-center justify-center min-h-screen bg-purple-200">
    <div className="w-full max-w-md bg-white p-8 rounded shadow rounded-md border">
      <h2 className="text-4xl font-bold mb-6 text-center text-purple-600">Login</h2>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handlelogin}>
        <div className="mb-4">
          <label  className="block text-gray-700">Email</label>
          <input
            type="text"
            id="email"
            name="Email"
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="Password"
            className="w-full p-2 border rounded mt-1"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-2 rounded "
        >
          Login
        </button>

        <div className='flex gap-4 ml-[70px] mt-[10px]'>
        <p>Don't have an account?</p>
        <Link to={'/signup'} className='text-red-950'>Signup</Link>
      </div>

      </form>
    </div>
  </div>
  )
}

export default Login