import { Schema, model } from 'mongoose';

const folderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  archives: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Archive',
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Folder = model('Folder', folderSchema);

module.exports = Folder;
