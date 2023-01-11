import { Router } from "express";
import { check } from "express-validator";
import { uploadFile, updateImage, getImage,getUrlImage, updateCloudinaryImage } from '../controllers/uploads.js'
import { dataRequestValidation, collectionsValidation, fileSent, checkIdByCollection } from "../middlewares/index.js";

const router = Router();

//upload file to the server
router.post('/',fileSent, uploadFile);

//update or upload the image of a user or a product
router.put('/:collection/:id',[
    fileSent,
    check('id', 'The id is not a valid id').isMongoId(),
    collectionsValidation(),
    checkIdByCollection,
    dataRequestValidation
] ,updateCloudinaryImage);
//updateImage);

//get the image of a user or a product
router.get('/:collection/:id',[
    check('id', 'The id is not a valid id').isMongoId(),
    collectionsValidation(),
    checkIdByCollection,
    dataRequestValidation
],getUrlImage);

export default router;