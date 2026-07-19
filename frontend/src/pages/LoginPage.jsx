import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/authContext'

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [bio, setbio] = useState("")
  const [isDataSubmitted, setisDataSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = async (event) => {
  event.preventDefault()

  // First step of signup (name/email/password)
  if (currentState === "Sign up" && !isDataSubmitted) {
    setisDataSubmitted(true)
    return
  }

  if (loading) return

  try {
    setLoading(true)

    await login(
      currentState === "Sign up" ? "signup" : "login",
      { fullName, email, password, bio }
    )
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">

    <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">

        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-violet-500 to-violet-700 text-white flex-col items-center justify-center p-10">

            <img
                src={assets.raven_logo}
                alt=""
                className="w-96 mb-8 rounded-lg"
            />

            <h1 className="text-4xl font-bold">
                Welcome to Raven
            </h1>

            <p className="mt-4 text-center text-violet-100 leading-relaxed max-w-sm">
                Connect with friends, chat in real-time and share your thoughts through beautiful blogs.
            </p>

        </div>

        {/* Right Section */}
        <div className="flex-1 p-8 md:p-10">

            <form
                onSubmit={onSubmitHandler}
                className="space-y-6"
            >

                <div className="flex items-center justify-between">

                    <h2 className="text-3xl font-bold text-gray-800">
                        {currentState}
                    </h2>

                    {isDataSubmitted && (
                        <img
                            src={assets.arrow_icon}
                            onClick={() => setisDataSubmitted(false)}
                            className="w-6 cursor-pointer"
                            alt=""
                        />
                    )}

                </div>

                {currentState === "Sign up" && !isDataSubmitted && (

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Full Name
                        </label>

                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            type="text"
                            placeholder="John Doe"
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        />
                    </div>

                )}

                {!isDataSubmitted && (
                    <>

                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Email
                            </label>

                            <input
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                type="email"
                                placeholder="john@example.com"
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Password
                            </label>

                            <input
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                            />
                        </div>

                    </>
                )}

                {currentState === "Sign up" && isDataSubmitted && (

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Bio
                        </label>

                        <textarea
                            value={bio}
                            onChange={(e) => setbio(e.target.value)}
                            rows={5}
                            placeholder="Tell everyone a little about yourself..."
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                        />
                    </div>

                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 rounded-xl text-white font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
                        loading
                            ? "bg-violet-400 cursor-not-allowed opacity-80"
                            : "bg-linear-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 cursor-pointer"
                    }`}
                >
                    {loading
                        ? currentState === "Sign up"
                            ? "Creating Account..."
                            : "Logging In..."
                        : currentState === "Sign up"
                            ? isDataSubmitted
                                ? "Finish Signup"
                                : "Continue"
                            : "Login"}
                </button>

                {currentState === "Sign up" && (

                    <label className="flex items-start gap-3 text-sm text-gray-600">

                        <input
                            type="checkbox"
                            required
                            className="mt-1 accent-violet-600"
                        />

                        <span>
                            I agree to the Terms of Use and Privacy Policy.
                        </span>

                    </label>

                )}

                <p className="text-center text-sm text-gray-600">

                    {currentState === "Sign up"
                        ? "Already have an account?"
                        : "Don't have an account?"}

                    <span
                        onClick={() => {
                            setCurrentState(
                                currentState === "Sign up"
                                    ? "Login"
                                    : "Sign up"
                            );
                            setisDataSubmitted(false);
                        }}
                        className="ml-2 font-semibold text-violet-600 hover:text-violet-700 cursor-pointer"
                    >
                        {currentState === "Sign up"
                            ? "Login"
                            : "Sign Up"}
                    </span>

                </p>

            </form>

        </div>

    </div>

</div>
  )
}

export default LoginPage
