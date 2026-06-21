import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {
  const [currentState,setCurrentState]=useState("Sign up")
  const [fullName,setFullName]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [bio,setbio]=useState("")
  const [isDataSubmitted,setisDataSubmitted]=useState(false)

  const onSubmitHandler=(event)=>{
    event.preventDefault()

    if(currentState==="Sign up" && !isDataSubmitted){
      setisDataSubmitted(true)
      return
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* ---------------left --------------*/}
      <img src={assets.raven_logo} alt="" className='w-[min(30vw,250px)]'/>

      {/*-------------------right------------- */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-gray-500 text-white border-gray-600 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='flex justify-between font-medium text-2xl items-center'>
          {currentState}
          {isDataSubmitted && <img onClick={()=>setisDataSubmitted(false)}
           src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
          
        </h2>

        {currentState==="Sign up" && !isDataSubmitted && (
          <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
           type="text" className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2' placeholder='Full Name' required/>
        )}

        {!isDataSubmitted && (
          <>
            <input onChange={(e)=>setemail(e.target.value)} value={email}
             type="email" className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2' placeholder='Email' required />

            <input onChange={(e)=>setpassword(e.target.value)} value={password}
             type="password" className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2' placeholder='Password' required />
          </>
        )}

        {currentState==="Sign up" && isDataSubmitted && (
          <textarea onChange={(e)=>setbio(e.target.value)} value={bio}
           rows={4} className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2' placeholder='Add a short bio' required></textarea>
        )}

        <button type='submit' className='py-3 bg-gray-50 rounded-md cursor-pointer text-gray-500'>
          {currentState==="Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className='flex items-center text-sm gap-2 text-gray-800'>
          <input type="checkbox" className='' required/>
          <p>Agree to the terms of use & privacy policy</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currentState==="Sign up" ? (
            <p className='text-sm text-indigo-100'>Already have an account ? 
              <span onClick={()=>{setCurrentState("Login");setisDataSubmitted(false)}}
                className='font-medium text-blue-700 cursor-pointer ml-1'>
                  Login here
              </span>
            </p>
          ): (
            <p className='text-sm text-indigo-100'>Create an account
              <span onClick={()=>setCurrentState("Sign up")}
                className='font-medium text-blue-700 cursor-pointer ml-1'>
                click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPage
