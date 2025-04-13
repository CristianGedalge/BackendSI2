import { CustomError, prisma } from "../../domain";
import { Request,Response } from "express";
import { UserService } from "../service/user.services";
import axios from "axios";
import { obtenerFechaactual, obtenerHoraActual } from "../../domain/config/bitacora";

export class UserController {
    constructor(
        public readonly userService:UserService
    ){}
    
    private handleError =(error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }
        return res.status(500).json({error:'Internal server error'})
    }

    registerUser=(req:Request,res:Response) =>{
        this.userService.registerChoferAyudante(req.body) 
        .then((user) => res.json(user))
        .catch((error) =>this.handleError(error,res));
    }

    deleteUser=(req:Request,res:Response) =>{
        this.userService.deleteUser(req.body) 
        .then((user) => res.json(user))
        .catch((error) =>this.handleError(error,res));
    }

    getBitacora=async (req:Request,res:Response)=>{
        try {
            const resultado = await prisma.$queryRaw`SELECT * FROM get_bitacora();`;
            res.json(resultado);
        } catch (error) {
            throw new Error(`${error}`);      
        }

    }
    static async crearBitacora(info:any){
        const {id,message}=info;
        const hora = obtenerHoraActual() ;
        const fecha = obtenerFechaactual() ;
         try {
             const ipResponse=await axios.get("https://api.ipify.org/?format=json")
             await prisma.bitacora_usuario.create({data:{
                 id_usuario:id,ip:ipResponse.data.ip,fecha,hora,tipo_sesion:`${message}`
             }}) 
         } catch (error) {
             //console.log(error);
             throw new Error(`${error}`);       
         }
    }


}