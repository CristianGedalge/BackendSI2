import { Request,Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
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
        this.authService.registerUser(registerDto!) 
        .then((user) => res.json(user))
        .catch((error) =>this.handleError(error,res));
    }

    loginUser=(req:Request,res:Response)=>{
        const [error,loginDto]=LoginUserDto.create(req.body)
        if(error){
            res.status(400).json({error});
            return;
             
        } 
        //  res.status(200).json({ message: 'OK (temporal)' });

        this.authService.loginUser(req, res)
        .catch((error) =>this.handleError(error,res));
    
    }

    getUser=(req:Request,res:Response)=>{
        this.authService.getUsers()
        .then((user) => res.json(user))
        .catch((error) =>this.handleError(error,res));
    }


    cambiarPassword=(req:Request,res:Response)=>{
        this.authService.cambiarPassword(req.body)
        .then((user) => res.json(user))
        .catch((error) =>this.handleError(error,res));
    }
    
    
}