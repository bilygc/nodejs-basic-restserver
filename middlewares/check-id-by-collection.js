import { request, response } from 'express';
import { User, Product } from '../models/index.js';

export const checkIdByCollection = async (req = request, res = response, next) =>{

    try{
        
        const { collection, id } = req.params;
    
        let model;        

        switch(collection){
            case 'users':
                
                model = await User.findById(id);
                
                if(!model){
                    return res.status(400).json({
                        msg:`The user with the id: ${id} doesn't exists in the database`
                    })
                }
            break;
    
            case 'products':
                model = await Product.findById(id)
                .populate('user', 'name')
                .populate('category', 'name');
                if(!model){
                    return res.status(400).json({
                        msg:`The product with the id: ${id} doesn't exists in the database`
                    })                
                }
            break;
    
            default:
                return res.status(500).json({
                    msg:`The service ${collection} isn't ready yet, contact the administrator`
                })
            break;
        }

        req.model = model;

        next();

    }catch(error){
        console.error(error);
        return res.status(500).json({
            msg:`Error trying to check the id by collection: ${error}`
        })
    }
};