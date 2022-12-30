import { request, response } from 'express';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcrypt';
import jwtGenerator from '../helpers/jwt-generator.js';

export const login = async (req = request, res = response) =>{

    const { email, password } = req.body;

    try{
        const usuario = await Usuario.findOne({email});
        
        if(!usuario){
            return res.status(400).json({
                msg:'Error: The email doesn\'t exists'
            });
        }

        if(!usuario.status){
            return res.status(400).json({
                msg:'Error: The user doesn\'t exists or has been deleted'
            });            
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg:'Error: The password is wrong'
            });
        }

        const token = await jwtGenerator(usuario._id);


        res.json({
            usuario,
            token
        })

    }catch(err){
        console.error(`Login error: ${err}`);
        res.status(500).json({
            msg:'There was an error in authentication, please contact the admin'
        });
    }


}