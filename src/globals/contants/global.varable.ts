import dotenv from 'dotenv'
dotenv.config()
export const { JWT_SECRET, PORT } = process.env
console.log(JWT_SECRET)
