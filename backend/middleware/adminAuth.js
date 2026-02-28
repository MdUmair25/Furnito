import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) => {
    try {
        const { token } = req.cookies || {}

    if(!token) {
        return res.status(401).json({message:"Unauthorized"})
    }
    
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

    if(!verifyToken?.email || verifyToken.email !== process.env.ADMIN_EMAIL){
         return res.status(403).json({message:"Forbidden"})
    }
    req.adminEmail = verifyToken.email

    next()
        
    } catch (error) {
      return res.status(401).json({message:"Unauthorized"})
    }


}

export default adminAuth
