import * as userRepository from '../repositories/userRepository';
import { User } from '../model/model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CustomError from '../lib/customError';
import { config } from 'dotenv';
config();


export const  findById = (id: number) => {
    return userRepository.findById(id);
}

export const findByEmail = (email: string) => {
    return userRepository.findByEmail(email);
}

export const updateById = async (id: number, payload: User) => {
    return userRepository.updateById(id, payload);
}

export const createUser = (payload: User) => {
    return userRepository.createUser(payload);
}

export const login = async (payload: User) => {
    const { email, password } = payload
  
    const foundUser = await userRepository.findByEmail(email as string)
  
    if (!foundUser) throw new CustomError(401, "Email not Registered")
  
    const isPasswordMatch = await bcrypt.compare(password as string, foundUser.password)
  
    if (!isPasswordMatch) throw new CustomError(401, "Wrong Password")
  
    const accessToken = jwt.sign(
        { 
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        },
        process.env.ACCESS_TOKEN_SECRET as  string,
        { expiresIn: '7d' }
    )

    return accessToken

}

export const register = async (payload: User) => {
    const { name, email, password,} = payload
  
  
    const hashedPassword = await bcrypt.hash(password as string, 10)
  
    const body = { name, email, password: hashedPassword }

    const createUser = await userRepository.createUser(body)

    return createUser;
    
  }