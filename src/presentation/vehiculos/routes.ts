import { Router } from "express";
import { VehiculoService } from "../service/vehiculo.services";
import { VehiculoController } from "./controller";
import { fileUpload } from "../middleware/image";



export class Vehiculoroutes{
    static get routes():Router{
        const router=Router()
        
        const vehiculoService=new VehiculoService();
        const controller =new VehiculoController(vehiculoService);


        router.post('/regVehiculo',controller.registerVehiculo);
        router.post('/regImg',fileUpload,controller.regImage)
        return router;
    }
}