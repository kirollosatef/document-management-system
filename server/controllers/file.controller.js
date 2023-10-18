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
  if (size < 1024) {
    sizeFormatted = `${size.toFixed(2)} B`;
  }

  if (size >= 1024 && size < 1024 * 1024) {
    sizeFormatted = `${(size / 1024).toFixed(2)} KB`;
  }

  if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) {
    sizeFormatted = `${(size / 1024 / 1024).toFixed(2)} MB`;
  }

  if (size >= 1024 * 1024 * 1024) {
    sizeFormatted = `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
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

const removeFile = async (filePath) => {
  const filePathInFolder = path.join(filePath);

  if (fs.existsSync(filePathInFolder)) {
    fs.unlinkSync(filePathInFolder);
  } else {
    return false;
  }

  return true;
};

const downloadFile = async (filePath, res) => {
  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      res.status(404).json({ Message: MESSAGES.fileNotFound });
      return;
    }

    // Get the file's name from the filePath
    const fileName = path.basename(filePath);

    // Set the response headers
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Create a readable stream from the file
    const fileStream = fs.createReadStream(filePath);

    // Pipe the file stream to the response
    fileStream.pipe(res);

    fileStream.on('error', (err) => {
      res.status(500).json({ Message: MESSAGES.fileNotFound });
    });

    // Close the response when the file is finished sending
    fileStream.on('end', () => {
      res.end();
    });
  } catch (err) {
    res.status(500).json({ Message: MESSAGES.fileNotFound });
  }
};

const create = async (req, res) => {
  const archiveId = req.params.archiveId;
  const folder = await Folder.findOne({ archives: archiveId }).select('_id');
  const folderId = folder?._id;

  if (!folderId) {
    return res.status(404).json({
      message: MESSAGES.folderNotFound,
    });
  }

  let uploadFileResult;
  try {
    uploadFileResult = await uploadFile(req.file, folderId, archiveId);
  } catch (error) {
    return res.status(500).json({
      message: MESSAGES.fileNotUploaded,
    });
  }

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

  const fileRemovedSuccess = await removeFile(file.path);

  if (!fileRemovedSuccess) {
    return res.status(500).json({ message: MESSAGES.fileNotRemoved });
  }

  await File.findByIdAndDelete(id);

  return res.status(200).json({ message: MESSAGES.fileRemoved });
};

const download = async (req, res) => {
  const id = req.params.id;

  const file = await File.findById(id);

  if (!file) {
    return res.status(404).json({ message: MESSAGES.fileNotFound });
  }

  const filePath = file.path;

  await downloadFile(filePath, res);
};

export default {
  create,
  list,
  get,
  update,
  remove,
  download,
};
