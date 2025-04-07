# TGV

## Table of Contents

- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Fonctionnalités](#fonctionnalités)
- [À faire](#à-faire)
- [Installation](#installation)
- [Développement](#développement)
- [Déploiement](#déploiement)
- [Structure des dossiers](#structure-des-dossiers)
- [Utilisation des alias](#utilisation-des-alias)
- [Exemples](#exemples)
- [Captures d'écran](#captures-décran)
- [Ressources supplémentaires](#ressources-supplémentaires)

## Architecture

Ce projet est organisé selon une architecture modulaire :

- **Infrastructure** : Contient les adaptateurs et la configuration
  - **Primary** : Composants React et pages
  - **Secondary** : Configuration et données

Cette architecture offre plusieurs avantages :
- Séparation claire des responsabilités
- Facilité de maintenance
- Flexibilité et évolutivité

## Prérequis

- Une bonne compréhension de [GitHub Pages](https://docs.github.com/fr/pages)
- Connaissances de base en React et TypeScript

## Fonctionnalités

- [x] [Vite.js](https://vitejs.dev/)
- [x] [React](https://react.dev/)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [SCSS](https://sass-lang.com/)
- [x] [React-router](https://reactrouter.com/)
- [x] [Tailwind CSS](https://tailwindcss.com/)
- [x] Architecture modulaire
- [x] Alias de chemins pour une meilleure lisibilité du code
- [x] Navigation
- [x] Fichiers JSON pour le contenu et la configuration

## À faire

- [ ] Améliorer les assets responsifs
- [ ] Ajouter plus de composants
- [ ] Compléter les tests unitaires

## Installation

1. Cloner le dépôt
2. Ouvrir un terminal dans le dossier du projet
3. Exécuter `npm install` pour installer les dépendances

## Développement

- Exécuter `npm run dev` pour démarrer le serveur de développement

## Déploiement

1. Dans `package.json`, modifier le chemin homepage avec le nom de votre dépôt
2. Ouvrir un terminal dans le dossier du projet
3. Exécuter `npm run deploy` pour déployer le projet sur GitHub Pages

## Structure des dossiers

- 404.html
- src
 
  - components (Composants React)
  - pages (Pages React)
  - assets
    - images.tsx
  - data
    - content.json
  - styles
    - utils
      - \_breakpoints.scss
      - \_colors.scss
      - \_fonts.scss
      - \_mixins.scss
  - main.tsx

## Utilisation des alias

Ce projet utilise des alias d'import pour rendre le code plus lisible :

```typescript
// Au lieu de
import { Component } from '../../infrastructure/adapters/primary/components/Component';

// Vous pouvez écrire
import { Component } from '@infrastructure/adapters/primary/components/Component';
```

## Exemples

### Navigation

La navigation est gérée via le fichier `content.json` :

```json
{
  "pages": {
    "home": {
      "title": "Accueil",
      "path": "/",
      "seo": {
        "description": "Page d'accueil de TGV"
      }
    },
    "about": {
      "title": "À propos",
      "path": "about",
      "seo": {
        "description": "Page à propos de TGV"
      }
    }
  }
}
```

### SEO

Le SEO est géré de manière centralisée dans le composant `Root` :

```typescript
function Root() {
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '') || 'home';
  const pageKey = currentPath as keyof typeof content.pages;

  return (
    <div className="flex flex-col min-h-screen">
      <SEO pageKey={pageKey} />
      {/* ... */}
    </div>
  )
}
```

## Captures d'écran

*À ajouter*

## Ressources supplémentaires

- [Vite.js Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/learn)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/fr/pages)
