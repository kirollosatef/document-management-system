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
  subFolders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Folder',
    },
  ],
  isRoot: {
    type: Boolean,
    default: false,
  },
});

const Folder = model('Folder', folderSchema);

export default Folder;
