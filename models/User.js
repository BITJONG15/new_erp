module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_complet: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'professeur', 'etudiant'),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING
    },
    adresse: {
      type: DataTypes.TEXT
    },
    photo: {
      type: DataTypes.STRING
    },
    statut: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    date_inscription: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reset_password_expires: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  User.associate = function(models) {
    User.hasOne(models.Etudiant, { foreignKey: 'user_id', as: 'etudiant' });
    User.hasOne(models.Professeur, { foreignKey: 'user_id', as: 'professeur' });
    User.hasMany(models.Annonce, { foreignKey: 'auteur_id', as: 'annonces' });
  };

  return User;
};
