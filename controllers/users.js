import { request, response } from "express";
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import Usuario from '../models/usuario.js';

export const usersGet = async (req = request, res = response) => {
    
    const { limit = 5, offset = 0 } = req.query;
    const query = { status: true};

    //validate query parameters to be valid number
    const parseLimit = isNaN(parseInt(limit)) ? 5: parseInt(limit);
    const parseOffset = isNaN(parseInt(offset)) ? 0: parseInt(offset);

    //use promise all to execute both promises simultaneous
    const [total, users] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(parseOffset)
        .limit(parseLimit)
    ]);

    res.json({
        total,
        users
    })
};

export const usersPost = async (req, res) => {    
    
    try{
        
        const { name, email, password, role } = req.body;    
        
        const usuario = new Usuario({
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
    
    const { id  } = req.params;
    const {_id, password, google, ...rest } = req.body;

    if( password ){
        //hashear contraseña
        const saltRounds = 10;
    
        const salt = bcrypt.genSaltSync(saltRounds);//default param bcrypt.genSaltSync(10) can be more than 10 for more security
        rest.password = bcrypt.hashSync(password, salt);        
    }

    const user  = await Usuario.findByIdAndUpdate(id, rest);
    
    res.json({
        msg: 'User updated',
        user
    })
};

export const usersPatch = (req, res) => {
    res.json({
        msg: 'Hello Patch - controller'
    })
};

export const usersDelete = async (req, res) => {
    
    const { id } = req.params;

    const deletedUser = await Usuario.findByIdAndUpdate(id, {status:false});

    res.json({
        msg:`User with Id. ${deletedUser._id} and name: ${deletedUser.name} was deleted`
    });
};