import { CustomError } from "../errors/custom.errors";

export class UserEntity{
    constructor(
        public nombre:string,
        public email:string,
        public password:string,
    ){}

    static fromObject (object:{ [key:string]:any}){
        const {nombre,email,password}=object;

        if(!nombre) throw CustomError.badRequest('Missing nombre');
        if(!email) throw CustomError.badRequest('Missing email');
        if(!password) throw CustomError.badRequest('Missing password');

        return new UserEntity(nombre,email,password)
    }
}