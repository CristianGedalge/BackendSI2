import { CustomError, RegisterUserDto } from "../../domain";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();
export class AuthService {

    constructor(){

    }

    public async registerUser(registerUserDto:RegisterUserDto){
        const existUser=await prisma.usuario.findFirst({where:{nombre:registerUserDto.nombre}})
        if(existUser) throw CustomError.badRequest('Correo ya existe');
        try {
            const user= await prisma.usuario.create({data:{
                ...registerUserDto
            }})
            return user;
        } catch (error) {
             throw CustomError.internalServer(`${error}`)
        }
    }
}