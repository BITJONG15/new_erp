module.exports = {
  secret: process.env.JWT_SECRET || 'ihtm-super-secret-key',
  expiresIn: '24h'
};
