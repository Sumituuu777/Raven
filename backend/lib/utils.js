import jwt from "jsonwebtoken"

export const generateToken = (userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET)
    return token
}
export const extractTags = (text) => {
    const matches = text.match(/#[a-zA-Z0-9_]+/g) || [];
    return [...new Set(matches.map(tag => tag.slice(1).toLowerCase()))];
};