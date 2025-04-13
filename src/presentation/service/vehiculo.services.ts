import { CustomError,prisma } from "../../domain";
import { Request,Response } from "express";
export class VehiculoService {

    constructor(){

    }

    public async getVehiculo(req:Request,res:Response){
        try {
            const vehiculo=await prisma.vehiculo.findMany({
                include:{
                    tipo_vehiculo:true
                }
            });

            const formateo=vehiculo.map((v)=>({
                id:v.id,
                tipo:v.tipo_vehiculo?.nombre,
                peso:v.peso,
                kilometraje:v.coste_kilometraje
            }))
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
       
    }
    public async registerVehiculo(req:Request,res:Response){
        try {
            const {placa,id_tipo,peso,estado,coste_kilometraje}=req.body
            const vehiculo=prisma.vehiculo.create({data:{placa,tipo_vehiculo_id:id_tipo,peso,estado:estado,coste_kilometraje}})
            return vehiculo;
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    public async guardarImagen(req:Request,res:Response){
        if (!req.file || !req.file.path) {
            throw CustomError.badRequest('La imagen es obligatoria');
        }
        const imagen=await prisma.imagen.create({data:{
            vehiculo_id:10,
            dir_imagen:req.file?.path
        }})
        return imagen;
    }


}