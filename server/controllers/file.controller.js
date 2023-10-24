import File from '../models/File.js';
import Archive from '../models/Archive.js';
import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { v4 as uuidv4 } from 'uuid';
import { MESSAGES } from '../config.js';
import Folder from '../models/Folder.js';

// __dirname
const __dirname = path.resolve();
const uploadsFolder = path.join(__dirname, 'uploads');

// Upload file to server
export const uploadFile = async (file, folderName, archiveName) => {
  const { originalname, mimetype, size } = file;
  const fileName = uuidv4().replace(/-/g, '');

  const folderPath = path.join(uploadsFolder, `${folderName}/${archiveName}`);

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
    path: `${folderName}/${archiveName}/${fileName}.${extension}`,
    mimetype,
    uuidv4: fileName,
    size: sizeFormatted,
  };

  return data;
};

const removeFile = async (filePath) => {
  const filePathInFolder = path.join(uploadsFolder, filePath);

  if (fs.existsSync(filePathInFolder)) {
    fs.unlinkSync(filePathInFolder);
  } else {
    return false;
  }

  return true;
};

const downloadFile = async (path, res) => {
  try {
    const filePath = `${uploadsFolder}/${path}`;

    console.log(filePath);

    if (fs.existsSync(filePath)) {
      return res.download(filePath);
    }

    res.status(404).json({ Message: MESSAGES.fileNotFound });
  } catch (err) {
    res.status(500).json({ Message: MESSAGES.fileNotFound });
  }
};

const create = async (req, res) => {
  const archiveId = req.params.archiveId;
  const folder = await Folder.findOne({ archives: archiveId }).select('_id');
  const folderId = folder._id;

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

  if (req.body.name) {
    file.name = req.body.name;
  }

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

  try {
    const fileRemovedSuccess = await removeFile(file.path);
    await File.findByIdAndDelete(id);
  } catch (error) {
    return res.status(500).json({ message: MESSAGES.fileNotRemoved });
  }

  return res.status(200).json({ data: file, message: MESSAGES.fileRemoved });
};

const download = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const file = await File.findById(id);

  if (!file) {
    return res.status(404).json({ message: MESSAGES.fileNotFound });
  }

  const filePath = file.path;

  await downloadFile(filePath, res);
};

// const downloadImageWithArchiveDataPDF = async (req, res) => {
//   const id = req.params.id;
//   const archiveId = req.params.archiveId;

//   const archive = await Archive.findById(archiveId);

//   if (!archive) {
//     return res.status(404).json({ message: MESSAGES.noArchiveFounded });
//   }

//   const file = await File.findById(id);

//   if (!file) {
//     return res.status(404).json({ message: MESSAGES.fileNotFound });
//   }
//   const pdfDoc = await PDFDocument.create();

//   // Embed the Times Roman font for arabic text
//   const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

//   // Add a blank page to the document A4 size
//   const page = pdfDoc.addPage();

//   // Get the width and height of the page
//   const { width, height } = page.getSize();

//   // Draw a string of text toward the top of the page
//   const fontSize = 30;

//   const filePath = `${uploadsFolder}/${file.path}`;
//   const image = fs.readFileSync(filePath);

//   const imageEmbed = await pdfDoc.embedPng(image);

//   const { imageWidth, imageHeight } = imageEmbed.scale(0.5);

//   page.drawImage(imageEmbed, {
//     x: page.getWidth() / 2 - width / 2,
//     y: page.getHeight() / 2 - height / 2,
//     width: imageWidth,
//     height: imageHeight,
//   });

//   const titleText = `Title: ${archive.title}`;
//   const descriptionText = `Description: ${archive.description}`;
//   const issueNumberText = `Issue Number: ${archive.issueNumber}`;
//   const dateText = `Date: ${archive.date}`;
//   const exporterText = `Exporter: ${archive.exporter}`;
//   const importerText = `Importer: ${archive.importer}`;

//   page.edrawText('شمينخبتمخكنشس', {
//     x: 50,
//     y: height - 4 * fontSize,
//     size: fontSize,
//     font: timesRomanFont,
//     color: rgb(0, 0.53, 0.71),
//   });

//   // page.drawText(descriptionText, {
//   //   x: 50,
//   //   y: 730,
//   //   size: fontSize,
//   //   font: font,
//   //   lineHeight: fontSize,
//   //   maxWidth: textWidth,
//   //   encoding: 'Identity-H',
//   // });

//   // page.drawText(issueNumberText, {
//   //   x: 50,
//   //   y: 710,
//   //   size: fontSize,
//   //   font: font,
//   //   lineHeight: fontSize,
//   //   maxWidth: textWidth,
//   //   encoding: 'Identity-H',
//   // });

//   // page.drawText(dateText, {
//   //   x: 50,
//   //   y: 690,
//   //   size: 15,
//   // });

//   // page.drawText(exporterText, {
//   //   x: 50,
//   //   y: 670,
//   //   size: 15,
//   // });

//   // page.drawText(importerText, {
//   //   x: 50,
//   //   y: 650,
//   //   size: 15,
//   // });

//   const pdfBytes = await pdfDoc.save();

//   fs.writeFileSync(`${uploadsFolder}/${file.name}.pdf`, pdfBytes);

//   const filePathPDF = `${uploadsFolder}/${file.name}.pdf`;

//   res.download(filePathPDF);
// };

export default {
  create,
  list,
  get,
  update,
  remove,
  download,
  // print: downloadImageWithArchiveDataPDF,
};
