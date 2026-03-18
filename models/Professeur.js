module.exports = (sequelize, DataTypes) => {
  const Professeur = sequelize.define('Professeur', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    specialite: {
      type: DataTypes.STRING
    },
    grade: {
      type: DataTypes.STRING
    },
    date_embauche: {
      type: DataTypes.DATEONLY
    },
    type_contrat: {
      type: DataTypes.ENUM('CDI', 'CDD', 'Vacataire')
    },
    charge_horaire: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'professeurs',
    timestamps: true
  });

  Professeur.associate = function(models) {
    Professeur.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Professeur.hasMany(models.Filiere, { foreignKey: 'responsable_id', as: 'filieres_responsable' });
    Professeur.hasMany(models.Matiere, { foreignKey: 'professeur_id', as: 'matieres' });
  };

  return Professeur;
};
