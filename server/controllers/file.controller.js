import File from '../models/File.js';
import Archive from '../models/Archive.js';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import { MESSAGES } from '../config.js';
import Folder from '../models/Folder.js';

const __dirname = path.resolve();
const uploadsFolder = path.join(__dirname, 'uploads');

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

const downloadImageWithArchiveDataPDF = async (req, res) => {
  const id = req.params.id;
  const archiveId = req.params.archiveId;

  const archive = await Archive.findById(archiveId);

  if (!archive) {
    return res.status(404).json({ message: MESSAGES.noArchiveFounded });
  }

  const file = await File.findById(id);

  if (!file) {
    return res.status(404).json({ message: MESSAGES.fileNotFound });
  }

  const browser = await puppeteer.launch();

  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);

    const filePath = `${uploadsFolder}/${file.path}`;
    const image = fs.readFileSync(filePath);

    const imageEmbed = await pdfDoc.embedPng(image);

    const { width, height } = imageEmbed.scale(0.5);

    const htmlArchiveData = `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: black;">
      <h1 style="font-size: 24px; font-weight: bold;">${archive.title}</h1>
      <h3 style="font-size: 16px;">الوصف: ${archive.description}</h3>
      <h3 style="font-size: 16px;">العدد: ${archive.issueNumber}</h3>
      <h3 style="font-size: 16px;">التاريخ: ${new Date(archive.date).toLocaleDateString('ar-EG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}</h3>
      <h3 style="font-size: 16px;">المصدر: ${archive.exporter}</h3>
      <h3 style="font-size: 16px;">المستورد: ${archive.importer}</h3>
    </div>
    `;

    const pageHTML = await browser.newPage();

    await pageHTML.setContent(htmlArchiveData);

    const htmlImageBuffer = await pageHTML.screenshot();

    await pageHTML.close();

    const imageEmbedHTML = await pdfDoc.embedPng(htmlImageBuffer);

    const { widthHTML, heightHTML } = imageEmbedHTML.scale(0.5);

    page.drawImage(imageEmbedHTML, {
      x: page.getWidth() / 2 - 400,
      y: page.getHeight() / 2 - 170,
      width: widthHTML,
      height: heightHTML,
    });

    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();
    const imageAspectRatio = width / height;
    const pageAspectRatio = pageWidth / (pageHeight / 2); // Half the page height

    let scaleFactor = 1;

    if (imageAspectRatio > pageAspectRatio) {
      scaleFactor = pageWidth / width;
    } else {
      scaleFactor = pageHeight / 2 / height;
    }

    const scaledWidth = width * scaleFactor;
    const scaledHeight = height * scaleFactor;

    page.drawImage(imageEmbed, {
      x: (pageWidth - scaledWidth) / 2,
      y: 0,
      width: scaledWidth,
      height: scaledHeight,
    });

    const pdfBytes = await pdfDoc.save();

    if (!fs.existsSync(`${uploadsFolder}/Downloads`)) {
      fs.mkdirSync(`${uploadsFolder}/Downloads`);
    }

    const fileDownloadedName = `${archive.title}-${file.name.split('.')[0]}`;

    fs.writeFileSync(`${uploadsFolder}/Downloads/${fileDownloadedName}.pdf`, pdfBytes);

    const filePathPDF = `${uploadsFolder}/Downloads/${fileDownloadedName}.pdf`;

    res.download(filePathPDF);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: MESSAGES.fileNotDownloaded });
  } finally {
    await browser.close();
  }
};

export default {
  create,
  list,
  get,
  update,
  remove,
  download,
  print: downloadImageWithArchiveDataPDF,
};
