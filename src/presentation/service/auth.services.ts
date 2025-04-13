import { CustomError, LoginUserDto, prisma, RegisterUserDto } from "../../domain";

import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "../../envs";
import { AuthController } from "../auth/controller";
import { UserController } from "../usuario/controller";
import { Request,Response } from "express";
export class AuthService {

    constructor(){

    }

    public async registerUser(registerUserDto:RegisterUserDto){
        console.log(registerUserDto);
        const existUser=await prisma.usuario.findFirst({where:{email:registerUserDto.email}})
        if(existUser) throw CustomError.badRequest('Correo ya existe');

        const {nombre,email,password,rol_id,telefono}=registerUserDto;
        const hashPassword=await bcrypt.hash(password,10);

        try {

            const user= await prisma.usuario.create({data:{
                nombre,email,password:hashPassword,rol_id
            }})
            const telef=await prisma.telefono.create({data:{
                id_usuario:user.id,num:telefono
            }})
            if(rol_id==1){//Administrador registrar en tabla
                const admin=await prisma.administrador.create({data:{id_admin:user.id}})
            }
            if(rol_id==2){//Cliente registrar en tabla 
                const cliene=await prisma.cliente.create({data:{id_usuario:user.id}})
            }
            UserController.crearBitacora({id:user.id,message:'registro'})
            return user;
        } catch (error) {
             throw CustomError.internalServer(`${error}`)
        }
    }


    public async loginUser(req:Request,res:Response){
        const [error, loginDto] = LoginUserDto.create(req.body);
        if (error) {
             res.status(400).json({ error });
        }
        const {email,password}=req.body;

        const existUser=await prisma.usuario.findFirst({
            where:{email},
            include:{rol:true}
        });
        if(!existUser) throw CustomError.badRequest('Correo no existe');

        const comparar= bcrypt.compareSync(password,existUser.password)
        if(!comparar) throw CustomError.badRequest('Contraseña no valida');
        const token= jwt.sign(
            {
              id: existUser.id,
              email:existUser.email,
              rol:existUser.rol?.nombre,
            },
            JWT_SECRET_KEY!,
            {
              algorithm: "HS256",
              expiresIn: "1h",
            }
          );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // ponelo en true si usás HTTPS
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000 // 1 hora
          });
        
        if(!token )  throw CustomError.internalServer('Error al generar token')

        UserController.crearBitacora({id:existUser.id,message:'inicio sesion'})
        return res.json({existUser,token});      
    }

    // obtener todos los usuarios
    public async getUsers(){

            const usuarios = await prisma.usuario.findMany({
              include: {
                rol: true
              }
            });
        
            const usuariosFormateados = usuarios.map((u) => ({
              id: u.id,
              nombre: u.nombre,
              email: u.email,
              rol: u.rol?.nombre
            }));
        
            return usuariosFormateados;
    }


    public async cambiarPassword(req:any){
        const  {password1,password2,id}=req
        if(password1!=password2) throw CustomError.badRequest('Contraseñas no coinciden')
        const hashPassword=await bcrypt.hash(password1,10);
        const user=await prisma.usuario.update({
            where:{id},
            data:{
                password:hashPassword
            }
        })
        return 'contraseña modificada'
    }

    public async logout(req:any){

    }
    public validateToken(token:string){
        return new Promise((resolve)=>{
            jwt.verify(token,JWT_SECRET_KEY!,(err,decoded)=>{
                if(err)return resolve(null);
                resolve(decoded);
            })
        })
    }


}