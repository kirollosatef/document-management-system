import { Schema, model } from 'mongoose';
import { MAX_FILES, MESSAGES } from '../config';

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
  files: {
    type: [
      {
        name: String,
        path: String,
        mimetype: String,
        size: Number,
      },
    ],
    validate: [
      (val) => {
        return val.length <= MAX_FILES;
      },
      MESSAGES.maxFiles,
    ],
  },
});

const Archive = model('Archive', archiveSchema);

export default Archive;
