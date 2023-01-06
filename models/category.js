import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const categorySchema = Schema({
    name:{
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    status:{
        type: Boolean,
        default: true,
        required: true
    }, user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

categorySchema.methods.toJSON = function() {
    const { __v, status, ...category } = this.toObject();
    return category;
}

export default  model('Category', categorySchema);