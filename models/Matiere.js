module.exports = (sequelize, DataTypes) => {
  const Matiere = sequelize.define('Matiere', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    coefficient: {
      type: DataTypes.INTEGER
    },
    credit: {
      type: DataTypes.INTEGER
    },
    semestre: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 2
      }
    },
    filiere_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'filieres',
        key: 'id'
      }
    },
    professeur_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'professeurs',
        key: 'id'
      }
    }
  }, {
    tableName: 'matieres',
    timestamps: true
  });

  Matiere.associate = function(models) {
    Matiere.belongsTo(models.Filiere, { foreignKey: 'filiere_id', as: 'filiere' });
    Matiere.belongsTo(models.Professeur, { foreignKey: 'professeur_id', as: 'professeur' });
    Matiere.hasMany(models.Note, { foreignKey: 'matiere_id', as: 'notes' });
    Matiere.hasMany(models.EmploiTemps, { foreignKey: 'matiere_id', as: 'seances' });
  };

  return Matiere;
};
