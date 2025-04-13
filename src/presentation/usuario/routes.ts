import { Router } from "express";
import { UserService } from "../service/user.services";
import { UserController } from "./controller";

export class Userroutes{
    static get routes():Router{
        const router=Router()
        
        const userService=new UserService();
        const controller =new UserController(userService);

        router.post('/registerChoferAyudante',controller.registerUser);
         router.delete('/deleteUsers',controller.deleteUser)
        router.get('/getBitacora',controller.getBitacora)
        return router;
    }
}