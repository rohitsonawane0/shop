export interface User {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  avatar: string
  role: 'USER' | 'ADMIN' | 'MERCHANT' // Assuming roles can be either USER or ADMIN, adjust as needed
  isActive: boolean
  isDeleted: boolean
  createdAt: string // or Date, depending on how you handle dates in your application
  updatedAt: string // or Date, depending on how you handle dates in your application
}
