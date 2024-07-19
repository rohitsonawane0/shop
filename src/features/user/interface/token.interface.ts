export interface TokenInput {
  id: number
  email: string
  firstName: string
  lastName: string
  avatar: string
  role: 'USER' | 'ADMIN' | 'MERCHANT' // Assuming roles can be either USER or ADMIN, adjust as needed
}
