import User from '../models/User.js';
import Department from '../models/Department.js';
import { MESSAGES } from '../config.js';

const register = async (req, res) => {
  const { name, username, password, role, department } = req.body;

  if (!role) {
    return res.status(400).json({ message: MESSAGES.roleIsRequired });
  }

  if (!department) {
    return res.status(400).json({ message: MESSAGES.departmentNameIsRequired });
  }

  const departmentFounded = await Department.findOne({ name: department });

  if (!departmentFounded) {
    return res.status(404).json({ message: MESSAGES.noDepartmentFounded });
  }

  if (await User.findOne({ username })) {
    return res.status(400).json({ message: MESSAGES.usernameAlreadyInUse });
  }

  try {
    const user = new User({
      name,
      username,
      password,
      role,
      department: departmentFounded._id,
    });

    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message, error: err });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find().populate('department');

    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('department');

    if (!user) {
      return res.status(404).json({ message: MESSAGES.noUserFounded });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).populate('department');

    if (!user) {
      return res.status(401).json({ message: MESSAGES.noUserFounded });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: MESSAGES.wrongPassword });
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const update = async (req, res) => {
  const { name, username, password, role, department } = req.body;

  if (username) {
    if (await User.findOne({ username })) {
      return res.status(400).json({ message: MESSAGES.usernameAlreadyInUse });
    }
  }

  if (department) {
    const departmentFounded = await Department.findOne({ name: department });

    if (!departmentFounded) {
      return res.status(404).json({ message: MESSAGES.noDepartmentFounded });
    }
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        username,
        password,
        role,
        department,
      },
      { new: true }
    ).populate('department');

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).populate('department');

    if (!user) {
      return res.status(404).json({ message: MESSAGES.noUserFounded });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

export default {
  register,
  list,
  get,
  login,
  update,
  remove,
};
