module.exports = (sequelize, DataTypes) => {
  const Etudiant = sequelize.define('Etudiant', {
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
    matricule: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    date_naissance: {
      type: DataTypes.DATEONLY
    },
    lieu_naissance: {
      type: DataTypes.STRING
    },
    nationalite: {
      type: DataTypes.STRING
    },
    filiere_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'filieres',
        key: 'id'
      }
    },
    annee_etude: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 3
      }
    },
    frais_payer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    montant_frais: {
      type: DataTypes.DECIMAL(10, 2)
    },
    dossier_complet: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    pieces_jointes: {
      type: DataTypes.JSON
    }
  }, {
    tableName: 'etudiants',
    timestamps: true
  });

  Etudiant.associate = function(models) {
    Etudiant.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Etudiant.belongsTo(models.Filiere, { foreignKey: 'filiere_id', as: 'filiere' });
    Etudiant.hasMany(models.Note, { foreignKey: 'etudiant_id', as: 'notes' });
    Etudiant.hasMany(models.Paiement, { foreignKey: 'etudiant_id', as: 'paiements' });
  };

  return Etudiant;
};
