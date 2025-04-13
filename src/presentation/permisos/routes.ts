import { Router } from "express";

import { PermisosService } from "../service/permiso.services";
import { PermisosController } from "./controller";

export class Permisosroutes{
    static get routes():Router{
        const router=Router()
        
        const permisoService=new PermisosService();
        const controller =new PermisosController(permisoService);


        router.patch('/updatePermiso',controller.updatePermiso);
        router.get('/getPermisos',controller.getPermiso)
        return router;
    }
}