import { Router } from "express";
import { check } from 'express-validator';
import { productNameExists, productIdExists, categoryIdExists } from '../helpers/db-validators.js';

import { dataRequestValidation, jwtValidation, isAdminRole } from "../middlewares/index.js";

import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';

const router = Router();

router.get('/', getProducts);

router.get('/:id',[
    check('id', 'The product id isn\'t valid').isMongoId(),
    check('id').custom( productIdExists ),
    dataRequestValidation
], getProduct);

router.post('/',[
    jwtValidation,
    check('name', 'the product name is required').not().isEmpty(),
    check('name').custom(productNameExists),
    check('category').not().isEmpty(),
    check('category', 'The product category must be a valid id').isMongoId(),
    check('category').custom(categoryIdExists),
    dataRequestValidation
    ], createProduct
);

router.put('/:id',[
    jwtValidation,
    check('id', 'The id category isn\'t valid ').isMongoId(),
    check('id').custom(productIdExists),
    //check('category', 'the id category isn\'t valid').isMongoId(),
    dataRequestValidation
], updateProduct);

router.delete('/:id',[
    jwtValidation,
    isAdminRole,
    check('id', 'The id isn\'t valid').isMongoId(),
    check('id').custom(productIdExists),
    dataRequestValidation
], deleteProduct);

export default router;