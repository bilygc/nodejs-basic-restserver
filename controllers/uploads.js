import * as dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { v2 } from 'cloudinary';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from 'fs';
import { request, response } from 'express'
import  { uploadFiles } from '../helpers/index.js';
import { User, Product } from '../models/index.js'

const cloudinary = v2;
cloudinary.config({
    cloud_name:'dgzqbts1v',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadFile = async (req= request, res = response) =>{
    
    try{
    
        //const filePath = await uploadFiles(req.files.archivo,'txts', ['txt', 'doc', 'md']);
        const filePath = await uploadFiles(req.files.archivo,'imgs');
    
        res.json({ filePath });
    }catch(error){
        console.error(error);
        res.status(400).json({
            msg:`Error uploading the file, contact the administrator: ${error}`
        })
    }

};

export const updateImage = async (req = request, res = response) =>{

    
    try{
        
        const { collection } = req.params;
        let model;

        switch (collection) {
            case 'users':
                //req.model set it in the middleware checkIdByCollection
                model = new User(req.model);
            break;

            case 'products':
                //req.model set it in the middleware checkIdByCollection
                model = new Product(req.model);
            break;
        
            default:
                break;
        }
    
        if(model.img){
            const filePath = path.join(__dirname,'../uploads/', collection, model.img)
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath);
            }
        }
        
        model.img = await uploadFiles(req.files.archivo, collection);
        await model.save();
    
        res.json(model);
    }catch(error){
        console.error(error);
        res.status(500).json({
            msg:`Error trying to update de image: ${error}`
        })
    }

};

export const updateCloudinaryImage = async (req = request, res = response) =>{

    
    try{
        
        const { collection } = req.params;
        let model;

        switch (collection) {
            case 'users':
                //req.model set it in the middleware checkIdByCollection
                model = new User(req.model);
            break;

            case 'products':
                //req.model set it in the middleware checkIdByCollection
                model = new Product(req.model);
            break;
        
            default:
                break;
        }
    
        if(model.img){
            
            const arrImgName = model.img.split('/');
            const [public_id] = arrImgName[ arrImgName.length -1 ].split('.');

            cloudinary.uploader.destroy(public_id);
        }
        
        
        const { tempFilePath } = req.files.archivo;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath, {
            folder:collection
        });
        cloudinary.uploader.upload()

        model.img = secure_url;
        await model.save();
    
        res.json(model);
    }catch(error){
        console.error(error);
        res.status(500).json({
            msg:`Error trying to update de image: ${error}`
        })
    }

};

//Return file image
export const getImage = async (req = request, res = response) =>{
    
    try{
        
        const { collection } = req.params;
        const { model } = req;
    
        if(model.img){
            const filePath = path.join(__dirname,'../uploads/', collection, model.img)
            if(fs.existsSync(filePath)){
                return res.sendFile(filePath);
            }
        }
    
        const filePath = path.join(__dirname,'../assets/no-image.jpg');
        return res.sendFile(filePath);
        

    }catch(error){
        console.error(error);
        res.status(500).json({
            msg:`Error trying to update de image: ${error}`
        })
    }

}

//return url image
export const getUrlImage = async (req = request, res = response) =>{
    
    try{
        
        const { collection } = req.params;
        const { model } = req;
    
        if(model.img){
            
            return res.json({
                name:model.name,
                uid:model._id,
                img:model.img
            })
        }
    
        const filePath = path.join(__dirname,'../assets/no-image.jpg');
        return res.sendFile(filePath);
        

    }catch(error){
        console.error(error);
        res.status(500).json({
            msg:`Error trying to update de image: ${error}`
        })
    }

}