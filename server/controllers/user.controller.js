import User from '../models/User.js';
import { MESSAGES } from '../config.js';

const register = async (req, res) => {
  const { name, username, password, role } = req.body;

  try {
    const user = new User({
      name,
      username,
      password,
      role,
    });

    if (await User.findOne({ username })) {
      return res.status(400).json({ message: MESSAGES.usernameAlreadyInUse });
    }

    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

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
    const user = await User.findOne({ username });

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
  const { name, username, password, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        username,
        password,
        role,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: MESSAGES.noUserFounded });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message, error: err });
  }
};

const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

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
