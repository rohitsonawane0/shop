declare namespace Express {
  export interface Request {
    currentUser: UserPayload
  }
  //   export interface Response {
  //     user: any
  //   }
}
interface UserPayload {
  email: string
  id: number
  firstName: string
  lastName: string
  avatar: string
  role: 'USER' | 'ADMIN' // Assuming role can be either "USER" or "ADMIN"
}
