# Projet de fin de formation

## Description :

Le site doit permettre à des particuliers de proposer des services
et de les échanger contre d'autres services.


## Visuel du site :

### Les 2 polices utilisées sont :

- Logo: [Jomhuria](https://fonts.googleapis.com/css?family=Jomhuria:700|Jomhuria:400)
- Texte: [Inter](https://fonts.googleapis.com/css?family=Inter:700|Inter:400)


### Les couleurs utilisées sont :

- Pour le thème clair :
    - background : #F7FDFB;
    - text: #04100E;
    - primary: #4CCDB1;
    - secondary: #A294E1;
    - accent: #B370D7;
    - borders: rgba(0, 0, 0, 0.2);
    - toast-info: #c08800;
    - toast-error: #fc6060;
    - toast-success: #12a112;
    - danger: #cb0707;
    - success: #12a112;


- Pour le thème sombre :
    - background: #040500;
    - texte: #FCFFF5;
    - primary: #32B397;
    - secondary: #2C1E6B;
    - accent: #6B288F;
    - borders: rgba(255, 255, 255, 0.2);


[//]: # (### Création du logo du site : [Logo]&#40;https://www.freelogodesign.org/&#41;)
### Icônes : [Lucid Dev](https://fontawesome.com/) et [Font Awesome](https://fontawesome.com/)

### Responsive :

- Mobile :
    - Menu burger (responsive)

- Tablette (min-width:500px) :
    - Pas de burger menu

- Desktop (min-width:900px) :
    - Largeur limitée à 1200px


## Actions utilisateurs :

Le site doit permettre aux utilisateurs de :
    - Créer un compte
    - Se connecter
    - Proposer un service
    - Rechercher un service
    - Commander un service
    - Contacter un utilisateur

### Scénario d'utilisation :
Sur la page d'accueil se trouvera les règles d'utilisations du site,
ainsi que les instructions. L'utilisateur pourra déjà voir les services
cependant il devra s'inscrire et se connecter pour pouvoir les commander.
En plus de cela, il pourra proposer un service, contacter un utilisateur
et avoir une page profil afin de modifier son mot de passe.

## Technologies utilisées :
La stack utilisée est la SERN (SQL Express React Node) + Sass.
La communication des données sera classique.

### Mise en place :

- La base de donnée utilisée `SQL`, et son `SGBD` sera `MySQL`
    - Voir schéma de conception de cette BDD plus bas.
- Backend avec `Node`
    - les routes seront gérés avec Express
    - un système de session (par cookie) sera mis en place avec Express-session
      ainsi qu'express-sql-session pour la stocker en BDD
    - Autorisation de la communication entre notre 2 serveurs (back et front)
      grace au module CORS (domain/port/protocol)
    - Bcrypt pour le hashage des mots de passe
    - Mysql2/promise pour la communication avec la BDD
    - Dotenv pour les variables d'environnement
    - Middleware pour la protection des routes
    - Validations des données à l'aide d'expressions régulières
- Frontend avec `React`
    - Routeur géré par react-router-dom
    - Utilisation de hooks natifs et custom
    - Validation des données à l'aide d'expressions régulières
      pour la partie profil utilisateur
    - Utilisation de React-hook-form + Yup pour la validation de la partie services
    - Utilisation de Sass pour le style
    - Création de composants réutilisables (exemple : "Toaster")


## Schéma de la base de donnée :

Dossier "Schemas MCD MLD MVD" dans le dossier "Infos".

## Structure des dossiers :

### Backend (API) :
|server-side
        /controllers
        /database
        /middlewares
        /models
        /public
        /routes
        /utils
        server.js
        .env
        .gitignore
        package.json
        README.md

### Frontend :
|client-side
        /public
        /src
            /components
            /css
            /hooks
            /pages
            /svg
            /utils
            App.jsx
            main.jsx
        index.html
        .gitignore
        package.json
        README.md

## Routes :
CRUD sur les services, les utilisateurs, les commandes, les messages.
    /api/auth (login, logout, register, me, update)
    /api/services (CRUD)
    /api/messagerie

Certaines routes seront protégés par un middleware vérifiant que
l'initiateur de la requête soit bien connecté et le bon utilisateur.

React-router-dom gérera les routes côté front.
/
/profil
/services

Voir le dossier "Routes" dans le dossier "Infos".