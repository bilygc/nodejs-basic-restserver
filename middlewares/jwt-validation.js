import { request, response } from 'express'
import jwt from 'jsonwebtoken';
import {User} from '../models/index.js';

export const jwtValidation = async (req = request, res = response, next) =>{
    const token = req.header('x-token');

    try{

        const { uid } = jwt.verify(token, process.env.JWTPUBLICKEY)

        const usuario = await User.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg:'The user  doesn\'t exists on the db'
            })
        }

        if(!usuario.status){
            return res.status(401).json({
                msg:'The user  has been deleted from the db'
            })            
        }

        req.authUser = usuario;
        
        next();

    }catch(err){
        console.error(err);
        res.status(401).json({
            msg:
            'User token not valid or missing'
        })
    }
}