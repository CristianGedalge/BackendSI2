import { Request,Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../service/auth.services";

export class AuthController {
    constructor(
        public readonly authService:AuthService
    ){}
    
    private handleError =(error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }
        return res.status(500).json({error:'Internal server error'})
    }

    registerUser=(req:Request,res:Response) =>{
        const [error,registerDto]=RegisterUserDto.create(req.body)
        if(error){
            res.status(400).json({error});
            return;
             
        } 
        //  res.status(200).json({ message: 'OK (temporal)' });

        this.authService.registerUser(registerDto!) // ✅ este return completa la firma
        .then((user) => res.json(user))
        .catch((error) =>this.handleError(error,res));
    }

    loginUser=(req:Request,res:Response)=>{
        res.json('siuuu')
    }

    validateEmail=(req:Request,res:Response)=>{

    }
    
    
}