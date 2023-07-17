export interface IUser {
  id: number
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  email: string
  password: string
  posts: IPost[]
}

export interface IPost {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  content: string
  user?: User,
}

interface User {
id: number
createdAt: string
updatedAt: string
firstName: string
lastName: string
email: string
}