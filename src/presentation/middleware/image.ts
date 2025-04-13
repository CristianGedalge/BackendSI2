import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {v2 as cloudinary} from 'cloudinary'


cloudinary.config({
    cloud_name:'da6k5ykfs',
    api_key: '367696499464279',
    api_secret: '8LFPq-JEgY2KIavvc9e6Bw518yE',
})

const guardarImage= new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        //@ts-ignore
        folder: 'bunker', // Carpeta donde se guardarán las imágenes
        allowed_formats: ['jpg', 'jpeg', 'png'], // Tipos de archivos permitidos
        public_id: (req, file) => `imagen_${Date.now()}`, // Nombre único para cada imagen
    },
})

export const fileUpload=multer({
    storage:guardarImage
}).single('imagen')