import { Schema, model } from 'mongoose';


const roleSchema = Schema({
    role:{
        type: String,
        required: [true, ' the role is required']
    }
});

export default model('Role', roleSchema);