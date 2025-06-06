import prisma from '../lib/prisma';
import { User } from "../model/model";

export const findById =  (id: number) => {
    return prisma.users.findUnique({
        where : {
            id: id
        }
    })
}


export const findByEmail =  (email: string) => {
    return  prisma.users.findUnique({
        where: {
            email: email
        }
    })
}


export const forgotPassword = async (email: string, password: string) => {
    const updatedUser = await prisma.users.update({
        where: {
            email: email,
        },
        data: {
            password: password
        }
    })

    return updatedUser
}


export const updateById = async (id:number , payload:User) => {
    const updatedUser = await prisma.users.update({
      where: {
        id: id,
      },
      data: payload
    })
  
    return updatedUser
  }

  export const createUser = (payload: User) => {
      return prisma.users.create({
        data: {
          name: payload.name || "", 
          email: payload.email,
          password: payload.password || "" 
        }
      })
  
  }
