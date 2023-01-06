import {User, Category, Product, Role} from '../models/index.js';
import { capitalizeString } from './handy.js';

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
    const correoExiste = await User.findOne({ email });

    if(correoExiste){
        throw new Error(`The email: ${ email } already exists`);
    }
}

export const userIdExists = async (id) =>{
    const userId = await User.findById(id);

    if(!userId){
        throw new Error(`The id: ${id} doesn't exists in the database`)
    }
}

export const categoryIdExists = async (id) =>{
    const category = await Category.findById(id);

    if(!category){
        throw new Error(`The id: ${id} doesn't exists in the database`)
    }
}

export const productNameExists = async (name) =>{
    
    name = capitalizeString(name);
    const product = await Product.findOne({name});

    if(product){
        throw new Error(`The product name: ${name} already exists in the database`)
    }
}

export const productIdExists = async (id) =>{
    const product = await Product.findById(id);

    if(!product){
        throw new Error(`The product id: ${id} doesn't exist in the database `);
    }
}