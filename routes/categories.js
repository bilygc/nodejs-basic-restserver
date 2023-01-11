import { Router } from "express";
import { check } from 'express-validator';
import { categoryIdExists } from '../helpers/index.js';

import { dataRequestValidation, jwtValidation, isAdminRole } from "../middlewares/index.js";

import { categoriesGet, categoryGet, createCategory, updateCategory, categoriesDelete } from '../controllers/categories.js';

const router = Router();

router.get('/', categoriesGet);

router.get('/:id',[
    check('id', 'The category id isn\'t valid').isMongoId(),
    check('id').custom( categoryIdExists ),
    dataRequestValidation
], categoryGet);

router.post('/',[
    jwtValidation,
    check('name', 'the category name is required').not().isEmpty(),
    dataRequestValidation
    ], createCategory
);

router.put('/:id',[
    jwtValidation,
    check('id', 'The id category isn\'t valid ').isMongoId(),
    check('id').custom(categoryIdExists),
    check('name', 'The category name is required').not().isEmpty(),
    dataRequestValidation
], updateCategory);

router.delete('/:id',[
    jwtValidation,
    isAdminRole,
    check('id', 'The id is required').not().isEmpty(),
    check('id', 'The id isn\'t valid').isMongoId(),
    check('id').custom(categoryIdExists),
    dataRequestValidation
], categoriesDelete);

export default router;