
export class RegisterUserDto{
    private constructor(
        public nombre:string,
        public email:string,
        public password:string,
        public rol_id:number,
        public telefono:string
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterUserDto?]{
        console.log(object)
        const {nombre,email,password,rol_id,telefono}=object;
        if(!nombre) return ['Missing name'];
        
        if(!email) return ['Missing email'];
        if(!password)return ['Missing password'];
        if(!rol_id)return ['Missing rol'];
        return [undefined,new RegisterUserDto(nombre,email,password,rol_id,telefono)];

    }
}