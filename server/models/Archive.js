import { Schema, model } from 'mongoose';

const archiveSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  issueNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  exporter: String,
  importer: String,
  description: String,
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
