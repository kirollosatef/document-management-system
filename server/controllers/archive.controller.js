import Archive from '../models/Archive.js';
import Folder from '../models/Folder.js';
import { MESSAGES } from '../config.js';

const create = async (req, res) => {
  const folderId = req.params.folderId;
  const creatorId = req.user._id;
  const { title, issueNumber, date, exporter, importer, description } = req.body;

  if (!title || !issueNumber || !date || !exporter || !importer) {
    return res.status(400).json({ message: MESSAGES.invalidFields });
  }

  const folder = await Folder.findById(folderId);

  if (!folder) {
    return res.status(404).json({ message: MESSAGES.noFolderFounded });
  }

  if (folder.isRoot === false) {
    return res.status(400).json({ message: MESSAGES.invalidFolder });
  }

  const archive = new Archive({
    title,
    issueNumber,
    date,
    exporter,
    importer,
    description,
    creator: creatorId,
  });

  try {
    await (await archive.save()).populate('creator');

    folder.archives.push(archive._id);

    await folder.save();

    res.status(201).json({ archive, message: MESSAGES.archiveCreated });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const list = async (req, res) => {
  try {
    const archives = await Archive.find().populate('creator');

    res.status(200).json({ archives });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const get = async (req, res) => {
  const archiveId = req.params.id;

  try {
    const archive = await Archive.findById(archiveId)
      .populate('creator')
      .populate({
        path: 'files',
        model: 'File',
        populate: {
          path: 'creator',
          model: 'User',
        },
      });

    if (!archive) {
      return res.status(404).json({ message: MESSAGES.noArchiveFounded });
    }

    res.status(200).json({ archive });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const update = async (req, res) => {
  const archiveId = req.params.id;
  const { title, issueNumber, date, exporter, importer, description, folderId } = req.body;

  try {
    const archive = await Archive.findByIdAndUpdate(archiveId, {
      title,
      issueNumber,
      date,
      exporter,
      importer,
      description,
    }).populate('creator');

    if (!archive) {
      return res.status(404).json({ message: MESSAGES.noArchiveFounded });
    }

    if (folderId) {
      const folder = await Folder.findById(folderId);

      if (!folder) {
        return res.status(404).json({ message: MESSAGES.noFolderFounded });
      }

      const oldFolder = await Folder.findOne({ archives: archiveId });

      oldFolder.archives = oldFolder.archives.filter((id) => id.toString() !== archiveId);

      folder.archives.push(archive._id);

      await oldFolder.save();
      await folder.save();
    }

    const updatedArchive = await Archive.findById(archiveId).populate('creator');

    res.status(200).json({ archive: updatedArchive, message: MESSAGES.archiveUpdated });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const remove = async (req, res) => {
  const archiveId = req.params.id;

  try {
    const archive = await Archive.findByIdAndDelete(archiveId);

    if (!archive) {
      return res.status(404).json({ message: MESSAGES.noArchiveFounded });
    }

    const folder = await Folder.findOne({ archives: archiveId });

    folder.archives = folder.archives.filter((id) => id.toString() !== archiveId);

    await folder.save();

    res.status(200).json({ archive, message: MESSAGES.archiveRemoved });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const search = async (req, res) => {
  const { searchData } = req.body;

  try {
    const archives = await Archive.find({
      $or: [
        { title: { $regex: searchData, $options: 'i' } },
        { issueNumber: { $regex: searchData, $options: 'i' } },
        { exporter: { $regex: searchData, $options: 'i' } },
        { importer: { $regex: searchData, $options: 'i' } },
        { description: { $regex: searchData, $options: 'i' } },
      ],
    }).populate('creator');

    res.status(200).json({ archive: archives });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

export default {
  create,
  list,
  get,
  update,
  remove,
  search,
};
