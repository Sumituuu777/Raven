import { generateToken } from "../lib/utils.js";
import User from "../Models/user.js";
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

//-------------------------------- Sign up ----------------------------------------------
export const signUp = async (req, res) => {
    const { fullName, email, password, bio } = req.body;
    try {

        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing details" })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.json({ success: false, message: "Account already exists for this email" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ fullName, email, password: hashedPassword, bio })

        const token = generateToken(newUser._id)

        res.json({ success: true, userData: newUser, token, message: "Account created successfully" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// ------------------------------ Login ----------------------------------------------------
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await User.findOne({ email })
        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, userData.password)

        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = generateToken(userData._id)

        res.json({ success: true, userData, token, message: "Login successfull" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })

    }
}

// controller to check if user is authenticated  
export const checkAuth = async (req, res) => {
    res.json({ success: true, user: req.user })
}

//-----------------------------Update Profile------------------------------------
export const updateProfile = async (req, res) => {
    try {
        const { fullName, bio, profilePic } = req.body;

        const userId = req.user._id
        let updatedUser

        if (!profilePic) {
            // this will return the new data
            updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { returnDocument: "after" })
            res.json({ success: true, user: updatedUser })
        } else {
            console.log("Profile pic starts with:", profilePic.substring(0, 50));
            const upload = await cloudinary.uploader.upload(profilePic, {
            resource_type: "image",
            });

            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullName }, { returnDocument: "after" })

            res.json({ success: true, user: updatedUser })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
