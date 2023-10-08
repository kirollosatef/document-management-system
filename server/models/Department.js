import { Schema, model } from 'mongoose';

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

const Department = model('Department', departmentSchema);

export default Department;
