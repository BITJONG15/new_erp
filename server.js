const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./models');

const app = express();

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  }
}));
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/etudiants', require('./routes/etudiant'));
app.use('/api/professeurs', require('./routes/professeur'));
app.use('/api/filieres', require('./routes/filiere'));
app.use('/api/matieres', require('./routes/matiere'));
app.use('/api/notes', require('./routes/note'));
app.use('/api/emploi-temps', require('./routes/emploiTemps'));
app.use('/api/annonces', require('./routes/annonce'));
app.use('/api/paiements', require('./routes/paiement'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Routes Frontend (Views)
app.get('/', (req, res) => {
  res.render('index', { title: 'IHTM ERP' });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Sync Database and Start Server
const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: false }).then(async () => {
  console.log('Database connected and synced');
  
  // Create default admin user if not exists
  const bcrypt = require('bcryptjs');
  const adminExists = await db.User.findOne({ where: { email: 'admin@ihtm.edu' } });
  if (!adminExists) {
    await db.User.create({
      nom_complet: 'Administrateur IHTM',
      email: 'admin@ihtm.edu',
      mot_de_passe: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      statut: true
    });
    console.log('Default admin user created: admin@ihtm.edu / admin123');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
