declare namespace Express {
  export interface Request {
    currentUser: UserPayloadInt
    files: IFile[]
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
  role: 'USER' | 'ADMIN' | 'MERCHANT' // Assuming role can be either "USER" or "ADMIN"
}

interface IFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}
