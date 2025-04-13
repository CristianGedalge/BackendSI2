import { CustomError,prisma } from "../../domain";
export class PermisosService {

    constructor(){

    }

    public async getPermiso(obj:any){

        console.log(obj)
        try {
            const permiso=await prisma.rol_permiso.findMany({where: {
                rol_id: obj.id,
                estado: 1
              },
              include: {
                permiso: true
              }})

            const formateo=permiso.map(p=>({
                rol_id: p.rol_id,
                permiso_id: p.permiso_id,
                nombre_permiso: p.permiso.nombre,
                estado:p.estado
            }))
            return formateo;

        } catch (error) {
             throw CustomError.internalServer(`${error}`)
        }
    }
    public async updatePermiso(obj:any){
        const {permiso,rol:rol_id}=obj;

        try {
            for (const { id, estado } of permiso) {
                await prisma.rol_permiso.update({
                    where: { rol_id_permiso_id:{
                        rol_id,
                        permiso_id:id
                    }},
                    data:{
                        estado:estado
                    }}
                );
            }
            return 'Permisos actuliazados'
        } catch (error) {
             throw CustomError.internalServer(`${error}`)
        }
    }


}