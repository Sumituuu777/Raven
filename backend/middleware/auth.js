import  jwt from "jsonwebtoken"
import User from "../Models/user.js"


export const protectRoute = async (req, res, next) => {
    const start = Date.now();

    try {
        const token = req.headers.token;

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const dbStart = Date.now();

        const user = await User.findById(decoded.userId)
            .select("-password");

        console.log(
            `protectRoute User.findById: ${Date.now() - dbStart}ms`
        );

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        console.log(
            `protectRoute total: ${Date.now() - start}ms`
        );

        next();

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};
