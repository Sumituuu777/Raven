import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.userId;

        next();

    } catch (error) {
        console.log(error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired"
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};
