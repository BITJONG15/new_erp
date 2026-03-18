module.exports = (sequelize, DataTypes) => {
  const Filiere = sequelize.define('Filiere', {
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
    description: {
      type: DataTypes.TEXT
    },
    responsable_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'professeurs',
        key: 'id'
      }
    },
    duree_ans: {
      type: DataTypes.INTEGER
    },
    frais_scolarite: {
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {
    tableName: 'filieres',
    timestamps: true
  });

  Filiere.associate = function(models) {
    Filiere.belongsTo(models.Professeur, { foreignKey: 'responsable_id', as: 'responsable' });
    Filiere.hasMany(models.Etudiant, { foreignKey: 'filiere_id', as: 'etudiants' });
    Filiere.hasMany(models.Matiere, { foreignKey: 'filiere_id', as: 'matieres' });
  };

  return Filiere;
};
