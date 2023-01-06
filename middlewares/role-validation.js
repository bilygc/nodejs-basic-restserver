import { request, response } from "express";


export const isAdminRole = (req = request, res = response, next) =>{

    if(!req.authUser){
        return res.status(500).json({
            msg:'Its mandatory to verify the token before the role'
        })
    }

    const  { role, name } = req.authUser;

    if(role !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg:`The user ${name} don\'t have administrator rights`
        })
    }

    next();

}

export const haveRole = (...roles) =>{
    
    return (req = request, res = response, next) =>{
        const { role } = req.authUser;
        if(!roles.includes(role)){
            return res.status(401).json({
                msg:'Unauthorized user'
            })
        }

        next();
    }
}