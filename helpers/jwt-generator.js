import jwt from 'jsonwebtoken';

const jwtGenerator = (uid = '') =>{

    return new Promise((resolve, reject) =>{
        jwt.sign({uid},process.env.JWTPUBLICKEY,{expiresIn:'10h'}, (err, token) =>{
            
            if(err){
                console.error(`jwt error: ${err}`);
                reject('Error when creating the jwt');
            }

            resolve(token);

        });
    });
}

export default jwtGenerator;