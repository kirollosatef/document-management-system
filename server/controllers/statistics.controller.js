import User from '../models/User.js';
import Department from '../models/Department.js';
import Folder from '../models/Folder.js';
import Archive from '../models/Archive.js';
import File from '../models/File.js';

/**
 * 1- number of users
 * 2- number of departments
 * 3- number of folders
 * 4- number of archives
 * 5- number of files
 * 7- total size of files
 */

const calculateSize = (totalSize) => {
  let size = 0;

  totalSize.forEach((file) => {
    if (file.size.includes('KB')) {
      size += parseInt(file.size.split(' ')[0]) * 1024;
    }

    if (file.size.includes('MB')) {
      size += parseInt(file.size.split(' ')[0]) * 1024 * 1024;
    }

    if (file.size.includes('GB')) {
      size += parseInt(file.size.split(' ')[0]) * 1024 * 1024 * 1024;
    }

    if (file.size.includes('B')) {
      size += parseInt(file.size.split(' ')[0]);
    }
  });

  console.log(size);

  if (size < 1024) {
    size = `${size.toFixed(2)} B`;
  }

  if (size >= 1024 && size < 1024 * 1024) {
    size = `${(size / 1024).toFixed(2)} KB`;
  }

  if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) {
    size = `${(size / 1024 / 1024).toFixed(2)} MB`;
  }

  if (size >= 1024 * 1024 * 1024) {
    size = `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }

  return size;
};

const list = async (req, res) => {
  const users = await User.countDocuments();
  const departments = await Department.countDocuments();
  const folders = await Folder.countDocuments();
  const archives = await Archive.countDocuments();
  const files = await File.countDocuments();
  const totalSize = await File.find().select('size');

  console.log(totalSize);

  const newSize = calculateSize(totalSize);

  console.log(newSize);

  return res.status(200).json({
    users,
    departments,
    folders,
    archives,
    files,
    totalSize: newSize,
  });
};

export default { list };
