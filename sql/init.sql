-- Création base
CREATE DATABASE IF NOT EXISTS ihtm_erp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utiliser la base
USE ihtm_erp;

-- Créer utilisateur admin par défaut (mot de passe: admin123 à changer)
INSERT INTO users (nom_complet, email, mot_de_passe, role, statut, date_inscription, createdAt, updatedAt)
VALUES ('Administrateur IHTM', 'admin@ihtm.edu', '$2a$10$O9y.6i5/mX.wU3v.vW7yC.O.Qv.wU3v.vW7yC.O.Qv.wU3v.vW7yC', 'admin', true, NOW(), NOW(), NOW());
