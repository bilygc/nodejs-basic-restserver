import express from 'express';
import cors from 'cors';
import { authRouter, usersRouter, categoriesRouter, productsRouter, searchRouter } from '../routes/index.js'

import { dbConnection } from '../db/config.db.js';

class Server{

    constructor(){
        this.port = process.env.PORT;

        this.app = express();

        //connect to db
        this.dbConnect();

        //routes
        this.path ={
            auth: '/api/auth',
            categories: '/api/categories',
            products:'/api/products',
            users:'/api/users',
            search:'/api/search'
        }

        //middlewares
        this.middlewares();

        //routes
        this.routes();
    }

    routes(){
        this.app.use(this.path.auth, authRouter);
        this.app.use(this.path.categories, categoriesRouter);
        this.app.use(this.path.products, productsRouter);
        this.app.use(this.path.search, searchRouter);
        this.app.use(this.path.users, usersRouter);
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //DIRECTORIO PUBLICO
        this.app.use( express.static('public'));

        //LECTURA Y PARSEO DE LOS PARAMETROS DEL BODY
        this.app.use( express.json() )
    }

    async dbConnect () {
        await dbConnection();
    }

    start(){
        this.app.listen(this.port, () =>{
            console.log(`Server listening on port: ${this.port}`);
        });
    }

    
}

export default Server;