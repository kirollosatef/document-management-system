import Folder from '../models/Folder.js';
import { MESSAGES } from '../config.js';

const create = async (req, res) => {
  const userId = req.user._id;

  const { name, description } = req.body;

  if (await Folder.findOne({ name })) {
    return res.status(400).json({ message: MESSAGES.folderAlreadyInUse });
  }

  if (!name) {
    return res.status(400).json({ message: MESSAGES.folderNameIsRequired });
  }

  if (!description) {
    return res.status(400).json({ message: MESSAGES.folderDescriptionIsRequired });
  }

  try {
    const folder = new Folder({
      name,
      description,
      creator: userId,
    });

    await folder.save();

    res.status(201).json({ folder });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const list = async (req, res) => {
  try {
    const folders = await Folder.find().populate('creator');
    res.status(200).json({ folders });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const get = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id)
      .populate({
        path: 'archives',
        model: 'Archive',
      })
      .populate('creator');

    if (!folder) {
      return res.status(404).json({ message: MESSAGES.noFolderFounded });
    }

    res.status(200).json({ folder });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const update = async (req, res) => {
  const { name, description } = req.body;

  try {
    const folder = await Folder.findByIdAndUpdate(req.params.id, {
      name,
      description,
    }).populate('creator');

    if (!folder) {
      return res.status(404).json({ message: MESSAGES.noFolderFounded });
    }
    res.status(200).json({ folder });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const remove = async (req, res) => {
  try {
    const folder = await Folder.findByIdAndDelete(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: MESSAGES.noFolderFounded });
    }

    res.status(200).json({ folder });
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
};
