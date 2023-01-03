import { Router } from "express";
import { check } from 'express-validator';
import { dataRequestValidation } from '../middlewares/data-request-validation.js';
import { login, googleSignIn } from '../controllers/auth.js';

const router = new Router();

router.post('/login',[
    check('email', 'The email is not valid').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    dataRequestValidation
] ,login)

router.post('/googlesignin',[
    check('id_token', 'The id_token is required').not().isEmpty(),
    dataRequestValidation
] ,googleSignIn)

export default router;