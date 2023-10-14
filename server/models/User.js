import { Schema, model } from 'mongoose';
import Department from './Department.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, MESSAGES } from '../config.js';

const userSchema = new Schema({
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
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
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

const User = model('User', userSchema);

export const createAdminUserIfNotExist = async () => {
  let departmentId;

  try {
    const department = await Department.findOne({ name: 'مدير' });

    if (!department) {
      const department = new Department({
        name: 'مدير',
        description: 'مدير',
      });

      const data = await department.save();

      departmentId = data._id;
    }
  } catch (err) {
    throw new Error(err);
  }
  try {
    const user = await User.findOne({ username: 'admin' });

    if (!user) {
      const admin = new User({
        name: 'admin',
        username: 'admin',
        password: 'admin1234',
        role: 'superadmin',
        department: departmentId,
      });

      await admin.save();
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default User;
