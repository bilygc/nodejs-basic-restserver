import express from 'express';
import cors from 'cors';
import router from '../routes/users.js';

class Server{

    constructor(){
        this.port = process.env.PORT;

        this.app = express();

        //routes
        this.userspath= '/api/usuarios';

        //middlewares
        this.middlewares();

        //routes
        this.routes();
    }

    routes(){

        this.app.use(this.userspath, router)
        
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //DIRECTORIO PUBLICO
        this.app.use( express.static('public'));

        //LECTURA Y PARSEO DE LOS PARAMETROS DEL BODY
        this.app.use( express.json() )
    }

    start(){
        this.app.listen(this.port, () =>{
            console.log(`Server listening on port: ${this.port}`);
        });
    }

    
}

export default Server;