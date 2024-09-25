import Archive from '../models/Archive.js';
import Folder from '../models/Folder.js';
import { MESSAGES } from '../config.js';
import { uploadFile } from './file.controller.js';
import File from '../models/File.js';
import { asyncHandler } from '../utils/error.handler.js';

const create = async (req, res) => {
  const folderId = req.params.folderId;
  const creatorId = req.user._id;
  const { title, issueNumber, date, exporter, importer, description, propertyNumber, contractNumber, year, personName } = req.body;
  const files = req.files;

  if (!title || !issueNumber || !date || !propertyNumber || !contractNumber || !year || !personName) {
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
    propertyNumber,
    contractNumber,
    year,
    personName,
    creator: creatorId,
  });

  try {
    await (await archive.save()).populate('creator');

    folder.archives.push(archive._id);

    await folder.save();

    for (let i = 0; i < files.length; i++) {
      try {
        const file = files[i];
        const uploadFileResult = await uploadFile(file, folderId, archive._id);

        const newfile = new File({
          ...uploadFileResult,
          creator: req.user._id,
        });

        if (req.body?.name) {
          newfile.name = req.body?.name;
        }

        const fileSaved = await newfile.save();

        archive.files.push(fileSaved._id);

        await archive.save();
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: MESSAGES.fileNotUploaded,
        });
      }
    }

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
  const { title, issueNumber, date, exporter, importer, description, propertyNumber, contractNumber, year, personName, folderId } = req.body;

  try {
    const archive = await Archive.findByIdAndUpdate(archiveId, {
      title,
      issueNumber,
      date,
      exporter,
      importer,
      description,
      propertyNumber,
      contractNumber,
      year,
      personName,
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

const moveToTrash = async (req, res) => {
  const id = req.params.id;
  console.log("🚀 ~ moveToTrash ~ id:", id)
  const { reason } = req.body;
  console.log("🚀 ~ moveToTrash ~ reason:", reason)

  try {
    const archive = await Archive.findById(id);

    if (!archive) {
      return res.status(404).json({ message: MESSAGES.noArchiveFounded });
    }

    archive.isDeleted = true;
    archive.deletedBy = req.user._id;
    archive.deletedAt = new Date();
    archive.deleteReason = reason;

    await archive.save();

    return res.status(200).json({ message: MESSAGES.archiveMovedToTrash, data: archive });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.serverError });
  }
};

const restoreFromTrash = async (req, res) => {
  const id = req.params.id;

  try {
    const archive = await Archive.findById(id);

    if (!archive) {
      return res.status(404).json({ message: MESSAGES.noArchiveFounded });
    }

    archive.isDeleted = false;
    archive.deletedBy = undefined;
    archive.deletedAt = undefined;
    archive.deleteReason = undefined;

    const restoredArchive = await archive.save();

    return res.status(200).json({ message: MESSAGES.archiveRestoredFromTrash, data: restoredArchive });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.serverError });
  }
};

const permanentlyDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const archive = await Archive.findById(id);

    if (!archive) {
      return res.status(404).json({ message: MESSAGES.noArchiveFounded });
    }

    if (!archive.isDeleted) {
      return res.status(400).json({ message: MESSAGES.archiveNotInTrash });
    }

    // Remove the archive from its folder
    await Folder.updateOne(
      { archives: id },
      { $pull: { archives: id } }
    );

    // Delete associated files
    for (const fileId of archive.files) {
      await File.findByIdAndDelete(fileId);
      // You might want to also delete the actual file from storage here
    }

    await Archive.findByIdAndDelete(id);

    return res.status(200).json({ message: MESSAGES.archivePermanentlyDeleted });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.serverError });
  }
};

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

const getTrashArchives = async (req, res) => {
  try {
    const trashArchives = await Archive.find({ isDeleted: true })
      .populate('deletedBy', 'name')

    const data = trashArchives.map((archive) => {
      return {
        _id: archive._id,
        title: archive.title,
        issueNumber: archive.issueNumber,
        date: archive.date,
        exporter: archive.exporter,
        importer: archive.importer,
        description: archive.description,
        deletedBy: archive.deletedBy?.name,
        deletedAt: formatDate(archive.deletedAt),
        deleteReason: archive.deleteReason,
      };
    });
    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: MESSAGES.serverError });
  }
};

export default {
  create: asyncHandler(create),
  list: asyncHandler(list),
  get: asyncHandler(get),
  update: asyncHandler(update),
  remove: asyncHandler(remove),
  search: asyncHandler(search),
  moveToTrash: asyncHandler(moveToTrash),
  restoreFromTrash: asyncHandler(restoreFromTrash),
  permanentlyDelete: asyncHandler(permanentlyDelete),
  getTrashArchives: asyncHandler(getTrashArchives),
};
