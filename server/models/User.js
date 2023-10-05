import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, MESSAGES } from '../config.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String, // String is shorthand for {type: String}
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
  },
  role: {
    type: String,
    enum: ['superadmin', 'editor', 'viewer'],
    default: 'editor',
  },
});

// Hash the password before saving and updating
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Hash the password before updating
userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    if (!this._update.password) {
      return next();
    }
    const hashed = await bcrypt.hash(this._update.password, 10);
    this._update.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id,
        role: this.role,
        username: this.username,
      },
      JWT_SECRET
    );
    return token;
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);

    return isMatch;
  } catch (err) {
    throw new Error(err);
  }
};

const User = mongoose.model('User', userSchema);

export default User;
