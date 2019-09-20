import mongoose, { Schema } from 'mongoose';

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const User: mongoose.Model<any> = mongoose.model('User', userSchema);

export { User as UserModel };