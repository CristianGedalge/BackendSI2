import { CustomError, prisma } from "../../domain";
import { Request,Response } from "express";
import { UserService } from "../service/user.services";
import axios from "axios";
import { obtenerFechaactual, obtenerHoraActual } from "../../domain/config/bitacora";
import { VehiculoService } from "../service/vehiculo.services";

export class VehiculoController {
    constructor(
        public readonly vehiculoService:VehiculoService
    ){}
    
    private handleError =(error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }
        return res.status(500).json({error:'Internal server error'})
    }

    
    registerVehiculo=(req:Request,res:Response) =>{
        this.vehiculoService.registerVehiculo(req,res)
       . catch((error) =>this.handleError(error,res));
    }
    
    regImage=(req:Request,res:Response)=>{
        this.vehiculoService.guardarImagen(req,res)
        .catch((error) =>this.handleError(error,res));
    }

    getVehiculo=async (req:Request,res:Response)=>{
        this.vehiculoService.getVehiculo(req,res)
       . catch((error) =>this.handleError(error,res));

    }
    


}