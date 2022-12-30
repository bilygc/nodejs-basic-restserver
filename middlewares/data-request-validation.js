import { validationResult } from "express-validator";

export const dataRequestValidation = (req, res, next) =>{
    
    const errors = validationResult(req);

    if( !errors.isEmpty() ){
        return res.status(400).json({error: errors.array()})
    }
    next();
}