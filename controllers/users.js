import { request, response } from "express";
import bcrypt from 'bcrypt';
import {User} from '../models/index.js';

export const usersGet = async (req = request, res = response) => {
    
    try{
        
        const { limit = 5, offset = 0 } = req.query;
        const query = { status: true};

        //validate query parameters to be valid number
        const parseLimit = isNaN(parseInt(limit)) ? 5: parseInt(limit);
        const parseOffset = isNaN(parseInt(offset)) ? 0: parseInt(offset);

        //use promise all to execute both promises simultaneous
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
            .skip(parseOffset)
            .limit(parseLimit)
        ]);

        res.json({
            total,
            users
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            msg: 'Error fetching users, contact the administrator'
        })
    }
};

export const usersPost = async (req, res) => {    
    
    try{
        
        const { name, email, password, role } = req.body;    
        
        const usuario = new User({
            name,
            email,
            password,
            role
        });
    
        //hashear contraseña
        const saltRounds = 10;
    
        const salt = bcrypt.genSaltSync(saltRounds);//default param bcrypt.genSaltSync(10) can be more than 10 for more security
        usuario.password = bcrypt.hashSync(password, salt);
        
        //guardar usuario/datos        
        await usuario.save();
        
        res.json({
            msg: 'User saved succesfully',
            data:usuario
        })
    }catch(err){
        res.status(400).json({
            msg: `there was an error in the request: ${err}`
        });
    }
    
};

export const usersPut = async (req, res) => {
    
    try{
        const { id  } = req.params;
        const {_id, password, google, ...rest } = req.body;

        if( password ){
            //hashear contraseña
            const saltRounds = 10;
        
            const salt = bcrypt.genSaltSync(saltRounds);//default param bcrypt.genSaltSync(10) can be more than 10 for more security
            rest.password = bcrypt.hashSync(password, salt);        
        }

        const user  = await User.findByIdAndUpdate(id, rest, { new: true });
        
        res.json({
            msg: 'User updated',
            user
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:'Error updating the user, contact the administrator'
        })
    }
};

export const usersDelete = async (req, res) => {
    
    try{
        const { id } = req.params;

        const deletedUser = await User.findByIdAndUpdate(id, {status:false});

        res.json({
            deletedUser
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            msg: 'Error deleting the user, contact the administrator'
        })
    }
};