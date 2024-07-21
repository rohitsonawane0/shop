import dotenv from 'dotenv'
dotenv.config()
export const { AWS_ACCESS_KEYS, AWS_SECRET, AWS_BUCKET, JWT_SECRET, PORT } = process.env
