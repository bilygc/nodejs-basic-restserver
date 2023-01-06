import { request, response } from "express";
import mongoose from 'mongoose';
const  { Types } = mongoose;
import { User, Category, Product } from '../models/index.js';

const allowedCollections = [
    'categories',
    'products',
    'role',
    'users'
]


export const performSearch = async (req = request, res = response) =>{

    const { collection, term} = req.params;

    if(!allowedCollections.includes(collection)){
        res.status(400).json({
            msg:`The allowed collections are: ${allowedCollections}`
        })
    }

    switch(collection){
        case 'categories':
            await searchCategories(term, res);
        break;

        case 'products':
            await searchProducts(term, res);
        break;

        case 'users':
            await searchUsers(term, res);
        break;

        default:
            res.status(500).json({
                msg: `collection ${collection} still under development, contact the administrator`
            })
        break;

    }

}

const searchUsers = async (term = '', res = request) =>{

    try{
        const isMongoId = Types.ObjectId.isValid(term);
        if(isMongoId){

            const user = await User.findById(term);

            return res.json({
                results: user ? [user] : []
            })

        }

        const regex = new RegExp(term, 'i');

        const users = await User.find({
            $or:[{name:regex}, {email: regex}],
            $and:[{status:true}]
        });

        res.json({
            results:users
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            msg: 'There was an error performing the user search'
        })
    }

}

const searchCategories = async (term = '', res = request) =>{

    try{
        const isMongoId = Types.ObjectId.isValid(term);
        if(isMongoId){

            const category = await Category.findById(term);

            return res.json({
                results: category ? [category] : []
            })

        }

        const regex = new RegExp(term, 'i');

        const categories = await Category.find({
            $or:[{name:regex}],
            $and:[{status:true}]
        });

        res.json({
            results:categories
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            msg: 'There was an error performing the categories search'
        })
    }

}

const searchProducts = async (term = '', res = request) =>{

    try{
        const isMongoId = Types.ObjectId.isValid(term);
        if(isMongoId){

            const product = await Product.findById(term)
            .populate('category', 'name');

            return res.json({
                results: product ? [product] : []
            })

        }

        const regex = new RegExp(term, 'i');

        const products = await Product.find({
            $or:[{name:regex}, {description: regex}],
            $and:[{status:true}]
        }).populate('category', 'name');

        res.json({
            results:products
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            msg: 'There was an error performing the products search'
        })
    }

}