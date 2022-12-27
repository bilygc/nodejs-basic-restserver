import { request, response } from "express";

export const usersGet = (req = request, res = response) => {
    
    const { q, name = 'no name', page = 1, limit } = req.query;

    res.json({
        msg: 'Hello Get - controller',
        q,
        name,
        page,
        limit
    })
};

export const usersPost = (req, res) => {
    
    const { name, age } = req.body;
    
    res.json({
        msg: 'Hello Post - controller',
        name,
        age
    })
};

export const usersPut = (req, res) => {
    
    const { id  } = req.params;
    
    res.json({
        msg: 'Hello Put - controller',
        id
    })
};

export const usersPatch = (req, res) => {
    res.json({
        msg: 'Hello Patch - controller'
    })
};

export const usersDelete = (req, res) => {
    res.json({
        msg: 'Hello Delete - controller'
    })
};