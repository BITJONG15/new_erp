const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const { User } = require('../models');

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole === 'admin') {
    next();
    return;
  }
  res.status(403).send({
    message: 'Require Admin Role!'
  });
};

const isProfesseur = (req, res, next) => {
  if (req.userRole === 'professeur' || req.userRole === 'admin') {
    next();
    return;
  }
  res.status(403).send({
    message: 'Require Professeur Role!'
  });
};

const isEtudiant = (req, res, next) => {
  if (req.userRole === 'etudiant' || req.userRole === 'admin') {
    next();
    return;
  }
  res.status(403).send({
    message: 'Require Etudiant Role!'
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isProfesseur,
  isEtudiant
};
