# 🚄 TGV - Micro Framework React

[![CI/CD](https://github.com/jcommaret/tgv/actions/workflows/ci.yml/badge.svg)](https://github.com/jcommaret/tgv/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-24_LTS-green.svg)](https://nodejs.org/)

> Un micro framework moderne pour le développement de sites web, construit avec
> **Vite**, **React**, **TypeScript** et **Tailwind CSS**.

🌐 **Démo** : [https://jcommaret.github.io/tgv](https://jcommaret.github.io/tgv)

---

## ✨ Fonctionnalités

- ⚡️ **Vite 8** - Build ultra-rapide avec Hot Module Replacement
- ⚛️ **React 18** - Dernière version avec Concurrent Features
- 📘 **TypeScript** - Typage strict pour une meilleure maintenabilité
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌗 **Mode clair / sombre** - Suit le système, choix mémorisé, sans flash au
  chargement
- ♿ **Accessibilité** - Contrastes WCAG AA, audit axe-core en dev + ESLint
  jsx-a11y
- 🧪 **Tests** - Vitest + Testing Library avec couverture de code
- 🔄 **CI/CD** - Pipeline GitHub Actions complet
- 📦 **Optimisé** - Code splitting, lazy loading, bundle analysis
- 🎭 **Animations** - Framer Motion pour des transitions fluides
- 🗃️ **State Management** - Zustand pour la gestion d'état global
- 🔒 **Sécurisé** - Headers de sécurité CSP, XSS protection

---

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** 24+ (LTS recommandé - [télécharger](https://nodejs.org/))
- **npm** 10+

> 💡 **Astuce** : Utilisez [nvm](https://github.com/nvm-sh/nvm) pour gérer les
> versions de Node.js :
>
> ```bash
> nvm install 24
> nvm use 24
> ```

### Installation

```bash
# Cloner le repository
git clone https://github.com/jcommaret/tgv.git
cd tgv

# Installer la version de Node.js spécifiée (si vous utilisez nvm)
nvm use

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev
# → http://localhost:3000/tgv/
```

---

## 📜 Scripts Disponibles

| Commande                | Description                                 |
| ----------------------- | ------------------------------------------- |
| `npm run dev`           | Serveur de développement avec HMR           |
| `npm run build`         | Build de production (TypeScript + Vite)     |
| `npm run build:analyze` | Build avec analyse du bundle                |
| `npm run preview`       | Prévisualiser le build localement           |
| `npm run lint`          | Vérifier le code avec ESLint                |
| `npm run lint:fix`      | Corriger automatiquement les erreurs ESLint |
| `npm run type-check`    | Vérification TypeScript de tout le projet   |
| `npm run format`        | Formater `src/` avec Prettier               |
| `npm run format:check`  | Vérifier le formatage (utilisé par la CI)   |
| `npm test`              | Lancer les tests en mode watch              |
| `npm run test:ui`       | Interface UI pour les tests                 |
| `npm run test:coverage` | Tests avec rapport de couverture            |
| `npm run validate`      | Lint + Type check + Tests avec couverture   |
| `npm run analyze`       | Analyser la taille du bundle                |
| `npm run deploy`        | Déployer sur GitHub Pages                   |

---

## 🏗️ Architecture

```
tgv/
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline CI/CD
├── public/                     # Fichiers copiés tels quels (logo, manifest)
├── src/
│   ├── assets/                 # Images importées par le code
│   ├── components/             # Composants layout (Nav, Footer, Layout, SEO)
│   ├── data/                   # content.json : textes, pages, SEO, menu
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Pages de l'application
│   ├── shared/
│   │   └── components/         # Composants réutilisables
│   │       ├── ErrorBoundary/  # Gestion des erreurs
│   │       ├── LoadingSpinner/ # Indicateur de chargement
│   │       ├── PageLoader/     # Chargement page complète
│   │       └── Toast/          # Notifications
│   ├── store/                  # State management (Zustand)
│   ├── styles/                 # SCSS global + couleurs du thème
│   └── test/                   # Tests, mocks et setup Vitest
├── .env.example                # Template variables d'environnement
├── .husky/                     # Git hooks
├── eslint.config.js            # Configuration ESLint
├── tailwind.config.js          # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
├── vite.config.ts              # Configuration Vite
└── vitest.config.mjs           # Configuration Vitest
```

---

## 🎯 Alias d'Imports

Pour des imports propres et maintenables :

```typescript
// ✅ Bon
import Nav from '@components/Nav'
import { useDarkMode } from '@hooks/useDarkMode'
import content from '@data/content.json'
import img from '@assets/images'
import { useAppStore } from '@store/appStore'
import '@styles/index.scss'

// ❌ À éviter
import Nav from '../../../components/Nav'
```

| Alias         | Chemin            |
| ------------- | ----------------- |
| `@`           | `src/`            |
| `@components` | `src/components/` |
| `@pages`      | `src/pages/`      |
| `@hooks`      | `src/hooks/`      |
| `@store`      | `src/store/`      |
| `@data`       | `src/data/`       |
| `@styles`     | `src/styles/`     |
| `@assets`     | `src/assets/`     |
| `@shared`     | `src/shared/`     |

> `@features`, `@utils`, `@types` et `@app` sont aussi configurés, pour des
> dossiers à créer au besoin.

---

## 🧩 Composants Principaux

### ErrorBoundary

Attrape les erreurs React et affiche une UI de fallback :

```tsx
import { ErrorBoundary } from '@shared/components/ErrorBoundary'

;<ErrorBoundary fallback={<CustomError />}>
  <App />
</ErrorBoundary>
```

### LoadingSpinner

Indicateur de chargement personnalisable :

```tsx
import { LoadingSpinner } from '@shared/components/LoadingSpinner'

;<LoadingSpinner size="lg" variant="primary" label="Chargement..." />
```

### Toast Notifications

Système de notifications global :

```tsx
import { useAddNotification } from '@store/appStore'

const addNotification = useAddNotification()

addNotification({
  type: 'success',
  message: 'Opération réussie !',
  duration: 3000,
})
```

### Mode clair / sombre

Pour qu'un composant s'adapte aux deux thèmes, utilisez les couleurs sémantiques
plutôt que des couleurs fixes (`text-white`, `bg-gray-800`…) :

| Classe                                                   | Rôle                                   |
| -------------------------------------------------------- | -------------------------------------- |
| `bg-surface` / `bg-surface-raised` / `bg-surface-sunken` | Fond de page / cartes / bandeaux       |
| `text-fg` / `text-fg-muted` / `text-fg-subtle`           | Texte principal / secondaire / discret |
| `text-accent`                                            | Liens et éléments mis en avant         |
| `border-line`                                            | Bordures                               |

Les valeurs sont dans `src/styles/index.scss` et garantissent un contraste ≥
4,5:1 (WCAG AA). Pour les boutons pleins, utilisez `bg-primary-600 text-white`.

Hook pour lire ou changer le thème :

```tsx
import { useDarkMode } from '@hooks/useDarkMode'

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  return <button onClick={toggleDarkMode}>{isDarkMode ? '☀️' : '🌙'}</button>
}
```

### Responsive Hooks

```tsx
import { useIsMobile, useIsDesktop, useMediaQuery } from '@hooks/useMediaQuery'

function Component() {
  const isMobile = useIsMobile()
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')
  // ...
}
```

---

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Avec couverture
npm run test:coverage

# Interface UI
npm run test:ui
```

### Exemple de test

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Nav from '@components/Nav'

describe('Nav', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
```

---

## 🔧 Configuration

### Ajouter une page

1. Créer `src/pages/MaPage/index.tsx`
2. La déclarer dans `src/data/content.json` (`title`, `path`, `seo`) : elle
   apparaît alors dans le menu
3. Ajouter la route (lazy) dans `src/main.tsx`

Le guide complet est sur la page
[Documentation](https://jcommaret.github.io/tgv/#/documentation) du site.

### Variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_APP_TITLE=TGV - Micro Framework
VITE_APP_DESCRIPTION=Description de l'application
VITE_APP_VERSION=1.0.0
VITE_BASE_URL=/tgv/
# VITE_API_URL=https://api.example.com
```

### Conventions de Commit

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/) :

```bash
git commit -m "feat: ajout du composant Button"
git commit -m "fix: correction du bug de navigation"
git commit -m "docs: mise à jour du README"
git commit -m "style: formatage du code"
git commit -m "refactor: amélioration du hook useDarkMode"
git commit -m "test: ajout des tests pour Footer"
git commit -m "chore: mise à jour des dépendances"
```

---

## 🚀 Déploiement

### GitHub Pages (automatique)

Le déploiement est automatique via GitHub Actions à chaque push sur `master`.

### Manuel

```bash
npm run deploy
```

---

## 📊 Performance

- **Lazy Loading** : Toutes les pages sont chargées à la demande
- **Code Splitting** : Chunks séparés par vendor et feature
- **Tree Shaking** : Élimination du code mort
- **Asset Optimization** : Images et fonts optimisés
- **Caching** : Stratégie de cache agressive pour les assets

Analyse du bundle :

```bash
npm run analyze
# Ouvre dist/stats.html avec la visualisation du bundle
```

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feat/ma-fonctionnalite`)
3. Lancer `npm run validate`
4. Commit (`git commit -m 'feat: ajout de ma fonctionnalité'`) puis push
5. Ouvrir une Pull Request

---

## 📄 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---

## 🙏 Remerciements

- [Vite](https://vitejs.dev/) - Build tool
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vitest](https://vitest.dev/) - Test framework
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Zustand](https://github.com/pmndrs/zustand) - State management

---

<p align="center">
  Fait avec ❤️ par <a href="https://github.com/jcommaret">jcommaret</a>
</p>
