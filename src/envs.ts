import dotenv from 'dotenv'
dotenv.config({path: './.env'})

export const PORT = Number(process.env.PORT) || 4000;
export const DATABASE_URL=process.env.DATABASE_URL;
export const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;