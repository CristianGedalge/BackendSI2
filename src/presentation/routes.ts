import { Router } from 'express';
import { Authroutes } from './auth/routes';
import { Permisosroutes } from './permisos/routes';
import { Userroutes } from './usuario/routes';
import { Vehiculoroutes } from './vehiculos/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', Authroutes.routes);
    router.use('/api/usuario',Userroutes.routes)
    router.use('/api/permiso',Permisosroutes.routes)
    router.use('/api/veh',Vehiculoroutes.routes)



    return router;
  }


}