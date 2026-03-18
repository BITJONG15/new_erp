module.exports = (sequelize, DataTypes) => {
  const EmploiTemps = sequelize.define('EmploiTemps', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    matiere_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'matieres',
        key: 'id'
      }
    },
    jour_semaine: {
      type: DataTypes.ENUM('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'),
      allowNull: false
    },
    heure_debut: {
      type: DataTypes.TIME,
      allowNull: false
    },
    heure_fin: {
      type: DataTypes.TIME,
      allowNull: false
    },
    salle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groupe: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'emploi_temps',
    timestamps: true
  });

  EmploiTemps.associate = function(models) {
    EmploiTemps.belongsTo(models.Matiere, { foreignKey: 'matiere_id', as: 'matiere' });
  };

  return EmploiTemps;
};
