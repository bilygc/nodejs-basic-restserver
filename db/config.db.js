import mongoose from 'mongoose';

export const dbConnection = async () =>{

    try{

        await mongoose.connect(process.env.MONGODB_CON, {
            useNewUrlParser:true
        });

        console.log('Connected to the databse');

    }catch(err){
        console.log(err);
        throw new Error("Error when attempting to connect to the database");
    }

};