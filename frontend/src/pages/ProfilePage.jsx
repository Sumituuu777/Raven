import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/authContext'

const ProfilePage = () => {

  const { authUser, updateProfile } = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate()

  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selectedImg) {
      await updateProfile({ fullName: name, bio })
      navigate('/')
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(selectedImg)

    reader.onload = async () => {
      const base64Image = reader.result

      await updateProfile({
        profilePic: base64Image,
        fullName: name,
        bio
      })

      navigate('/')
    }
  }

  return (
    <div className='h-screen bg-cover backdrop-blur-xs bg-no-repeat flex items-center justify-center p-2 overflow-hidden'>

      <div className='w-[95%] max-w-2xl h-[95dvh] bg-gray-500 backdrop-blur-2xl text-white border-2 border-gray-700 rounded-lg overflow-y-auto flex flex-col-reverse sm:flex-row items-center'>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-5 p-6 md:p-8 flex-1 w-full min-w-0'
        >

          <h3 className='text-lg font-semibold'>
            Profile details
          </h3>

          <label
            htmlFor="avatar"
            className='flex items-center gap-3 cursor-pointer flex-wrap'
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept='.png,.jpg,.jpeg'
              hidden
            />

            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 object-cover ${
                selectedImg ? 'rounded-full' : ''
              }`}
            />

            <span>Upload profile image</span>
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder='Your Name'
            className='w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 text-white'
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder='Add profile bio'
            rows={4}
            className='w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 text-white resize-none'
          />

          <button
            type='submit'
            className='w-full py-3 bg-gray-50 rounded-md cursor-pointer font-semibold text-gray-500'
          >
            Save
          </button>

        </form>

        <div className='flex justify-center items-center p-6 sm:p-8'>
          <img
            src={authUser?.profilePic || assets.raven_logo}
            alt=""
            className={`w-40 h-40 sm:w-52 sm:h-52 object-cover rounded-full ${
              selectedImg ? 'rounded-full' : ''
            }`}
          />
        </div>

      </div>

    </div>
  )
}

export default ProfilePage
