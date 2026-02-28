import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
dotenv.config()
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

let port = process.env.PORT || 6000

let app = express()

app.use(express.json({ limit: "1mb" }))
app.use(cookieParser())

const configuredOrigins = [
  process.env.CORS_ORIGIN,
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL
]
  .filter(Boolean)
  .flatMap((value) => value.split(","))
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean)

const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://furnito-admin.onrender.com",
  "https://furnito-frontend.onrender.com"
]

const allowedOriginSet = new Set([...defaultOrigins, ...configuredOrigins])

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }

    const normalizedOrigin = origin.replace(/\/$/, "")
    if (allowedOriginSet.has(normalizedOrigin)) {
      return callback(null, true)
    }

    return callback(new Error("CORS origin not allowed"))
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)




app.listen(port,()=>{
    connectDb()
    console.log(`Server running on port ${port}`)
})


