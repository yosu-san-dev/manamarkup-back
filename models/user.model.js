import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'FUll name is required'],
        trim: true,
        maxlength: 255,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+@\w+\.\w+$/, 'Invalid email'],
    },
    username: {
        type: String,
        required: [true, 'UserName is required'],
        unique: [true, 'The user name should be unique'],
        maxlength: 255,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
    signedIn: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;