import { request, response } from 'express';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcrypt';
import jwtGenerator from '../helpers/jwt-generator.js';
import googleVerify from '../helpers/google-verify.js';

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

export const googleSignIn = async(req = request, res = response) =>{
    const {id_token} = req.body;

    try{
        const { email, name, img } = await googleVerify(id_token);

        let user = await Usuario.findOne({email});
        
        if(!user){
            const data = {
                email,
                name,
                img,
                google:true,
                password:':p'
            }

            user = new Usuario(data);
            await user.save();
        }

        if(!user.status){
            res.status(401).json({
                msg:'Suspended Account, conctact the administrator'
            })
        }

        const token = await jwtGenerator(user._id);

        
        res.json({
            token,
            user
        })
    }catch(err){
        console.error(`Error en la autenticacion del token: ${err}`);
        res.status(400).json({
            msg:`Error en el token: ${err}`
        })
    }


}