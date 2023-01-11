import { request, response } from 'express';

export const fileSent = (req = request, res = response, next) =>{
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg:'No files were uploaded.'
        });
    }

    next();

}