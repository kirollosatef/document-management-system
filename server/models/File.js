import { Schema, model } from 'mongoose';

const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
    unique: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const Department = model('File', fileSchema);

export default Department;
