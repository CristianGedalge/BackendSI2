import { CustomError,prisma } from "../../domain";
import bcrypt from "bcryptjs"
export class UserService {

    constructor(){

    }
    public async registerChoferAyudante(obj:any){
        const existUser=await prisma.usuario.findFirst({where:{email:obj.email}})
        if(existUser) throw CustomError.badRequest('Correo ya existe');

        const {nombre,email,password,rol_id,ci,direccion}=obj;
        const hashPassword=await bcrypt.hash(password,10);

        try {

            const user= await prisma.usuario.create({data:{
                nombre,email,password:hashPassword,rol_id
            }})
            if(rol_id==2){ //Chofer
                const chofer=await prisma.chofer.create({data:{
                    id_chofer:user.id,ci,direccion,
                }})
            }
            if(rol_id==4){ //Ayudante
                const chofer=await prisma.ayudante.create({data:{
                    id_ayudante:user.id,ci,direccion,
                }})
            }
            return user;
        } catch (error) {
             throw CustomError.internalServer(`${error}`)
        }
    }


    public async deleteUser(req:any){
        const id = parseInt(req.params.id);

  try {
    const usuario = await prisma.usuario.update({
      where: { id },
      data: { estado:0 }
    });

    return ({ message: 'Usuario eliminado lógicamente', usuario });
  } catch (error) {
    console.error(error);
    throw CustomError.internalServer(`${error}`)
  }
    }
}