import File from '../models/File.js';
import Archive from '../models/Archive.js';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { MESSAGES } from '../config.js';
import Folder from '../models/Folder.js';

// __dirname
const __dirname = path.resolve('..');

// Upload file to server
const uploadFile = async (file, folderName, archiveName) => {
  const { originalname, mimetype, size } = file;
  const fileName = uuidv4();

  const folderPath = path.join(__dirname, `uploads/${folderName}/${archiveName}`);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const extension = mimetype.split('/')[1];

  await fs.promises.writeFile(`${folderPath}/${fileName}.${extension}`, file.buffer);

  let sizeFormatted;
  if (size < 1024 * 1024) {
    sizeFormatted = `${(size / 1024).toFixed(2)} KB`;
  } else {
    sizeFormatted = `${(size / 1024 / 1024).toFixed(2)} MB`;
  }

  const data = {
    name: originalname,
    path: `${__dirname}/uploads/${folderName}/${archiveName}/${fileName}.${extension}`,
    mimetype,
    uuidv4: fileName,
    size: sizeFormatted,
  };

  return data;
};

const downloadFile = async (req, res) => {
  
}

const create = async (req, res) => {
  const archiveId = req.params.archiveId;
  const folder = await Folder.findOne({ archives: archiveId }).select('_id');
  const folderId = folder._id;

  if (!folderId) {
    return res.status(404).json({
      message: MESSAGES.folderNotFound,
    });
  }

  const uploadFileResult = await uploadFile(req.file, folderId, archiveId);

  const file = new File({
    ...uploadFileResult,
    creator: req.user._id,
  });

  const fileSaved = await file.save();

  const archive = await Archive.findById(archiveId);

  archive.files.push(fileSaved._id);

  await archive.save();

  return res.status(201).json({
    message: MESSAGES.fileUploaded,
    data: fileSaved,
  });
};

const list = async (req, res) => {
  const files = await File.find();

  return res.status(200).json({ data: files });
};

const get = async (req, res) => {
  const id = req.params.id;

  const file = await File.findById(id);

  if (!file) {
    return res.status(404).json({ message: MESSAGES.fileNotFound });
  }

  return res.status(200).json({ data: file });
};

const update = async (req, res) => {
  const id = req.params.id;

  const file = await File.findById(id);

  if (!file) {
    return res.status(404).json({ message: MESSAGES.fileNotFound });
  }

  const { name } = req.body;

  if (name) {
    file.name = name;
  }

  const fileUpdated = await file.save();

  return res.status(200).json({ message: MESSAGES.fileUpdated, data: fileUpdated });
};

const remove = async (req, res) => {
  const id = req.params.id;

  const file = await File.findById(id);

  if (!file) {
    return res.status(404).json({ message: MESSAGES.fileNotFound });
  }

  await file.remove();

  return res.status(200).json({ message: MESSAGES.fileRemoved });
};

export default {
  create,
  list,
  get,
  update,
  remove,
};
