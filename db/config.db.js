import mongoose from 'mongoose';

export const dbConnection = async () =>{

    try{

        await mongoose.connect(process.env.MONGODB_CON, {
            useNewUrlParser:true
        });

        console.log('Base de datos online');

    }catch(err){
        console.log(err);
        throw new Error("Error al realizar la conexion a la base de datos");
    }

};