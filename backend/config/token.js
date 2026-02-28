import jwt from "jsonwebtoken"

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET")
  }
  return process.env.JWT_SECRET
}

export const genToken = (userId) => jwt.sign({ userId }, getJwtSecret(), { expiresIn: "7d" })

export const genToken1 = (email) => jwt.sign({ email }, getJwtSecret(), { expiresIn: "1d" })
