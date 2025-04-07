
export class RegisterUserDto{
    private constructor(
        public nombre:string,
        public email:string,
        public password:string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterUserDto?]{
        const {nombre,email,password}=object;
        if(!nombre) return ['Missing name'];

        if(!email) return ['Missing email'];
        if(!password)return ['Missing password'];
        return [undefined,new RegisterUserDto(nombre,email,password)];

    }
}