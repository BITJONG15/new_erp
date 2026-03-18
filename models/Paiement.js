module.exports = (sequelize, DataTypes) => {
  const Paiement = sequelize.define('Paiement', {
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
    montant: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    date_paiement: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    mode_paiement: {
      type: DataTypes.ENUM('especes', 'cheque', 'virement', 'mobile_money'),
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    annee_academique: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'paiements',
    timestamps: true
  });

  Paiement.associate = function(models) {
    Paiement.belongsTo(models.Etudiant, { foreignKey: 'etudiant_id', as: 'etudiant' });
  };

  return Paiement;
};
