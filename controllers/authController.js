const { User } = require('../models');
const config = require('../config/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { nom_complet, email, mot_de_passe, role } = req.body;

    const user = await User.create({
      nom_complet,
      email,
      mot_de_passe: bcrypt.hashSync(mot_de_passe, 10),
      role
    });

    res.status(201).send({ message: "User registered successfully!", userId: user.id });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.mot_de_passe, user.mot_de_passe);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, config.secret, {
      expiresIn: config.expiresIn
    });

    res.status(200).send({
      id: user.id,
      nom_complet: user.nom_complet,
      email: user.email,
      role: user.role,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['mot_de_passe'] }
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
