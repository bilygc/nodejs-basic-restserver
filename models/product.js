import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = Schema({
    name:{
        type: String,
        required: [true, 'The product name is required'],
        unique: true
    },
    status:{
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    price:{
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description:{
        type: String,
    },
    available:{
        type:Boolean,
        default: true
    }
});

productSchema.methods.toJSON = function() {
    const { __v, status, ...product } = this.toObject();
    return product;
}

export default  model('Product', productSchema);