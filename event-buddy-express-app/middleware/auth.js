import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const authenticateToken = (req,res,next) => {
    const token = req.header("Authorization");

    if(!token){
        return res.status(403).json({message:"Acces denied"});
    }

    try{
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid or expired token"});
    }
}