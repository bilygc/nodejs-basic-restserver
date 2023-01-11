import { request, response } from "express";

export const collectionsValidation = (collections = ['users', 'products']) =>{

    
    
    return (req = request, res = response, next) =>{
        
        const  { collection } = req.params;

        if(!collections.includes(collection)){
            
            return res.status(400).json({
                msg:`${collection} is not a valid collection, valid collections: ${ collections } `
            })
        }
        next();
    }

}