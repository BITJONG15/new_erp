# IHTM ERP - Système de Gestion Académique

## 🚀 Lancement en Local (Optimisé pour Windows)

Ce projet est conçu pour être facilement déployable en local. Le fichier `package.json` a été spécifiquement allégé et optimisé pour les environnements Windows afin d'éviter les problèmes de compilation de modules natifs et de réduire drastiquement la taille du dossier `node_modules` (suppression des dépendances Angular inutilisées).

### Prérequis
- **Node.js** (version 18 ou supérieure recommandée)
- **npm** (généralement installé avec Node.js)
- **Git** (optionnel, pour cloner le dépôt)

### Étapes d'installation

1. **Cloner ou extraire le projet**
   Ouvrez votre terminal et placez-vous dans le dossier du projet.

2. **Installer les dépendances**
   Exécutez la commande suivante pour installer tous les paquets nécessaires (Express, Sequelize, SQLite3, etc.) :
   ```bash
   npm install
   ```
   *Note Windows : Le projet utilise `sqlite3@5.1.7` qui télécharge automatiquement des binaires pré-compilés pour Windows, évitant ainsi le besoin d'installer Python ou Visual Studio Build Tools. De plus, `bcryptjs` est utilisé à la place de `bcrypt` pour éviter toute compilation native.*

3. **Configuration de l'environnement**
   Le projet contient déjà un fichier `.env` configuré pour le développement local. Si ce n'est pas le cas, copiez le fichier `.env.example` :
   ```bash
   cp .env.example .env
   ```
   Assurez-vous que les variables suivantes sont présentes :
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=ihtm-super-secret-key-change-me
   ```

4. **Démarrer le serveur**
   Lancez l'application avec la commande :
   ```bash
   npm run dev
   ```
   *(Cette commande utilise `cross-env` et `nodemon` pour garantir un fonctionnement parfait sous Windows et recharger automatiquement le serveur à chaque modification).*

5. **Accéder à l'application**
   Ouvrez votre navigateur web et allez à l'adresse :
   **http://localhost:3000**

### 🔑 Identifiants par défaut
Au premier lancement, la base de données SQLite (`ihtm_erp.sqlite`) est automatiquement créée et un compte administrateur par défaut est généré :
- **Email :** `admin@ihtm.edu`
- **Mot de passe :** `admin123`

---

## 🌟 Fonctionnalités Implémentées

Le système IHTM ERP est une solution complète couvrant les besoins de l'administration, des professeurs et des étudiants.

### 1. Authentification & Sécurité
- **Connexion sécurisée** basée sur JSON Web Tokens (JWT).
- **Hachage des mots de passe** avec `bcryptjs` (100% JavaScript, idéal pour Windows).
- **Contrôle d'accès basé sur les rôles (RBAC)** : Les routes API et les interfaces sont protégées selon le rôle (Admin, Professeur, Étudiant).

### 2. Espace Administration (Admin)
- **Tableau de bord global** : Vue d'ensemble des effectifs (étudiants, professeurs, filières) et des finances (total encaissé).
- **Gestion des Étudiants** : Création de profils étudiants avec génération automatique du matricule (ex: `IHTM2026001`).
- **Gestion des Professeurs** : Ajout de professeurs et assignation de spécialités.
- **Gestion Académique** : Création des filières et des matières, avec définition des coefficients et de la charge horaire.
- **Gestion Financière** : Enregistrement des paiements des étudiants, suivi des restes à payer, et génération de reçus au format PDF.
- **Communication** : Publication d'annonces globales ou ciblées.

### 3. Espace Professeur
- **Tableau de bord** : Suivi de la charge horaire et du nombre de matières enseignées.
- **Gestion des Cours** : Consultation des matières assignées.
- **Saisie des Notes** : Saisie des notes de Contrôle Continu (CC) et d'Examen. Le système calcule automatiquement la note finale en fonction des coefficients.
- **Communication** : Possibilité de publier des annonces pour leurs classes.

### 4. Espace Étudiant
- **Tableau de bord** : Suivi de la situation financière (frais totaux, montant payé, reste à payer).
- **Dossier Académique** : Consultation des notes par matière et téléchargement du relevé de notes au format PDF.
- **Emploi du temps** : Consultation des horaires de cours.
- **Historique financier** : Visualisation de l'historique des paiements effectués.

### 5. Fonctionnalités Techniques Avancées
- **Base de données relationnelle** : Modélisation complète avec Sequelize ORM (utilisateurs, étudiants, professeurs, filières, matières, notes, paiements, etc.).
- **Génération de PDF** : Création dynamique de reçus de paiement et de relevés de notes via `pdfkit`.
- **Interface Utilisateur (SPA-like)** : Interface dynamique en EJS et Vanilla JS avec Bootstrap 5, offrant une navigation fluide sans rechargement complet de la page pour le tableau de bord.
- **API RESTful** : Architecture backend propre et documentée, prête à être consommée par d'autres clients (mobile, etc.).
