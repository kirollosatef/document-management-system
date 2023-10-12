import { Schema, model } from 'mongoose';

const archiveSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  theNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  exporter: {
    type: String,
    required: true,
  },
  importer: {
    type: String,
    required: true,
  },
  description: String,
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
  },
  files: [
    {
      type: Schema.Types.ObjectId,
      ref: 'File',
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Archive = model('Archive', archiveSchema);

export default Archive;
