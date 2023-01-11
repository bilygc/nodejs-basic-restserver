import { request, response } from "express";
import {Product} from '../models/index.js';
import { capitalizeString } from "../helpers/index.js";

export const getProducts = async (req = request, res = response) => {
    
    try{
        const { limit = 5, offset = 0 } = req.query;
        const query = { status: true};

        //validate query parameters to be valid number
        const parseLimit = isNaN(parseInt(limit)) ? 5: parseInt(limit);
        const parseOffset = isNaN(parseInt(offset)) ? 0: parseInt(offset);

        //use promise all to execute both promises simultaneous
        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(parseOffset)
            .limit(parseLimit)
        ]);

        res.json({
            total,
            products
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:'Error fetching products from database',
            error:err
        })
    }
};

export const getProduct = async (req = reques, res = response) =>{

    try{
        const { id } = req.params;
        
        const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');

        res.json(product);
        
    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:'Error fetching product from database',
            error:err
        })
    }

}

export const createProduct = async (req = request, res =response ) =>{
    
    try{
        
        const { name, price, category, description = '' } = req.body;

        const data = {
            name:capitalizeString(name),
            category,
            description,
            price,
            user:req.authUser._id
        }

        const product = new Product(data);

        await product.save();

        res.status(201).json(product);

    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:'Error when adding product',
            error:err
        })
    }

}


export const updateProduct = async (req = request, res = response) => {
    
    try{
        
        const { id  } = req.params;
        const { status, user,...data } = req.body;

        data.user = req.authUser._id;
        
        if(data.name){
            data.name = capitalizeString(data.name);
        }

        const product  = await Product.findByIdAndUpdate(id, data, { new:true });
        
        res.json({
            msg: 'Product updated',
            product
        })

    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:'Error trying to update the product'
        })
    }
};


export const deleteProduct = async (req = request, res = response) => {
    
    try{
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndUpdate(id, {status:false});

        res.json({
            msg:'Product deleted',
            deletedProduct
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:'Error deleting the product,  please contact the administrator'
        })
    }
};