import { Schema, model } from 'mongoose';

const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uuidv4: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Department = model('File', fileSchema);

export default Department;
