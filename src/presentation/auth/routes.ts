import { Router } from "express"
import { AuthService } from "../service/auth.services"
import { AuthController } from "./controller";


export class Authroutes{
    static get routes():Router{
        const router=Router()
        
        const authService=new AuthService();
        const controller =new AuthController(authService);
        router.post('/login',controller.loginUser)
        router.post('/register',controller.registerUser);
         router.get('/getUsers',controller.getUser)
         router.patch('/cambPassword',controller.cambiarPassword)
        return router;
    }
}