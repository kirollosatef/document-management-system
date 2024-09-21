import Department from '../models/Department.js';
import { MESSAGES } from '../config.js';
import { asyncHandler } from '../utils/error.handler.js';

const create = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: MESSAGES.departmentNameIsRequired });
  }

  if (await Department.findOne({ name })) {
    return res.status(400).json({ message: MESSAGES.departmentNameAlreadyInUse });
  }

  try {
    const department = new Department({
      name,
      description,
    });

    await department.save();

    res.status(201).json({ department });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const list = async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json({ departments });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const get = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: MESSAGES.noDepartmentFounded });
    }

    res.status(200).json({ department });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const update = async (req, res) => {
  const { name, description } = req.body;

  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: MESSAGES.noDepartmentFounded });
    }

    if (name) {
      department.name = name;
    }

    if (description) {
      department.description = description;
    }

    await department.save();

    res.status(200).json({ department });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const remove = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({ message: MESSAGES.noDepartmentFounded });
    }

    res.status(200).json({ message: MESSAGES.departmentRemoved });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

export default {
  create: asyncHandler(create),
  list: asyncHandler(list),
  get: asyncHandler(get),
  update: asyncHandler(update),
  remove: asyncHandler(remove),
};
