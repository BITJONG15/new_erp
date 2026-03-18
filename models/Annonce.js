module.exports = (sequelize, DataTypes) => {
  const Annonce = sequelize.define('Annonce', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    auteur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    cible: {
      type: DataTypes.ENUM('tous', 'etudiants', 'professeurs', 'filiere', 'promotion'),
      defaultValue: 'tous'
    },
    cible_valeur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_publication: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    date_expiration: {
      type: DataTypes.DATE,
      allowNull: true
    },
    important: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    vu_par: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    tableName: 'annonces',
    timestamps: true
  });

  Annonce.associate = function(models) {
    Annonce.belongsTo(models.User, { foreignKey: 'auteur_id', as: 'auteur' });
  };

  return Annonce;
};
