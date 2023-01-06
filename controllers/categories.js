import { request, response } from "express";
import {Category} from '../models/index.js';

export const categoriesGet = async (req = request, res = response) => {
    
    try{
        const { limit = 5, offset = 0 } = req.query;
        const query = { status: true};

        //validate query parameters to be valid number
        const parseLimit = isNaN(parseInt(limit)) ? 5: parseInt(limit);
        const parseOffset = isNaN(parseInt(offset)) ? 0: parseInt(offset);

        //use promise all to execute both promises simultaneous
        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
            .populate('user', 'name')
            .skip(parseOffset)
            .limit(parseLimit)
        ]);

        res.json({
            total,
            categories
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:'Error fetching categories from database',
            error:err
        })
    }
};

export const categoryGet = async (req = reques, res = response) =>{

    try{
        const { id } = req.params;
        const category = await Category.findById(id).populate('user', 'name')
        res.json(category);
        
    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:'Error fetching category from database',
            error:err
        })
    }

}

export const createCategory = async (req = request, res =response ) =>{
    
    try{
        
        const name = req.body.name.toUpperCase();

        const categorySearch = await Category.findOne({name});

        if(categorySearch){
            res.status(400).json({
                msg:'The category already exists'
            })
        }

        const data = {
            name,
            user:req.authUser._id
        }

        const category = new Category(data);

        await category.save();

        res.status(201).json(category);
    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:'Error when creating category',
            error:err
        })
    }

}


export const updateCategory = async (req = request, res = response) => {
    
    try{
        
        const { id  } = req.params;
        const { status, user, ...data } = req.body;

        data.user = req.authUser._id;
        data.name = data.name.toUpperCase();

        const category  = await Category.findByIdAndUpdate(id, data, { new:true });
        
        res.json({
            msg: 'Category updated',
            category
        })

    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:'Error trying to update the category'
        })
    }
};


export const categoriesDelete = async (req = request, res = response) => {
    
    try{
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndUpdate(id, {status:false});

        res.json({
            deletedCategory
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:'Error deleting the category,  please contact the administrator'
        })
    }
};