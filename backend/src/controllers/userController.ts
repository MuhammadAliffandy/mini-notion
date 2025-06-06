import * as userService from '../services/userService';
import { Request, Response , NextFunction  } from 'express';
import CustomResponse from '../lib/customResponse';
import errorHandler from '../lib/errorHandler';


export const registerHandler = async (req: Request , res: Response ) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json(new CustomResponse("FAIL", "All fields are required"));
            return
        }

        const payload = {
            name : name,
            email : email,
            password : password
        }

        const user = await userService.register(payload);
        res.status(200).json(new CustomResponse("OK", `Registration successful for ${user.name}`));
        return;
        
    } catch (err: Error | any) {
        errorHandler(err, res);
    }
}

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json(new CustomResponse("FAIL", "Email and Password are required"));
            return
        }

        const payload = {
            email: email,
            password: password
        }

        const user = await userService.login(payload);
        if (!user) {
            res.status(401).json(new CustomResponse("FAIL", "Invalid credentials"));
            return
        }

        res.status(200).json(new CustomResponse("OK", "Login successful" , { accessToken: user }));
        return;
        
    } catch (err: Error | any) {
        errorHandler(err, res);
    }
}

export const logoutHandler = (req:Request, res:Response) => {
   
    const token = req.cookies?.token;
    console.log("Logout token: ", token);
    
    if (!token) {
        res.sendStatus(204)
        return;
    }

    res.clearCookie('token', { httpOnly: true })
  
    res.status(200).json(new CustomResponse("OK", "Logout Successfully"))
    return ;
}

export const findUserByEmail = async (req: Request, res: Response) => {
    const email = req.body.email;

    try {
        const user = await userService.findByEmail(email);

        if (!user) {
            res.status(404).json(new CustomResponse("FAIL", "User not found"));
            return
        }   

        res.status(200).json(new CustomResponse("OK", "User fetched successfully", user));
        return
    } catch (err: Error | any) {
        errorHandler(err, res);
    }
}

export const findUserById = async (req: Request, res: Response) => {
    const userId = res.locals.user.id;

    try {
        const user = await userService.findById(userId);

        if (!user) {
            res.status(404).json(new CustomResponse("FAIL", "User not found"));
            return
        }

        res.status(200).json(new CustomResponse("OK", "User fetched successfully", user));
        return
    } catch (err: Error | any) {
        errorHandler(err, res);
    }
}

