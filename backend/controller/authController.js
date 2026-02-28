import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken, genToken1 } from "../config/token.js";
import { getCookieOptions } from "../config/cookie.js";

const USER_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000
const ADMIN_COOKIE_MAX_AGE = 24 * 60 * 60 * 1000

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
})


export const registration = async (req,res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" })
    }

    const normalizedEmail = validator.normalizeEmail(String(email))?.toLowerCase()
    if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
      return res.status(400).json({ message: "Enter valid Email" })
    }

    if (String(password).length < 8) {
      return res.status(400).json({ message: "Enter Strong Password" })
    }

    const existUser = await User.findOne({ email: normalizedEmail })
    if(existUser){
        return res.status(400).json({message:"User already exist"})
    }
    const hashPassword = await bcrypt.hash(password,10)

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashPassword
    })
    const token = genToken(user._id)
    res.cookie("token", token, getCookieOptions(USER_COOKIE_MAX_AGE))
    return res.status(201).json(sanitizeUser(user))
  } catch (error) {
    return res.status(500).json({ message: "registration error" })
  }
    
}


export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = validator.normalizeEmail(String(email || ""))?.toLowerCase()
        if (!normalizedEmail || !password) {
          return res.status(400).json({ message: "Email and password are required" })
        }

        const user = await User.findOne({ email: normalizedEmail }) 
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,user.password || "")
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const token = genToken(user._id)
        res.cookie("token", token, getCookieOptions(USER_COOKIE_MAX_AGE))
        return res.status(200).json(sanitizeUser(user))

    } catch (error) {
      return res.status(500).json({ message: "Login error" })
        
    }
    
}
export const logOut = async (req,res) => {
try {
    res.clearCookie("token", getCookieOptions(USER_COOKIE_MAX_AGE))
    return res.status(200).json({message:"logOut successful"})
} catch (error) {
    return res.status(500).json({message:"LogOut error"})
}
    
}


export const googleLogin = async (req,res) => {
    try {
        let { name, email } = req.body;
        const normalizedEmail = validator.normalizeEmail(String(email || ""))?.toLowerCase()
        if(!normalizedEmail || !validator.isEmail(normalizedEmail)){
            return res.status(400).json({message:"Valid Google email is required"})
        }
        if(!name || !name.trim()){
            name = normalizedEmail.split("@")[0]
        }
         let user = await User.findOne({ email: normalizedEmail }) 
        if(!user){
          user = await User.create({
            name: String(name).trim(),
            email: normalizedEmail
        })
        }
       
        const token = genToken(user._id)
        res.cookie("token", token, getCookieOptions(USER_COOKIE_MAX_AGE))
        return res.status(200).json(sanitizeUser(user))

    } catch (error) {
      return res.status(500).json({message:"googleLogin error"})
    }
    
}


export const adminLogin = async (req,res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" })
        }

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
          const token = genToken1(email)
          res.cookie("token", token, getCookieOptions(ADMIN_COOKIE_MAX_AGE))
          return res.status(200).json({ message: "Admin login successful" })
        }
        return res.status(401).json({message:"Invalid credentials"})

    } catch (error) {
      return res.status(500).json({message:"AdminLogin error"})
        
    }
    
}

