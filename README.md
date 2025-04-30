# Documentation du Projet TGV

## Table des Matières
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Structure du Projet](#structure-du-projet)
4. [Configuration](#configuration)
5. [Scripts](#scripts)
6. [Contribution](#contribution)
7. [Licence](#licence)

## Introduction
Ce projet est un micro framework pour le développement de sites web développée avec [Vite](https://vitejs.dev/) et [React](https://reactjs.org/). Il utilise [Tailwind CSS](https://tailwindcss.com/) pour le style et [TypeScript](https://www.typescriptlang.org/) pour le typage.

## Installation
Pour installer les dépendances du projet, exécutez la commande suivante :
```bash
npm install
```

## Structure du Projet
Voici une vue d'ensemble de la structure du projet :
```
/Users/jcommaret/Sites/tgv
├── .git/
├── .gitignore
├── .prettierrc
├── 404.html
├── LICENSE
├── README.md
├── dist/
├── eslint.config.js
├── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── postcss.config.js
├── public/
├── src/
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.test.json
├── vite.config.ts
└── vitest.config.mjs
```

## Configuration
### ESLint
Le fichier `eslint.config.js` contient la configuration pour ESLint.

### Prettier
Le fichier `.prettierrc` contient la configuration pour Prettier.

### Tailwind CSS
Le fichier `tailwind.config.js` contient la configuration pour Tailwind CSS.

### TypeScript
Les fichiers `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, et `tsconfig.test.json` contiennent les configurations pour TypeScript.

## Scripts
Les scripts disponibles dans le fichier `package.json` sont :
- `dev`: Démarre le serveur de développement.
- `build`: Construit l'application pour la production.
- `lint`: Exécute ESLint pour vérifier le code.
- `test`: Exécute les tests avec Vitest.

## Contribution
Les contributions sont les bienvenues ! Veuillez suivre les étapes suivantes pour contribuer :
1. Forkez le projet.
2. Créez une nouvelle branche (`git checkout -b feature/ma-nouvelle-fonctionnalité`).
3. Commitez vos modifications (`git commit -am 'Ajout de ma nouvelle fonctionnalité'`).
4. Poussez vers la branche (`git push origin feature/ma-nouvelle-fonctionnalité`).
5. Ouvrez une Pull Request.

## Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
