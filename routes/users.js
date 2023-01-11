import { Router } from "express";
import { check } from 'express-validator';
import { isValidRole, emailExists, userIdExists } from '../helpers/index.js';

import { dataRequestValidation, jwtValidation, haveRole } from "../middlewares/index.js";

import { usersGet, usersPost, usersPut, usersDelete } from '../controllers/users.js';

const router = Router();

router.get('/', usersGet);

router.post('/', [
        check('name', 'the name is required').not().isEmpty(),
        check('email', 'the email is invalid').isEmail(),
        check('email').custom( emailExists ),
        check('password', 'the minimun password lenght is 6 characters').isLength( { min:6 } ),
        //check('role', 'the role is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( isValidRole ),
        dataRequestValidation
    ],
    usersPost
);

router.put('/:id',[
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom( userIdExists ),
    check('role').custom( isValidRole ),
    dataRequestValidation
], usersPut);

router.delete('/:id',[
    jwtValidation,
    haveRole('ADMIN_ROLE', 'SOMETHING_ROLE', 'NONSENSE_ROLE', 'VENTAS_ROLE'),
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom( userIdExists ),
    dataRequestValidation    
], usersDelete);

export default router;