import Role from '../models/role.js';
import Usuario from '../models/usuario.js';

export const isValidRole = async ( role )=>{
    
    if(role){
        const roleExists = await Role.findOne({role});
        if(!roleExists){
            throw new Error(`The role: ${ role } doesn't exist in the data base`);
        }
    }

}

export const emailExists = async (email) =>{
    
    //verificar si correoe existe        
    const correoExiste = await Usuario.findOne({ email });

    if(correoExiste){
        throw new Error(`The email: ${ email } already exists`);
    }
}

export const userIdExists = async (id) =>{
    const userId = await Usuario.findById(id);

    if(!userId){
        throw new Error(`The id: ${id} doesn't exists in the database`)
    }
}