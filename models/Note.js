module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    etudiant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'etudiants',
        key: 'id'
      }
    },
    matiere_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'matieres',
        key: 'id'
      }
    },
    note_cc: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    note_examen: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    note_finale: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    session: {
      type: DataTypes.ENUM('normale', 'rattrapage'),
      defaultValue: 'normale'
    },
    annee_academique: {
      type: DataTypes.STRING
    },
    validee: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    date_saisie: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'notes',
    timestamps: true
  });

  Note.associate = function(models) {
    Note.belongsTo(models.Etudiant, { foreignKey: 'etudiant_id', as: 'etudiant' });
    Note.belongsTo(models.Matiere, { foreignKey: 'matiere_id', as: 'matiere' });
  };

  return Note;
};
