import express from 'express';
import cors from 'cors';
import userRouter from '../routes/users.js';
import authRouter from '../routes/auth.js';

import { dbConnection } from '../db/config.db.js';

class Server{

    constructor(){
        this.port = process.env.PORT;

        this.app = express();

        //connect to db
        this.dbConnect();

        //routes
        this.userspath= '/api/usuarios';
        this.authpath= '/api/auth';

        //middlewares
        this.middlewares();

        //routes
        this.routes();
    }

    routes(){
        this.app.use(this.userspath, userRouter);
        this.app.use(this.authpath,authRouter);
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