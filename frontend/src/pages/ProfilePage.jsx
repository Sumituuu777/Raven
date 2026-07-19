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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      if (!selectedImg) {
        await updateProfile({
          fullName: name,
          bio,
        });

        navigate("/");
        return;
      }

      const profilePic = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(selectedImg);
      });

      await updateProfile({
        profilePic,
        fullName: name,
        bio,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='h-screen flex items-center justify-center p-2 sm:px-[10%] sm:py-[3%] overflow-hidden'>
    <div className='backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[95dvh] w-full md:h-full'>
    <div className="h-full flex flex-col bg-gray-200">

    {/* Header */}
    <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500 shrink-0">
        <img
            src={assets.arrow_icon}
            onClick={() => navigate("/")}
            className="w-7 cursor-pointer"
            alt=""
        />
        <h2 className="text-xl font-semibold flex-1">
            Edit Profile
        </h2>
    </div>

    <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

            <div className="flex flex-col lg:flex-row gap-10">

                {/* Left */}
                <div className="flex flex-col items-center lg:w-72">

                    {selectedImg ? (
                        <img
                            src={URL.createObjectURL(selectedImg)}
                            className="w-44 h-44 rounded-full object-cover ring-4 ring-violet-100"
                            alt=""
                        />
                    ) : authUser?.profilePic ? (
                        <img
                            src={authUser.profilePic}
                            className="w-44 h-44 rounded-full object-cover ring-4 ring-violet-100"
                            alt=""
                        />
                    ) : (
                        <div className="w-44 h-44 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-9xl font-semibold ring-4 ring-violet-100">
                            {authUser.fullName.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <label
                        htmlFor="avatar"
                        className="mt-5 cursor-pointer text-sm font-medium text-violet-600 hover:text-violet-700 transition"
                    >
                        Change Profile Photo
                    </label>

                    <input
                        hidden
                        id="avatar"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => setSelectedImg(e.target.files[0])}
                    />
                </div>

                {/* Right */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 space-y-6"
                >

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Full Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            required
                            placeholder="Your Name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Bio
                        </label>

                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={6}
                            placeholder="Tell everyone about yourself..."
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none bg-white text-gray-900 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3.5 rounded-xl text-white font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
                            loading
                                ? "bg-violet-400 cursor-not-allowed opacity-80"
                                : "bg-linear-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 cursor-pointer"
                        }`}
                    >
                        {loading ? "Saving Changes..." : "Save Changes"}
                    </button>

                </form>

            </div>
        </div>
    </div>

</div>
</div>
</div>
  )
}

export default ProfilePage
