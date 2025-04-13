import { CustomError } from "../errors/custom.errors";

export class UserEntity{
    constructor(
        public nombre:string,
        public email:string,
        public password:string,
        public rol_id:number
    ){}

    static fromObject (object:{ [key:string]:any}){
        const {nombre,email,password,rol_id}=object;

        if(!nombre) throw CustomError.badRequest('Missing nombre');
        if(!email) throw CustomError.badRequest('Missing email');
        if(!password) throw CustomError.badRequest('Missing password');

        return new UserEntity(nombre,email,password,rol_id)
    }
}