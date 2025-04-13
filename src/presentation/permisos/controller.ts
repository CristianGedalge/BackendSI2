import { CustomError } from "../../domain";
import { Request,Response } from "express";
import { UserService } from "../service/user.services";
import { PermisosService } from "../service/permiso.services";

export class PermisosController {
    constructor(
        public readonly permisoService:PermisosService
    ){}
    
    private handleError =(error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }
        return res.status(500).json({error:'Internal server error'})
    }

    getPermiso=(req:Request,res:Response) =>{
        this.permisoService.getPermiso(req.body) 
        .then((user) => res.json(user))
        .catch((error) =>this.handleError(error,res));
    }

    updatePermiso=(req:Request,res:Response) =>{
        this.permisoService.updatePermiso(req.body) 
        .then((user) => res.json(user))
        .catch((error) =>this.handleError(error,res));
    }


}