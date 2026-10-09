# 📋 Guidelines Générales – Tous Projets

> Fichier de référence à copier dans chaque nouveau projet. Couvre l'outillage,
> les patterns, les tests, la CI/CD et les bonnes pratiques validées sur le
> projet TGV (octobre 2026).

> ⚠️ **Projet existant ? Lire d'abord la
> [section 0](#0-appliquer-ces-guidelines-à-un-projet-existant).** Ce guide
> décrit la cible d'un **nouveau** projet. Il ne donne pas l'autorisation de
> réécrire le code, le markup ou les styles d'un projet qui fonctionne.

---

## Table des matières

0. [Appliquer ces guidelines à un projet existant](#0-appliquer-ces-guidelines-à-un-projet-existant)
1. [Stack de base](#1-stack-de-base)
2. [Structure des dossiers](#2-structure-des-dossiers)
3. [Configuration TypeScript](#3-configuration-typescript)
4. [Configuration Vite](#4-configuration-vite)
5. [ESLint & Prettier](#5-eslint--prettier)
6. [Store Zustand (state management)](#6-store-zustand-state-management)
7. [Hooks personnalisés](#7-hooks-personnalisés)
8. [Composants réutilisables](#8-composants-réutilisables)
9. [Point d'entrée & routing](#9-point-dentrée--routing)
10. [Design System & Thèmes](#10-design-system--thèmes)
11. [Accessibilité (a11y)](#11-accessibilité-a11y)
12. [SEO & Meta](#12-seo--meta)
13. [Tests (Vitest)](#13-tests-vitest)
14. [CI/CD GitHub Actions](#14-cicd-github-actions)
15. [Déploiement (GitHub Pages)](#15-déploiement-github-pages)
16. [Variables d'environnement & sécurité](#16-variables-denvironnement--sécurité)
17. [Git Hooks (Husky + Commitlint)](#17-git-hooks-husky--commitlint)
18. [Commandes de validation](#18-commandes-de-validation)
19. [Conventions de commit](#19-conventions-de-commit)
20. [Checklist nouveau projet](#20-checklist-nouveau-projet)

---

## 0. Appliquer ces guidelines à un projet existant

> Règles **obligatoires** pour toute personne ou tout assistant IA (Claude,
> Mistral, Copilot…) qui applique ce guide à un projet déjà en place.

### Retour d'expérience (Booki, octobre 2026)

Un assistant IA a « mis le projet aux normes » en un seul diff de ~7 700 lignes
(Prettier sur tous les fichiers + nouvelle config + composants retouchés). Noyée
dans le reformatage, une modification de **2 lignes** a cassé toute la mise en
page : le `<a href="#">` qui entourait chaque carte `<article>` a été supprimé
pour satisfaire la règle ESLint `jsx-a11y/anchor-is-valid`. Or le SCSS ciblait
ce lien (`a { display: block; flex: 1; height: 360px }`, `.hosting a article`…)
: grille des cartes déformée, images à 670 px au lieu de 190 px, page 33 % plus
haute.

### Principe : migrer l'outillage, pas le produit

La mise aux normes doit être **invisible pour l'utilisateur** : zéro régression
visuelle, zéro changement de comportement, sauf demande explicite.

| Autorisé sans demande                                  | Interdit sans demande explicite                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Ajouter des fichiers de config (ESLint, Prettier, CI…) | Supprimer, ajouter ou déplacer un élément du DOM (wrapper, balise)             |
| Reformater avec Prettier (commit dédié)                | Renommer ou supprimer une classe CSS, un `id`, une ancre                       |
| Ajouter des types, des tests, des scripts npm          | Modifier une valeur CSS (taille, couleur, marge, breakpoint…)                  |
| Corriger une erreur TS sans effet au runtime           | Changer un `href`, une route, un texte, une image                              |
| Mettre à jour une dépendance mineure/patch             | Introduire Tailwind, un store, un design system dans un projet qui a les siens |

### Ne pas tout copier : sections applicables

Le guide décrit une stack complète (Tailwind, Zustand, Framer Motion, React
Router…). Sur un projet existant, n'appliquer que ce qui correspond à sa stack
réelle :

| Section                                 | Projet existant                                                        |
| --------------------------------------- | ---------------------------------------------------------------------- |
| 3, 4, 5, 13, 14, 17, 18, 19 (outillage) | ✅ Applicable, en adaptant chemins et alias                            |
| 6, 7, 8, 9 (store, hooks, composants)   | ❌ Seulement si le projet utilise déjà ces briques ou si c'est demandé |
| 10 (Tailwind, thèmes)                   | ❌ Jamais sur un projet en SCSS/CSS : ses styles font foi              |
| 11, 12 (a11y, SEO)                      | ⚠️ Lister les problèmes, ne corriger qu'après accord (voir ci-dessous) |

### Un commit par nature de changement

Ne **jamais** mélanger reformatage et modifications réelles dans le même diff :
un reformatage massif rend la revue impossible.

1. `chore: ajoute la configuration prettier` puis
   `style: formate le code avec prettier` (commit qui ne contient **que** le
   reformatage)
2. `build: ...` / `ci: ...` pour l'outillage
3. `fix: ...` / `refactor: ...` pour chaque changement de code, un par sujet

Pour relire un diff en ignorant le reformatage :

```bash
git diff -w --stat
```

```bash
git diff -w -- '*.tsx' '*.ts' '*.scss'
```

### Avant de toucher au markup d'un composant

Toute modification de la structure JSX (balise, wrapper, `className`, `id`) doit
être précédée d'une recherche des sélecteurs qui en dépendent :

```bash
grep -rnE "\ba\b|\.ma-classe|#mon-id" src --include='*.scss' --include='*.css'
```

Si un sélecteur dépend de l'élément : **ne pas le modifier**, ou modifier le
markup **et** le CSS dans le même commit, avec une vérification visuelle.

### Erreur de lint sur du code existant

Une règle de lint ne justifie **jamais** de casser le rendu. Par ordre de
préférence :

1. corriger sans changer le DOM ni le rendu (attribut ARIA, `alt`,
   `type="button"`…) ;
2. sinon, désactivation ciblée et justifiée, puis signaler le point :

   ```tsx
   // eslint-disable-next-line jsx-a11y/anchor-is-valid -- lien de maquette, le SCSS cible ce <a>
   <a href="#">
   ```

3. ne jamais supprimer l'élément ni désactiver la règle pour tout le projet.

### Ne pas coder en dur ce que la config fournit

- Base du site : `import.meta.env.BASE_URL` (dérivé de `base` dans
  `vite.config.ts`), jamais `"/Booki/"` en dur dans un composant.
- Respecter la casse réelle des dossiers dans les imports (`./components/header`
  si le dossier s'appelle `header`) : macOS tolère l'erreur, la CI Linux non.

### Vérification visuelle obligatoire

Avant de rendre la main, comparer **avant / après** sur 3 largeurs (375, 800 et
1440 px) : captures d'écran, ou mesure des boîtes dans la console du navigateur
:

```js
// À exécuter sur la version d'origine puis sur la version modifiée : les résultats doivent être identiques
JSON.stringify(
  [...document.querySelectorAll('header, main section, article, footer')].map(
    (el) => {
      const r = el.getBoundingClientRect()
      return [el.tagName, el.className, r.x, r.y, r.width, r.height]
        .map(String)
        .join(' ')
    }
  )
)
```

Une différence de hauteur de page ou de taille de carte = régression à corriger
avant tout commit. `lint`, `type-check`, les tests et le build ne détectent
**pas** ce type de régression.

### Checklist de migration

- [ ] Sections du guide retenues listées et validées avec le propriétaire du
      projet
- [ ] Reformatage Prettier isolé dans son propre commit
- [ ] `git diff -w` relu : aucun changement de DOM, de classe, de valeur CSS ou
      de `href` non demandé
- [ ] Sélecteurs CSS vérifiés pour chaque composant dont le markup change
- [ ] Erreurs de lint corrigées sans changement de rendu (sinon désactivation
      ciblée + signalement)
- [ ] Comparaison visuelle avant/après à 375, 800 et 1440 px identique
- [ ] `npm run validate` ✅

---

## 1. Stack de base

| Outil                  | Version | Rôle                                  |
| ---------------------- | ------- | ------------------------------------- |
| **Node.js**            | 24 LTS  | Runtime (via `.nvmrc`)                |
| **Vite**               | 8.x     | Build tool & dev server               |
| **React**              | 18.x    | UI library                            |
| **TypeScript**         | 5.x     | Typage statique                       |
| **Vitest**             | 5.x     | Tests unitaires                       |
| **Tailwind CSS**       | 3.x     | Utility-first CSS                     |
| **SCSS**               | –       | Styles avancés (variables, mixins)    |
| **Zustand**            | 5.x     | State management global               |
| **Immer**              | 11.x    | Mutations immutables (avec Zustand)   |
| **Framer Motion**      | 14.x    | Animations                            |
| **React Router**       | 7.x     | Routing (HashRouter ou BrowserRouter) |
| **React Helmet Async** | 2.x     | SEO meta tags                         |
| **ESLint**             | 9.x     | Linting (flat config)                 |
| **Prettier**           | 3.x     | Formatage                             |
| **Husky**              | 9.x     | Git hooks                             |
| **Commitlint**         | 21.x    | Validation des messages de commit     |
| **lint-staged**        | 17.x    | Lint/format des fichiers indexés      |
| **axe-core**           | 4.x     | Audit d'accessibilité en dev          |

### Dépendances runtime vs dev

```jsonc
// dependencies (runtime)
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.x",
  "react-helmet-async": "^2.x",
  "zustand": "^5.x",
  "immer": "^11.x",
  "framer-motion": "^14.x",
  "@fontsource/roboto": "^5.x"
}

// devDependencies (outillage)
{
  // Build
  "vite": "^8.x",
  "@vitejs/plugin-react": "^6.x",
  "typescript": "^5.x",
  "@types/node": "^24.x",
  "@types/react": "^18.x",
  "@types/react-dom": "^18.x",
  "rollup-plugin-visualizer": "^7.x",

  // Styles
  "tailwindcss": "^3.x",
  "postcss": "^8.x",
  "autoprefixer": "^10.x",
  "sass": "^1.x",

  // Tests
  "vitest": "^5.x",
  "@vitest/coverage-v8": "^5.x",
  "@vitest/ui": "^5.x",
  "@testing-library/react": "^16.x",
  "@testing-library/dom": "^10.x", // peer dependency obligatoire depuis RTL 16
  "@testing-library/jest-dom": "^6.x",
  "@testing-library/user-event": "^14.x",
  "jsdom": "^26.x",

  // Lint & format
  "eslint": "^9.x",
  "@eslint/js": "^9.x",
  "globals": "^17.x",
  "typescript-eslint": "^8.x",
  "eslint-plugin-react-hooks": "^5.x",
  "eslint-plugin-react-refresh": "^0.4.x",
  "eslint-plugin-jsx-a11y": "^6.x",
  "prettier": "^3.x",

  // Git hooks
  "husky": "^9.x",
  "@commitlint/cli": "^21.x",
  "@commitlint/config-conventional": "^21.x",
  "lint-staged": "^17.x",

  // Accessibilité & déploiement
  "@axe-core/react": "^4.x",
  "gh-pages": "^6.x"
}
```

> ⚠️ **Toujours aligner les versions entre `package.json` et
> `package-lock.json`** – utiliser `npm install` (pas `npm ci`) pour mettre à
> jour, puis commit les deux fichiers ensemble.

> ℹ️ **React Router 7** : `react-router-dom` reste utilisable (il ré-exporte
> `react-router`). Les nouveaux projets peuvent importer directement depuis
> `react-router`.

---

## 2. Structure des dossiers

```
.
├── .github/
│   ├── dependabot.yml          # Mises à jour automatiques des dépendances
│   └── workflows/
│       └── ci.yml              # Pipeline CI/CD
├── .husky/
│   ├── pre-commit              # lint-staged
│   └── commit-msg              # commitlint
├── public/                     # Assets statiques copiés tels quels dans dist/
│   ├── 404.html                # Redirection des URLs inconnues (GitHub Pages)
│   └── manifest.json
├── src/
│   ├── app/                    # Configuration application (providers, etc.)
│   ├── assets/                 # Images, fonts + index des imports (images.tsx)
│   ├── components/             # Layout, Nav, Footer, SEO (communs)
│   ├── data/                   # Contenu statique (content.json, etc.)
│   ├── features/               # Features par domaine (optionnel)
│   ├── hooks/                  # Hooks personnalisés
│   ├── pages/                  # Pages routées (lazy-loaded)
│   ├── shared/
│   │   └── components/         # ErrorBoundary, LoadingSpinner, PageLoader, Toast
│   ├── store/                  # Store Zustand global
│   ├── styles/
│   │   ├── _variables.scss     # Variables SCSS (couleurs, espacements, etc.)
│   │   ├── index.scss          # Styles globaux
│   │   └── tailwind.css        # Directives Tailwind
│   ├── test/                   # Tous les tests + setup
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── shared/components/
│   │   ├── store/
│   │   ├── mocks/              # Mocks partagés (framer-motion, etc.)
│   │   └── setup.ts            # Setup global Vitest
│   ├── types/                  # Types globaux (optionnel)
│   ├── utils/                  # Utilitaires (optionnel)
│   ├── main.tsx                # Point d'entrée
│   └── vite-env.d.ts           # Types Vite
├── .env.example                # Variables d'environnement (template)
├── .gitignore
├── .nvmrc                      # Version Node.js
├── .prettierrc
├── commitlint.config.js
├── eslint.config.js            # Flat config ESLint 9
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json               # Référence (ne compile rien directement)
├── tsconfig.app.json           # Config app (src/)
├── tsconfig.node.json          # Config Node (vite.config.ts, etc.)
├── tsconfig.test.json          # Config tests
├── vite.config.ts
└── vitest.config.mjs           # Config Vitest (ou intégré dans vite.config.ts)
```

---

## 3. Configuration TypeScript

### `tsconfig.json` (référence, ne compile rien)

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.test.json" }
  ]
}
```

### `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@store/*": ["./src/store/*"],
      "@data/*": ["./src/data/*"],
      "@styles/*": ["./src/styles/*"],
      "@assets/*": ["./src/assets/*"],
      "@shared/*": ["./src/shared/*"],
      "@app/*": ["./src/app/*"],
      "@utils/*": ["./src/utils/*"],
      "@app-types/*": ["./src/types/*"],
      "@features/*": ["./src/features/*"]
    },

    /* Strict mode */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.d.ts"],
  "exclude": [
    "node_modules",
    "dist",
    "src/test/**/*",
    "**/*.test.ts",
    "**/*.test.tsx"
  ]
}
```

> ⚠️ **Pas de `vitest/globals` dans la config app** : les globals de test ne
> doivent être visibles que dans `tsconfig.test.json`, sinon `describe`/`it`
> passent le type-check dans le code applicatif.
>
> ⚠️ **Ne pas nommer un alias `@types/*`** : il entre en collision avec le scope
> npm `@types/` (paquets de typings). Utiliser `@app-types/*`.
>
> ℹ️ `baseUrl` n'est plus nécessaire avec `moduleResolution: "bundler"` : les
> `paths` sont résolus relativement au tsconfig.

### `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "types": ["node"],

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
```

> ℹ️ Seuls les fichiers `.ts` sont vérifiés ici. Les configs en `.js`/`.mjs`
> (Vitest, ESLint, Commitlint) ne seraient incluses qu'avec `allowJs` – inutile
> de les lister.

### `tsconfig.test.json`

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.test.tsbuildinfo",
    "types": ["vite/client", "vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

### `src/vite-env.d.ts`

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION?: string
  readonly VITE_BASE_URL?: string // Chemin de base du build (ex. /projet/ sur GitHub Pages)
  readonly VITE_SITE_URL?: string // URL publique complète (pour les meta og:/twitter:)
  readonly VITE_API_URL?: string
  // Ajoute tes variables ici
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

> ⚠️ **Ne jamais écraser les déclarations de modules** (ex:
> `declare module 'vitest'`) – cela casse le typage.

---

## 4. Configuration Vite

### `vite.config.ts`

```typescript
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isAnalyze = mode === 'analyze'
  const isProduction = mode === 'production'

  return {
    plugins: [
      react(),
      isAnalyze &&
        visualizer({
          filename: './dist/stats.html',
          open: !process.env.CI, // ⚠️ Ne jamais ouvrir de navigateur en CI
          gzipSize: true,
          brotliSize: true,
          template: 'treemap',
        }),
    ].filter(Boolean),

    // Base URL (adapter selon le déploiement : GitHub Pages, Vercel, etc.)
    base: env.VITE_BASE_URL || '/',

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@store': path.resolve(__dirname, './src/store'),
        '@data': path.resolve(__dirname, './src/data'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@app': path.resolve(__dirname, './src/app'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@app-types': path.resolve(__dirname, './src/types'),
        '@features': path.resolve(__dirname, './src/features'),
      },
    },

    server: {
      port: 3000,
      strictPort: false,
      host: 'localhost', // ⚠️ Sécurité : ne pas exposer sur 0.0.0.0
      open: true,
    },

    preview: {
      port: 4173,
      strictPort: false,
      host: 'localhost',
      open: true,
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Content-Security-Policy': [
          "default-src 'self'",
          // 'unsafe-inline' requis par le script anti-flash du thème dans index.html
          // (ou remplacer par son hash : 'sha256-...'). Jamais de 'unsafe-eval'.
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "font-src 'self'",
          "img-src 'self' data: https:",
          "connect-src 'self'",
          "frame-ancestors 'none'",
        ].join('; '),
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: isProduction ? 'hidden' : true,
      target: 'esnext',
      minify: isProduction,
      chunkSizeWarningLimit: 500,
      // ⚠️ Vite 8 (Rolldown) : `rollupOptions` et `output.manualChunks` sont dépréciés.
      // Utiliser `rolldownOptions` + `output.codeSplitting.groups`.
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              // Regex sur le chemin exact du paquet : `/react/` seul capturerait aussi
              // react-helmet-async, @axe-core/react, etc.
              {
                name: 'vendor-react',
                test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
                priority: 30,
              },
              {
                name: 'vendor-motion',
                test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/,
                priority: 20,
              },
              {
                name: 'vendor-state',
                test: /node_modules[\\/](zustand|immer)[\\/]/,
                priority: 20,
              },
              {
                name: 'vendor-fonts',
                test: /node_modules[\\/]@fontsource[\\/]/,
                priority: 20,
              },
              { name: 'vendor', test: /node_modules/, priority: 10 },
            ],
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') || []
            const ext = info[info.length - 1]
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`
            }
            return `assets/[name]-[hash][extname]`
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      cssCodeSplit: true,
      reportCompressedSize: true,
    },

    css: {
      devSourcemap: true,
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isProduction
          ? '[hash:base64:5]'
          : '[name]__[local]__[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@styles/variables" as *;`,
          silenceDeprecations: ['legacy-js-api', 'import'],
        },
      },
    },

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-helmet-async',
        'zustand',
        'framer-motion',
      ],
    },

    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
  }
})
```

---

## 5. ESLint & Prettier

### `eslint.config.js` (flat config ESLint 9)

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'coverage',
      '*.config.js',
      '*.config.ts',
      '.husky',
      '.vitest',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.es2022 },
      parserOptions: {
        projectService: { allowDefaultProject: ['*.config.js', '*.config.ts'] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // React
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Accessibilité (tout le preset recommandé, pas seulement 3 règles)
      ...jsxA11y.configs.recommended.rules,

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // Général
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    // Fichiers de test : règles assouplies
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', 'src/test/**/*'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.vitest },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-console': 'off',
      'react-refresh/only-export-components': 'off',
    },
  }
)
```

> ℹ️ Avec `--max-warnings 0` dans le script `lint`, les règles en `warn`
> bloquent aussi la CI : elles signalent sans casser l'éditeur, mais doivent
> être corrigées avant merge.

### `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "overrides": [
    { "files": "*.json", "options": { "printWidth": 80 } },
    { "files": "*.md", "options": { "proseWrap": "always", "printWidth": 80 } }
  ]
}
```

---

## 6. Store Zustand (state management)

### Pattern recommandé : `partialize` + `merge` + sélecteurs + helpers purs

```typescript
// src/store/appStore.ts
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type Theme = 'light' | 'dark' | 'system'
export type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface UserPreferences {
  theme: Theme
  language: 'fr' | 'en'
  reducedMotion: boolean
}

export interface Notification {
  id: string
  type: NotificationType // ✅ Union stricte : permet d'indexer les styles sans erreur TS
  message: string
  duration?: number // ms, 0 = pas de fermeture automatique
}

interface AppState {
  // État persisté
  preferences: UserPreferences

  // État dérivé / transitoire (NON persisté)
  isDarkMode: boolean // ✅ Dérivé de preferences.theme + OS, jamais persisté
  isLoading: boolean
  notifications: Notification[]

  // Actions
  setTheme: (theme: Theme) => void
  toggleDarkMode: () => void
  setSystemDarkMode: (enabled: boolean) => void
  setLoading: (loading: boolean) => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

// ✅ Helpers purs (testables isolément)
const getSystemDarkMode = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function')
    return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const resolveDarkMode = (theme: Theme): boolean =>
  theme === 'system' ? getSystemDarkMode() : theme === 'dark'

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        preferences: {
          theme: 'system',
          language: 'fr',
          reducedMotion: false,
        },
        isDarkMode: getSystemDarkMode(),
        isLoading: false,
        notifications: [],

        // Actions
        setTheme: (theme) =>
          set((state) => {
            state.preferences.theme = theme
            state.isDarkMode = resolveDarkMode(theme)
          }),

        toggleDarkMode: () =>
          set((state) => {
            state.isDarkMode = !state.isDarkMode
            state.preferences.theme = state.isDarkMode ? 'dark' : 'light'
          }),

        // Appelé par le listener matchMedia : ne s'applique qu'en mode "system"
        setSystemDarkMode: (enabled) =>
          set((state) => {
            if (state.preferences.theme === 'system') state.isDarkMode = enabled
          }),

        setLoading: (loading) =>
          set((state) => {
            state.isLoading = loading
          }),

        addNotification: (notification) => {
          const id = crypto.randomUUID()
          set((state) => {
            state.notifications.push({ ...notification, id })
          })
          // Fermeture automatique (5 s par défaut)
          const duration = notification.duration ?? 5000
          if (duration > 0)
            setTimeout(() => get().removeNotification(id), duration)
        },

        removeNotification: (id) =>
          set((state) => {
            state.notifications = state.notifications.filter((n) => n.id !== id)
          }),
      })),
      {
        name: 'app-store', // ⚠️ Doit correspondre à la clé lue par le script anti-flash d'index.html
        // ✅ Ne persister QUE les préférences, pas l'état transitoire
        partialize: (state) => ({
          preferences: state.preferences,
        }),
        // ✅ Recalculer l'état dérivé au rechargement (le thème "system" suit l'OS)
        merge: (persisted, current) => {
          const preferences = {
            ...current.preferences,
            ...(persisted as Partial<Pick<AppState, 'preferences'>> | undefined)
              ?.preferences,
          }
          return {
            ...current,
            preferences,
            isDarkMode: resolveDarkMode(preferences.theme),
          }
        },
      }
    ),
    {
      name: 'App Store',
      enabled: import.meta.env.DEV,
    }
  )
)

// ✅ Sélecteurs dédiés pour éviter les re-renders inutiles
export const usePreferences = () => useAppStore((state) => state.preferences)
export const useTheme = () => useAppStore((state) => state.preferences.theme)
export const useSetTheme = () => useAppStore((state) => state.setTheme)
export const useIsDarkMode = () => useAppStore((state) => state.isDarkMode)
export const useToggleDarkMode = () =>
  useAppStore((state) => state.toggleDarkMode)
export const useIsLoading = () => useAppStore((state) => state.isLoading)
export const useNotifications = () =>
  useAppStore((state) => state.notifications)
export const useRemoveNotification = () =>
  useAppStore((state) => state.removeNotification)

export default useAppStore
```

### Règles Zustand

| Règle                                                                  | Pourquoi                                                                               |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `partialize` pour ne persister que le nécessaire                       | Éviter de stocker l'état transitoire (loading, notifications) ou dérivé (`isDarkMode`) |
| `merge` pour recalculer l'état dérivé au rechargement                  | Le thème "system" doit suivre l'OS à chaque chargement                                 |
| Stocker l'état dérivé (`isDarkMode`) plutôt que le recalculer au rendu | Un changement de l'OS met à jour le store → re-render garanti                          |
| Sélecteurs dédiés (`useTheme`, `useIsLoading`)                         | Éviter les re-renders quand une partie du state change                                 |
| Helpers purs (`resolveDarkMode`, `getSystemDarkMode`)                  | Testables isolément, pas besoin de mocker React                                        |
| Types en union stricte (`NotificationType`)                            | Indexer des objets de styles sans `any` implicite                                      |
| `immer` middleware                                                     | Mutations lisibles (`state.x = y` au lieu de `{...state, x: y}`)                       |
| Effets de bord (DOM, timers) hors du `set()`                           | Le producer immer doit rester pur                                                      |

---

## 7. Hooks personnalisés

### `useDarkMode` – Gestion du thème avec préférence système

```typescript
// src/hooks/useDarkMode.ts
import { useEffect } from 'react'
import {
  useAppStore,
  useIsDarkMode,
  useSetTheme,
  useToggleDarkMode,
  type Theme,
} from '@store/appStore'

/** Couleurs de l'UI navigateur, identiques à --color-surface */
const THEME_COLORS = { light: '#ffffff', dark: '#0a0a0a' }

interface UseDarkModeReturn {
  isDarkMode: boolean
  toggleDarkMode: () => void
  setTheme: (theme: Theme) => void
}

export function useDarkMode(): UseDarkModeReturn {
  const isDarkMode = useIsDarkMode()
  const toggleDarkMode = useToggleDarkMode()
  const setTheme = useSetTheme()
  const setSystemDarkMode = useAppStore((state) => state.setSystemDarkMode)

  // Appliquer la classe + theme-color
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        'content',
        isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light
      )
  }, [isDarkMode])

  // Écouter les changements système.
  // ⚠️ Ne PAS appeler setTheme('system') ici : la valeur est inchangée, immer
  // renvoie le même état et aucun re-render n'a lieu. On écrit la nouvelle
  // valeur de l'OS (e.matches) dans le store, qui l'ignore hors mode "system".
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) =>
      setSystemDarkMode(e.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setSystemDarkMode])

  return { isDarkMode, toggleDarkMode, setTheme }
}

export default useDarkMode
```

### `useMediaQuery` – Breakpoints responsive

```typescript
// src/hooks/useMediaQuery.ts
import { useState, useEffect, useCallback } from 'react'

export function useMediaQuery(query: string): boolean {
  const getMatches = useCallback((mediaQuery: string): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(mediaQuery).matches
  }, [])

  const [matches, setMatches] = useState<boolean>(() => getMatches(query))

  useEffect(() => {
    // Les effets ne s'exécutent que côté navigateur : pas de garde `window` ici
    // (un `return` nu cohabitant avec `return () => …` déclenche noImplicitReturns).
    const mediaQueryList = window.matchMedia(query)
    setMatches(mediaQueryList.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // addEventListener est supporté partout depuis Safari 14 (2020) :
    // plus besoin du fallback addListener (déprécié).
    mediaQueryList.addEventListener('change', handleChange)
    return () => mediaQueryList.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

// Helpers prédéfinis
export const useIsMobile = () => useMediaQuery('(max-width: 639px)')
export const useIsTablet = () =>
  useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const usePrefersDarkMode = () =>
  useMediaQuery('(prefers-color-scheme: dark)')
export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')
export const useIsTouchDevice = () =>
  useMediaQuery('(hover: none) and (pointer: coarse)')

export default useMediaQuery
```

---

## 8. Composants réutilisables

### `ErrorBoundary` – Attrape les erreurs React

```typescript
// src/shared/components/ErrorBoundary/index.tsx
import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom' // ⚠️ Doit être DANS le Router

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary:', error, errorInfo)
    }
    this.props.onError?.(error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="min-h-screen flex items-center justify-center bg-surface px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center"
          >
            <h1 className="text-3xl font-bold text-fg mb-4">Oups ! Une erreur est survenue</h1>
            <p className="text-fg-muted mb-6">
              Quelque chose s'est mal passé. Veuillez réessayer.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left bg-surface-raised rounded-lg p-4">
                <summary className="cursor-pointer text-sm text-fg-muted">
                  Détails (dev)
                </summary>
                <pre className="mt-2 text-xs text-red-500 overflow-auto max-h-40">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg"
              >
                Réessayer
              </button>
              <Link
                to="/"
                onClick={this.handleReset}
                className="px-6 py-3 bg-surface-raised text-fg rounded-lg"
              >
                Retour à l'accueil
              </Link>
            </div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
```

> ⚠️ **Placement** : L'ErrorBoundary doit être **DANS le Router** (pour utiliser
> `Link`), pas à l'extérieur.

```tsx
// ✅ Correct
<Router>
  <ErrorBoundary>
    <Routes>...</Routes>
  </ErrorBoundary>
</Router>

// ❌ Incorrect (Link ne fonctionnera pas)
<ErrorBoundary>
  <Router>
    <Routes>...</Routes>
  </Router>
</ErrorBoundary>
```

### `LoadingSpinner` – Indicateur de chargement

```typescript
// src/shared/components/LoadingSpinner/index.tsx
// Animation 100 % CSS (animate-spin) : pas besoin de framer-motion ici,
// et la règle globale prefers-reduced-motion la neutralise automatiquement.

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'white'
  className?: string
}

const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }
const variants = {
  primary: 'border-primary-600 border-t-transparent',
  white: 'border-white border-t-transparent',
}

export function LoadingSpinner({ size = 'md', variant = 'primary', className = '' }: LoadingSpinnerProps) {
  return (
    <div role="status" className={`inline-flex ${className}`}>
      <span
        aria-hidden="true"
        className={`${sizes[size]} ${variants[variant]} border-2 rounded-full animate-spin`}
      />
      <span className="sr-only">Chargement en cours…</span>
    </div>
  )
}

export default LoadingSpinner
```

### `PageLoader` – Chargement full-page (Suspense)

```typescript
// src/shared/components/PageLoader/index.tsx
import { motion } from 'framer-motion'
import { LoadingSpinner } from '../LoadingSpinner'

interface PageLoaderProps {
  fullPage?: boolean
  message?: string
}

export function PageLoader({ fullPage = true, message = 'Chargement...' }: PageLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={
        fullPage
          ? 'min-h-screen flex flex-col items-center justify-center bg-surface'
          : 'flex flex-col items-center justify-center py-20'
      }
    >
      <LoadingSpinner size="lg" />
      {message && <p className="mt-4 text-fg-muted">{message}</p>}
    </motion.div>
  )
}

export default PageLoader
```

### `Toast` – Système de notifications

```typescript
// src/shared/components/Toast/index.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useNotifications, useRemoveNotification, type NotificationType } from '@store/appStore'

// ✅ Record<NotificationType, …> : l'indexation par notification.type est typée
// ✅ Teintes 700 (et texte noir sur jaune) : contraste ≥ 4.5:1 avec le texte
const variants: Record<NotificationType, string> = {
  success: 'bg-green-700 text-white',
  error: 'bg-red-700 text-white',
  warning: 'bg-yellow-400 text-black',
  info: 'bg-blue-700 text-white',
}

export function ToastContainer() {
  const notifications = useNotifications()
  const removeNotification = useRemoveNotification()

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`px-4 py-3 rounded-lg shadow-lg ${variants[notification.type]}`}
            // Les erreurs interrompent le lecteur d'écran, le reste est annoncé poliment
            role={notification.type === 'error' ? 'alert' : 'status'}
          >
            <div className="flex items-center justify-between gap-4">
              <span>{notification.message}</span>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-sm opacity-70 hover:opacity-100"
                aria-label="Fermer la notification"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer
```

---

## 9. Point d'entrée & routing

### `src/main.tsx`

```tsx
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense, lazy } from 'react'

// Point d'entrée unique des styles : importe tailwind.css et déclare les
// @font-face Roboto (sous-ensemble latin uniquement, via @fontsource/roboto/files/*)
import '@styles/index.scss'

import { ErrorBoundary } from '@shared/components/ErrorBoundary'
import { PageLoader } from '@shared/components/PageLoader'
import { ToastContainer } from '@shared/components/Toast'
import Layout from '@components/Layout' // Chargé immédiatement : présent sur toutes les pages

// ✅ Pages en lazy loading → un chunk par page
const Home = lazy(() => import('@pages/Home'))
const Documentation = lazy(() => import('@pages/Documentation'))
const ErrorPage = lazy(() => import('@pages/ErrorPage'))

// ✅ Audit d'accessibilité dans la console, en dev uniquement (exclu du bundle de prod)
if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => axe.default(React, ReactDOM, 1000))
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="documentation" element={<Documentation />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </Suspense>
          <ToastContainer />
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
)
```

### Ordre des providers

| Niveau | Composant        | Pourquoi                                                          |
| ------ | ---------------- | ----------------------------------------------------------------- |
| 1      | `HelmetProvider` | Requis par tous les `<Helmet>` (SEO)                              |
| 2      | `Router`         | `ErrorBoundary`, `Layout` et `Nav` utilisent `Link`/`useLocation` |
| 3      | `ErrorBoundary`  | Attrape aussi les erreurs de chargement des chunks lazy           |
| 4      | `Suspense`       | Affiche `PageLoader` pendant le chargement d'une page             |

### HashRouter ou BrowserRouter ?

|                                     | `HashRouter`                                                          | `BrowserRouter`                                                                                    |
| ----------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| URLs                                | `/#/documentation`                                                    | `/documentation`                                                                                   |
| Hébergement statique (GitHub Pages) | ✅ Fonctionne tel quel (`404.html` conseillé pour les liens sans `#`) | ⚠️ `404.html` + script de décodage obligatoires (voir [Déploiement](#15-déploiement-github-pages)) |
| SEO                                 | ❌ Le hash n'est pas indexé comme une page distincte                  | ✅                                                                                                 |
| Skip link `#main-content`           | ⚠️ `preventDefault` + `focus()` manuel                                | ✅ Natif                                                                                           |

> ✅ **Règle** : `HashRouter` pour les sites vitrines/démos sur GitHub Pages,
> `BrowserRouter` dès que le SEO par page compte ou que l'hébergeur gère le
> fallback SPA (Vercel, Netlify, Cloudflare Pages).

### `Layout` – Squelette commun

```tsx
// src/components/Layout/index.tsx
import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@components/Nav'
import Footer from '@components/Footer'
import SEO from '@components/Seo'
import { PageLoader } from '@shared/components/PageLoader'

function Layout() {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen bg-surface text-fg transition-colors duration-300">
      {/* 1. Skip link en tout premier élément focusable (voir Accessibilité) */}
      <a
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
      >
        Aller au contenu principal
      </a>

      <SEO title="…" />
      <Nav />

      <main id="main-content" className="flex-grow" tabIndex={-1}>
        {/* Transition entre pages : la clé change à chaque route */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Suspense local : la Nav et le Footer restent affichés pendant le chargement */}
            <Suspense fallback={<PageLoader fullPage={false} />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default Layout
```

### `Nav` – Règles à respecter

Le composant complet est dans `src/components/Nav/index.tsx` du projet TGV.
Points obligatoires :

- `<nav aria-label="Navigation principale">` (un `aria-label` distinct pour
  chaque `<nav>` de la page)
- Liens générés depuis `content.json` (une seule source de vérité pour Nav,
  Footer et SEO)
- Lien actif : `aria-current="page"` **et** un indicateur visuel autre que la
  couleur seule
- Bouton de thème : `aria-label` dynamique (« Activer le mode clair/sombre ») +
  `aria-pressed={isDarkMode}`
- Menu mobile : bouton avec `aria-expanded` + `aria-controls="mobile-menu"`,
  fermeture au clic sur un lien
- Icônes SVG décoratives : pas de texte alternatif, le libellé est porté par le
  bouton

### `Footer` – Règles à respecter

- `<footer>` (rôle `contentinfo` implicite) placé après `<main>`
- Année calculée (`new Date().getFullYear()`), jamais en dur
- Version affichée depuis `import.meta.env.VITE_APP_VERSION`
- `<nav aria-label="Liens de pied de page">` pour les liens secondaires

---

## 10. Design System & Thèmes

### Variables CSS sémantiques (RGB channels)

```scss
// src/styles/index.scss (ou _variables.scss)

// ============================================
// Theme tokens (RGB channels pour Tailwind)
// Contrastes WCAG AA vérifiés (≥ 4.5:1)
// ============================================

:root {
  color-scheme: light;
  --color-surface: 255 255 255;
  --color-surface-raised: 243 244 246;
  --color-surface-sunken: 249 250 251;
  --color-fg: 17 24 39;
  --color-fg-muted: 55 65 81;
  --color-fg-subtle: 75 85 99;
  --color-line: 229 231 235;
  --color-accent: 29 78 216;
}

:root.dark {
  color-scheme: dark;
  --color-surface: 10 10 10;
  --color-surface-raised: 31 41 55;
  --color-surface-sunken: 17 24 39;
  --color-fg: 243 244 246;
  --color-fg-muted: 209 213 219;
  --color-fg-subtle: 156 163 175;
  --color-line: 55 65 81;
  --color-accent: 96 165 250;
}
```

### Tailwind config avec couleurs sémantiques

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ⚠️ 'class', pas 'media' (on contrôle via Zustand)
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Couleurs sémantiques (utilisent les variables CSS RGB)
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-raised': 'rgb(var(--color-surface-raised) / <alpha-value>)',
        'surface-sunken': 'rgb(var(--color-surface-sunken) / <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        'fg-muted': 'rgb(var(--color-fg-muted) / <alpha-value>)',
        'fg-subtle': 'rgb(var(--color-fg-subtle) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        // Couleurs primaires (échelle)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... etc
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
```

### `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### `src/styles/tailwind.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> ℹ️ Importé une seule fois, depuis `index.scss` (lui-même importé par
> `main.tsx`).

### Application du thème avant le premier rendu (pas de flash)

Script inline à placer dans le `<head>` d'`index.html`, **avant** tout CSS et
avant `main.tsx` (voir le [index.html complet](#indexhtml-enrichi)) :

```html
<script>
  ;(function () {
    try {
      // ⚠️ Même clé que `name` dans la config persist du store
      var saved = JSON.parse(localStorage.getItem('app-store') || 'null')
      var theme =
        saved &&
        saved.state &&
        saved.state.preferences &&
        saved.state.preferences.theme
      // Pas de préférence enregistrée (1re visite) = "system" → on suit l'OS
      var dark =
        theme === 'dark' ||
        (theme !== 'light' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.classList.toggle('dark', dark)
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute('content', dark ? '#0a0a0a' : '#ffffff')
    } catch (e) {}
  })()
</script>
```

| Piège                                                | Conséquence                                                                  |
| ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| Ne tester que `if (stored)`                          | 1re visite avec OS en sombre → flash blanc                                   |
| Clé `localStorage` différente du store               | Le thème choisi n'est jamais relu                                            |
| `const`/`?.` dans le script                          | Inutile : le script n'est pas transpilé, rester en ES5 pour la compatibilité |
| `<meta name="theme-color">` déclarée après le script | `querySelector` renvoie `null` → déclarer la meta **avant** le script        |

### `prefers-reduced-motion` global

```scss
// src/styles/index.scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 11. Accessibilité (a11y)

### Checklist WCAG AA

| Critère                 | Implémentation                                               |
| ----------------------- | ------------------------------------------------------------ |
| **Contraste**           | ≥ 4.5:1 pour le texte normal, ≥ 3:1 pour le texte large      |
| **Focus visible**       | `:focus-visible` avec outline customisé                      |
| **Skip link**           | Lien "Aller au contenu" en premier, focus sur `<main>`       |
| **ARIA labels**         | Tous les boutons/contrôles interactifs ont un `aria-label`   |
| **Rôles sémantiques**   | `<nav>`, `<main>`, `<footer>`, `<header>`                    |
| **Alt text**            | Toutes les images ont un `alt` descriptif                    |
| **Reduced motion**      | `@media (prefers-reduced-motion: reduce)` global             |
| **Langue**              | `<html lang="fr">` (ou autre)                                |
| **Touch targets**       | ≥ 44×44px pour les zones tactiles                            |
| **Annonces dynamiques** | `aria-live` / `role="status"` pour les toasts et chargements |
| **États des contrôles** | `aria-pressed`, `aria-expanded`, `aria-current` à jour       |

### Outils de vérification

| Outil                                                          | Quand                   | Ce qu'il détecte                                                                        |
| -------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------- |
| `eslint-plugin-jsx-a11y`                                       | À chaque lint / commit  | Erreurs statiques dans le JSX (alt manquant, rôles invalides…)                          |
| `@axe-core/react`                                              | En dev, dans la console | Erreurs au rendu réel (contraste, labels, landmarks)                                    |
| Tests RTL par rôle (`getByRole`)                               | En CI                   | Régression des noms accessibles                                                         |
| Navigation clavier manuelle + lecteur d'écran (VoiceOver/NVDA) | Avant chaque release    | Ce que les outils automatiques ne voient pas (ordre de focus, pertinence des libellés…) |

### Skip link avec HashRouter

```tsx
// ⚠️ Avec HashRouter, le lien #main-content ne fonctionne pas nativement
// Il faut preventDefault + focus manuel

<a
  href="#main-content"
  onClick={(event) => {
    event.preventDefault()
    document.getElementById('main-content')?.focus()
  }}
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
>
  Aller au contenu principal
</a>

<main id="main-content" tabIndex={-1}>
  {/* Contenu */}
</main>
```

### Focus visible customisé

```scss
// src/styles/index.scss
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

// Supprimer le focus pour les souris (garder pour le clavier)
:focus:not(:focus-visible) {
  outline: none;
}
```

---

## 12. SEO & Meta

### `index.html` enrichi

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/logo.png" />
    <link rel="apple-touch-icon" href="/logo.png" />

    <!-- Theme color (mis à jour dynamiquement par useDarkMode) – AVANT le script anti-flash -->
    <meta name="theme-color" content="#ffffff" />

    <!-- Script anti-flash du thème : copier le script de la section Design System & Thèmes -->
    <script>
      /* … */
    </script>

    <!-- SEO de base -->
    <title>Mon Site | Description</title>
    <meta
      name="description"
      content="Description du site (150-160 caractères)"
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://monsite.com/" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Mon Site" />
    <meta property="og:title" content="Mon Site | Description" />
    <meta property="og:description" content="Description du site" />
    <meta property="og:image" content="https://monsite.com/banner.png" />
    <meta property="og:url" content="https://monsite.com/" />
    <meta property="og:locale" content="fr_FR" />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Mon Site | Description" />
    <meta name="twitter:description" content="Description du site" />
    <meta name="twitter:image" content="https://monsite.com/banner.png" />

    <!-- JSON-LD (Schema.org) -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Mon Site",
        "url": "https://monsite.com/",
        "description": "Description du site"
      }
    </script>

    <!-- Manifest PWA -->
    <link rel="manifest" href="/manifest.json" />
  </head>
  <body>
    <div id="root"></div>
    <noscript>Ce site nécessite JavaScript pour fonctionner.</noscript>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `public/manifest.json`

```json
{
  "name": "Mon Site",
  "short_name": "MonSite",
  "description": "Description du site",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/logo.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/logo.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

> ℹ️ Les chemins absolus (`/logo.png`, `/manifest.json`) sont automatiquement
> préfixés par `base` au build par Vite. Les URLs `og:*`, `twitter:*` et
> `canonical` doivent en revanche être **absolues avec le domaine** : les
> réseaux sociaux ignorent les URLs relatives.

### Composant SEO dynamique

```typescript
// src/components/Seo/index.tsx
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
}

// URL publique complète du site, ex. https://monsite.com/ ou https://user.github.io/projet/
const SITE_URL = import.meta.env.VITE_SITE_URL ?? window.location.origin + import.meta.env.BASE_URL

/** Transforme un chemin relatif en URL absolue (obligatoire pour og:image / twitter:image) */
const toAbsoluteUrl = (path: string): string => new URL(path.replace(/^\//, ''), SITE_URL).href

export function SEO({
  title,
  description = 'Description par défaut',
  image = '/banner.png',
  url = window.location.href,
  noIndex = false,
}: SEOProps) {
  const fullTitle = `${title} | Mon Site`
  const imageUrl = toAbsoluteUrl(image)

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <link rel="canonical" href={url} />
    </Helmet>
  )
}

export default SEO
```

---

## 13. Tests (Vitest)

### Configuration `vitest.config.mjs`

```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      // ✅ Inclure explicitement src/ : les fichiers jamais importés par un test
      // comptent alors comme 0 % au lieu d'être ignorés
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mocks/',
        'src/main.tsx',
        'src/vite-env.d.ts',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
    reporters: ['default', 'html'],
    outputFile: {
      html: '.vitest/index.html',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@data': path.resolve(__dirname, './src/data'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@app': path.resolve(__dirname, './src/app'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@app-types': path.resolve(__dirname, './src/types'),
      '@features': path.resolve(__dirname, './src/features'),
    },
  },
})
```

### Setup global `src/test/setup.ts`

```typescript
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.clearAllMocks() // Remet les compteurs à zéro sans supprimer les implémentations
})

// ⚠️ Mocks installés au niveau module, PAS dans beforeAll : les fichiers de test
// importent le store pendant la phase de collecte, avant l'exécution des hooks.
// Avec beforeAll, `persist` capture le vrai localStorage de jsdom et
// `getSystemDarkMode()` appelle un matchMedia inexistant.
{
  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  // Mock IntersectionObserver
  globalThis.IntersectionObserver = class IntersectionObserver {
    readonly root = null
    readonly rootMargin = ''
    readonly thresholds = []
    disconnect() {}
    observe() {}
    takeRecords() {
      return []
    }
    unobserve() {}
  }

  // Mock ResizeObserver
  globalThis.ResizeObserver = class ResizeObserver {
    disconnect() {}
    observe() {}
    unobserve() {}
  }

  // Mock scrollTo
  window.scrollTo = vi.fn()

  // Mock localStorage
  const createStorageMock = () => {
    let store: Record<string, string> = {}
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key]
      }),
      clear: vi.fn(() => {
        store = {}
      }),
      get length() {
        return Object.keys(store).length
      },
      key: vi.fn((index: number) => Object.keys(store)[index] || null),
    }
  }

  Object.defineProperty(window, 'localStorage', {
    value: createStorageMock(),
    writable: true,
  })
  Object.defineProperty(window, 'sessionStorage', {
    value: createStorageMock(),
    writable: true,
  })
}
```

### Mock framer-motion `src/test/mocks/framer-motion.tsx`

```typescript
/**
 * Mock léger de framer-motion pour les tests.
 * Rend motion.<tag> comme l'élément DOM natif, en supprimant les props d'animation.
 */
import { createElement, forwardRef, type ReactNode } from 'react'

const MOTION_PROPS = new Set([
  'initial', 'animate', 'exit', 'transition', 'variants',
  'whileHover', 'whileTap', 'whileInView', 'whileFocus',
  'viewport', 'layout', 'layoutId',
])

const cache = new Map<string, unknown>()

const createMotionComponent = (tag: string) =>
  forwardRef<HTMLElement, { children?: ReactNode; [key: string]: unknown }>(
    ({ children, ...props }, ref) => {
      const domProps = Object.fromEntries(
        Object.entries(props).filter(([key]) => !MOTION_PROPS.has(key))
      )
      return createElement(tag, { ...domProps, ref }, children as ReactNode)
    }
  )

export const motion = new Proxy({}, {
  get: (_target, tag: string) => {
    if (!cache.has(tag)) cache.set(tag, createMotionComponent(tag))
    return cache.get(tag)
  },
})

export const AnimatePresence = ({ children }: { children?: ReactNode }) => <>{children}</>
```

### Exemple de test de composant

```typescript
// src/test/components/Nav.test.tsx
import type { ReactElement } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Nav from '../../components/Nav'

// Mock framer-motion
vi.mock('framer-motion', () => import('../mocks/framer-motion'))

// Mock le store
vi.mock('@store/appStore', () => ({
  useAppStore: vi.fn((selector) => selector({ preferences: { theme: 'light' } })),
  useTheme: () => 'light',
  useSetTheme: () => vi.fn(),
}))

// Mock les hooks
vi.mock('@hooks/useDarkMode', () => ({
  useDarkMode: () => ({ isDarkMode: false, toggleDarkMode: vi.fn() }),
}))

vi.mock('@hooks/useMediaQuery', () => ({
  useIsMobile: () => false,
}))

const renderWithRouter = (ui: ReactElement, route = '/') =>
  render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)

describe('Nav Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('affiche le logo', () => {
    renderWithRouter(<Nav />)
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument()
  })

  it('affiche les liens de navigation', () => {
    renderWithRouter(<Nav />)
    expect(screen.getByRole('link', { name: /accueil/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /documentation/i })).toBeInTheDocument()
  })

  it('met en surbrillance le lien actif', () => {
    renderWithRouter(<Nav />, '/documentation')
    const activeLink = screen.getByRole('link', { name: /documentation/i })
    expect(activeLink).toHaveAttribute('aria-current', 'page')
  })
})
```

### Exemple de test de hook

```typescript
// src/test/hooks/useMediaQuery.test.ts
import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { useMediaQuery, useIsMobile } from '../../hooks/useMediaQuery'

describe('useMediaQuery', () => {
  let matchMediaMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    matchMediaMock = vi.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: matchMediaMock,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const createMediaQueryList = (matches: boolean) => ({
    matches,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })

  it('retourne true quand la media query match', () => {
    matchMediaMock.mockReturnValue(createMediaQueryList(true))
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('retourne false quand la media query ne match pas', () => {
    matchMediaMock.mockReturnValue(createMediaQueryList(false))
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('met à jour quand la media query change', () => {
    const mql = createMediaQueryList(false)
    matchMediaMock.mockReturnValue(mql)

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    // Simuler un changement
    act(() => {
      mql.matches = true
      mql.addEventListener.mock.calls[0][1]({ matches: true })
    })

    expect(result.current).toBe(true)
  })
})

describe('useIsMobile', () => {
  it('retourne true sur mobile', () => {
    const mql = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    vi.spyOn(window, 'matchMedia').mockReturnValue(
      mql as unknown as MediaQueryList
    )

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })
})
```

### Exemple de test de store Zustand

```typescript
// src/test/store/appStore.test.ts
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { useAppStore } from '../../store/appStore'

describe('App Store', () => {
  beforeEach(() => {
    // Reset le store avant chaque test
    useAppStore.setState({
      preferences: { theme: 'system', language: 'fr', reducedMotion: false },
      isDarkMode: false,
      isLoading: false,
      notifications: [],
    })
    localStorage.clear()
  })

  describe('Theme', () => {
    it('change le thème et recalcule isDarkMode', () => {
      useAppStore.getState().setTheme('dark')
      expect(useAppStore.getState().preferences.theme).toBe('dark')
      expect(useAppStore.getState().isDarkMode).toBe(true)
    })

    it("suit l'OS uniquement en mode system", () => {
      useAppStore.getState().setSystemDarkMode(true)
      expect(useAppStore.getState().isDarkMode).toBe(true)

      useAppStore.getState().setTheme('light')
      useAppStore.getState().setSystemDarkMode(true)
      expect(useAppStore.getState().isDarkMode).toBe(false) // ✅ Choix explicite respecté
    })

    it('recalcule isDarkMode à la réhydratation', async () => {
      localStorage.setItem(
        'app-store',
        JSON.stringify({
          state: { preferences: { theme: 'dark' } },
          version: 0,
        })
      )
      await useAppStore.persist.rehydrate()
      expect(useAppStore.getState().isDarkMode).toBe(true)
    })

    it('persiste uniquement les préférences', () => {
      useAppStore.getState().setTheme('dark')
      useAppStore.getState().addNotification({ message: 'Test', type: 'info' })

      const stored = JSON.parse(localStorage.getItem('app-store') || '{}')
      expect(stored.state.preferences.theme).toBe('dark')
      expect(stored.state.notifications).toBeUndefined() // ✅ Pas persisté
      expect(stored.state.isLoading).toBeUndefined() // ✅ Pas persisté
      expect(stored.state.isDarkMode).toBeUndefined() // ✅ Dérivé, pas persisté
    })
  })

  describe('Notifications', () => {
    afterEach(() => {
      vi.useRealTimers()
    })

    it('ferme automatiquement une notification après sa durée', () => {
      vi.useFakeTimers()
      useAppStore
        .getState()
        .addNotification({ message: 'Bye', type: 'info', duration: 1000 })
      expect(useAppStore.getState().notifications).toHaveLength(1)
      vi.advanceTimersByTime(1000)
      expect(useAppStore.getState().notifications).toHaveLength(0)
    })

    it('ajoute une notification avec un ID unique', () => {
      useAppStore
        .getState()
        .addNotification({ message: 'Hello', type: 'success' })
      const notifications = useAppStore.getState().notifications
      expect(notifications).toHaveLength(1)
      expect(notifications[0].id).toBeDefined()
      expect(notifications[0].message).toBe('Hello')
    })

    it('supprime une notification par ID', () => {
      useAppStore.getState().addNotification({ message: 'Test', type: 'info' })
      const id = useAppStore.getState().notifications[0].id
      useAppStore.getState().removeNotification(id)
      expect(useAppStore.getState().notifications).toHaveLength(0)
    })
  })
})
```

---

## 14. CI/CD GitHub Actions

### `.github/workflows/ci.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, master, develop]
  pull_request:
    branches: [main, master, develop]

env:
  NODE_VERSION: '24' # Node.js LTS

jobs:
  # ============================================
  # Lint & Type Check
  # ============================================
  lint:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci # ⚠️ Toujours npm ci en CI (reproductible)

      - name: Run ESLint
        run: npm run lint

      - name: Run TypeScript check
        run: npm run type-check

      - name: Check formatting
        run: npx prettier --check "src/**/*.{ts,tsx,css,scss,json,md}"

  # ============================================
  # Tests
  # ============================================
  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage reports
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info
          flags: unittests
          name: app-coverage
          fail_ci_if_error: false # ⚠️ Ne pas faire échouer la CI si Codecov est down

  # ============================================
  # Build
  # ============================================
  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, test] # ⚠️ Build uniquement si lint + test passent
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7

  # ============================================
  # Bundle Analysis (PR only)
  # ============================================
  analyze:
    name: Bundle Analysis
    runs-on: ubuntu-latest
    needs: [build]
    if: github.event_name == 'pull_request'
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Analyze bundle
        run: npm run build:analyze

      - name: Upload bundle stats
        uses: actions/upload-artifact@v4
        with:
          name: bundle-stats
          path: dist/stats.html
          retention-days: 7

  # ============================================
  # Deploy (GitHub Pages)
  # ============================================
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
    permissions:
      contents: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: ${{ vars.CNAME }} # Optionnel : domaine custom
```

### Règles CI/CD

| Règle                                 | Pourquoi                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `npm ci` (pas `npm install`)          | Reproductibilité, respecte le lockfile                                                                  |
| Cache npm via `actions/setup-node`    | Accélère les builds (~30-50% plus rapide)                                                               |
| `needs: [lint, test]` sur build       | Ne pas builder si les tests échouent                                                                    |
| `fail_ci_if_error: false` sur Codecov | Ne pas bloquer si Codecov est down                                                                      |
| `open: !process.env.CI` dans Vite     | Ne pas ouvrir de navigateur en CI                                                                       |
| Node 24 LTS partout                   | Cohérence dev/CI (alternative : `node-version-file: '.nvmrc'` dans `setup-node` pour une source unique) |
| `permissions` minimales par job       | Le `GITHUB_TOKEN` n'a `contents: write` que dans le job de déploiement                                  |

### `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    open-pull-requests-limit: 5
    commit-message:
      prefix: build # ✅ Compatible commitlint
    groups:
      # Une seule PR pour toutes les mises à jour mineures/patch d'outillage
      dev-dependencies:
        dependency-type: development
        update-types: [minor, patch]

  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: monthly
    commit-message:
      prefix: ci
```

> ⚠️ Les mises à jour **majeures** (React, Vite, Vitest, ESLint…) arrivent dans
> des PR séparées : lire le guide de migration et mettre à jour ce fichier
> `GUIDELINES.md` si un pattern change.

---

## 15. Déploiement (GitHub Pages)

### Configuration

| Élément        | Valeur                                                      | Où                                   |
| -------------- | ----------------------------------------------------------- | ------------------------------------ |
| `base`         | `/<nom-du-repo>/` (ou `/` avec un domaine custom)           | `vite.config.ts` via `VITE_BASE_URL` |
| `homepage`     | `https://<user>.github.io/<repo>`                           | `package.json`                       |
| Source Pages   | Branche `gh-pages` (créée par `peaceiris/actions-gh-pages`) | Settings → Pages                     |
| Domaine custom | Variable de repo `CNAME`                                    | Settings → Variables → Actions       |

> ⚠️ **`base` incorrect = page blanche** : les assets sont demandés à la racine
> du domaine et renvoient 404. Toujours tester avec
> `npm run build && npm run preview` avant de pousser.

### Routing SPA et `public/404.html`

GitHub Pages sert `404.html` pour toute URL qui ne correspond à aucun fichier.
Il doit être dans **`public/`** pour être copié dans `dist/`.

> ⚠️ Un `404.html` à la racine du repo (hors `public/`) n'est **pas** copié dans
> `dist/` et n'a donc aucun effet en production.

#### Avec `HashRouter` (recommandé sur GitHub Pages)

Les routes de l'application sont toujours de la forme `/<repo>/#/page` et
fonctionnent sans configuration. Le `404.html` sert à rattraper les liens tapés
ou partagés **sans** `#` (`/<repo>/documentation`) en les convertissant en route
hash :

```html
<!-- public/404.html -->
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Redirection</title>
    <meta name="robots" content="noindex" />
    <script>
      // /<repo>/documentation?x=1 → /<repo>/#/documentation?x=1
      // pathSegmentsToKeep = 1 pour un site de projet (/<repo>/), 0 pour un domaine custom
      var pathSegmentsToKeep = 1
      var l = window.location
      var segments = l.pathname.split('/')
      var base = segments.slice(0, 1 + pathSegmentsToKeep).join('/') + '/'
      var route = segments.slice(1 + pathSegmentsToKeep).join('/')
      l.replace(l.origin + base + '#/' + route + l.search)
    </script>
  </head>
  <body>
    Redirection…
  </body>
</html>
```

Une route inexistante (`/<repo>/inconnue`) devient `/<repo>/#/inconnue` et
affiche la page 404 **de l'application** (route `*`), avec la navigation et le
thème, au lieu de la page 404 générique de GitHub.

#### Avec `BrowserRouter`

GitHub Pages renvoie une 404 sur `/<repo>/documentation`. Il faut :

1. un `public/404.html` qui redirige vers `/<repo>/?/documentation` (technique
   [spa-github-pages](https://github.com/rafgraph/spa-github-pages)) ;
2. le script de décodage correspondant dans le `<head>` d'`index.html`, qui
   restaure l'URL via `history.replaceState` avant le démarrage du routeur.

> ℹ️ `vite preview` fait déjà un fallback SPA vers `index.html` : le `404.html`
> ne peut être testé qu'une fois déployé.

### Déploiement manuel (secours)

```bash
npm run deploy   # build + gh-pages -d dist
```

---

## 16. Variables d'environnement & sécurité

### Variables d'environnement

| Règle                                                               | Pourquoi                                                   |
| ------------------------------------------------------------------- | ---------------------------------------------------------- |
| Préfixe `VITE_` obligatoire pour être exposé au client              | Les autres variables restent côté build                    |
| **Tout `VITE_*` est public** (inliné dans le JS)                    | Ne jamais y mettre de clé secrète, token ou mot de passe   |
| `.env` dans `.gitignore`, `.env.example` versionné                  | Le template documente les variables sans fuiter de valeurs |
| Typer chaque variable dans `src/vite-env.d.ts`                      | Autocomplétion + erreur si une variable est mal nommée     |
| Secrets CI dans _Settings → Secrets_, jamais en clair dans `ci.yml` | Masqués dans les logs                                      |

### `.env.example`

```bash
# Application
VITE_APP_TITLE=Mon Site
VITE_APP_DESCRIPTION=Description du site
VITE_APP_VERSION=1.0.0

# Déploiement
VITE_BASE_URL=/
VITE_SITE_URL=https://monsite.com/

# API (optionnel)
# VITE_API_URL=https://api.example.com
```

### Dépendances

```bash
npm audit --omit=dev     # Vulnérabilités des dépendances livrées au navigateur
npm audit                # Audit complet (outillage inclus)
npm outdated             # Paquets en retard
```

| Règle                                                                                                         | Pourquoi                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm audit --omit=dev` doit être propre avant chaque release                                                  | Seul le code runtime atteint les utilisateurs                                                                                                                                                   |
| Lockfile toujours commité                                                                                     | Builds reproductibles, `npm ci` en CI                                                                                                                                                           |
| Surveiller les paquets qui exécutent des scripts d'installation (`npm query ":attr(scripts, [postinstall])"`) | Principal vecteur d'attaque supply-chain                                                                                                                                                        |
| Pas de champ `allowScripts` dans `package.json`                                                               | npm (11.x) ne le lit pas : il donne une fausse impression de protection. Pour une vraie liste blanche, utiliser un outil dédié (ex. `@lavamoat/allow-scripts`, qui lit `lavamoat.allowScripts`) |
| Pas de `dangerouslySetInnerHTML` sans sanitisation (DOMPurify)                                                | Prévention XSS                                                                                                                                                                                  |
| En-têtes de sécurité + CSP stricte                                                                            | Voir `preview.headers` dans la [config Vite](#4-configuration-vite) ; à reporter sur l'hébergeur (GitHub Pages ne permet pas d'en-têtes custom → CSP via `<meta http-equiv>` si nécessaire)     |

---

## 17. Git Hooks (Husky + Commitlint)

### Installation

```bash
npm install -D husky @commitlint/cli @commitlint/config-conventional lint-staged
npx husky init
```

> ⚠️ `npx husky init` crée un `.husky/pre-commit` contenant `npm test` : le
> remplacer par le contenu ci-dessous.

### `.husky/pre-commit`

```bash
npx lint-staged
```

### `.husky/commit-msg`

```bash
npx --no -- commitlint --edit "$1"
```

> ⚠️ **Husky 9** : plus de shebang ni de ligne
> `. "$(dirname -- "$0")/_/husky.sh"`. Cette syntaxe v4–v8 est dépréciée
> (avertissement à chaque commit) et sera supprimée en v10.

### `commitlint.config.js`

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nouvelle fonctionnalité
        'fix', // Correction de bug
        'docs', // Documentation
        'style', // Formatage (pas de changement de code)
        'refactor', // Refactoring
        'perf', // Performance
        'test', // Tests
        'build', // Build/dépendances
        'ci', // Configuration CI
        'chore', // Autres
        'revert', // Revert d'un commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    // Interdit "Ajoute…" / "AJOUTE…" mais autorise les noms propres en cours de phrase
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
}
```

### `package.json` – lint-staged

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss,json,md,yml,yaml}": ["prettier --write"]
  }
}
```

---

## 18. Commandes de validation

### `package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "build:analyze": "tsc -b && vite build --mode analyze",
    "analyze": "npm run build:analyze",
    "preview": "vite preview",
    "lint": "eslint . --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "type-check": "tsc -b",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,scss,json,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,scss,json,md}\"",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "validate": "npm run lint && npm run format:check && npm run type-check && npm run test:coverage && npm run build",
    "prepare": "husky",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

> ℹ️ `vitest` est déjà en mode watch par défaut en local (et en `run` en CI) :
> pas besoin d'un script `test:watch`.
>
> ℹ️ `analyze` utilise `rollup-plugin-visualizer` (mode `analyze` de la
> [config Vite](#4-configuration-vite)) et génère `dist/stats.html`.

### Ordre de validation (à lancer systématiquement)

```bash
# 1. Lint (rapide, ~5s)
npm run lint

# 2. Formatage
npm run format:check

# 3. Type check (rapide, ~5s)
npm run type-check

# 4. Tests avec couverture (~10-30s)
npm run test:coverage

# 5. Build production (~10-30s)
npm run build

# Ou tout en une fois :
npm run validate
```

---

## 19. Conventions de commit

Format : `<type>(<scope>): <description>`

| Type       | Description                           | Exemple                                                |
| ---------- | ------------------------------------- | ------------------------------------------------------ |
| `feat`     | Nouvelle fonctionnalité               | `feat(nav): ajoute le menu mobile`                     |
| `fix`      | Correction de bug                     | `fix(seo): corrige le crash sur URL inconnue`          |
| `docs`     | Documentation                         | `docs(readme): ajoute les instructions d'installation` |
| `style`    | Formatage (pas de changement de code) | `style: formate avec prettier`                         |
| `refactor` | Refactoring                           | `refactor(store): sépare les sélecteurs`               |
| `perf`     | Performance                           | `perf(images): ajoute le lazy loading`                 |
| `test`     | Tests                                 | `test(hooks): ajoute les tests useDarkMode`            |
| `build`    | Build/dépendances                     | `build: met à jour Vite en 8.3.4`                      |
| `ci`       | Configuration CI                      | `ci: ajoute le job de déploiement`                     |
| `chore`    | Autres                                | `chore: nettoie les fichiers inutilisés`               |
| `revert`   | Revert                                | `revert: annule le commit abc1234`                     |

### Bonnes pratiques

- **Description en français** (ou la langue du projet)
- **Impératif présent** : "ajoute", "corrige", "met à jour"
- **Scope optionnel** mais recommandé : `feat(nav)`, `fix(api)`, `docs(readme)`
- **Corps du message** pour les changements complexes (séparé par une ligne
  vide)

```
feat: refond l'interface avec un thème clair/sombre accessible

- layout, navigation (menu mobile), footer et page d'accueil animés
- couleurs sémantiques pilotées par des variables CSS
- thème appliqué avant le premier rendu (plus de flash)

Corrige :
- crash du SEO sur toute URL inconnue
- lien Documentation jamais actif
- ErrorBoundary placé hors du Router
```

---

## 20. Checklist nouveau projet

### Initialisation

- [ ] Créer le dossier du projet
- [ ] `git init`
- [ ] Créer `.nvmrc` avec `24`
- [ ] `nvm use` (ou `nvm install`)
- [ ] `npm init -y`
- [ ] Installer les dépendances (voir [Stack de base](#1-stack-de-base))
- [ ] Copier ce fichier `GUIDELINES.md` à la racine

### Configuration

- [ ] Copier `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`,
      `tsconfig.test.json`
- [ ] Copier `vite.config.ts`
- [ ] Copier `vitest.config.mjs`
- [ ] Copier `eslint.config.js`
- [ ] Copier `.prettierrc`
- [ ] Copier `tailwind.config.js`
- [ ] Copier `postcss.config.js`
- [ ] Créer `.env.example` (voir
      [Variables d'environnement](#16-variables-denvironnement--sécurité))
- [ ] Créer `.gitignore` (au minimum : `node_modules`, `dist`, `coverage`,
      `.vitest`, `.env`, `.env.local`, `*.tsbuildinfo`, `.husky/_`, `.DS_Store`)
- [ ] Définir `VITE_BASE_URL` et `homepage` selon l'hébergement

### Structure

- [ ] Créer la structure de dossiers (voir
      [Structure](#2-structure-des-dossiers))
- [ ] Créer `src/main.tsx` (voir
      [Point d'entrée & routing](#9-point-dentrée--routing))
- [ ] Choisir `HashRouter` ou `BrowserRouter` et créer `public/404.html` adapté
      (voir [Déploiement](#15-déploiement-github-pages))
- [ ] Créer `src/vite-env.d.ts`
- [ ] Créer `src/styles/_variables.scss`, `src/styles/index.scss`,
      `src/styles/tailwind.css`
- [ ] Créer `index.html` enrichi (SEO, OG, Twitter, JSON-LD, manifest)
- [ ] Créer `public/manifest.json`

### Store & Hooks

- [ ] Créer `src/store/appStore.ts` (avec `partialize` + `merge` + sélecteurs)
- [ ] Créer `src/hooks/useDarkMode.ts`
- [ ] Créer `src/hooks/useMediaQuery.ts`

### Composants partagés

- [ ] Créer `src/shared/components/ErrorBoundary/`
- [ ] Créer `src/shared/components/LoadingSpinner/`
- [ ] Créer `src/shared/components/PageLoader/`
- [ ] Créer `src/shared/components/Toast/`

### Composants communs

- [ ] Créer `src/components/Layout/` (skip link, Nav, Outlet, Footer, SEO)
- [ ] Créer `src/components/Nav/` (responsive, dark mode toggle)
- [ ] Créer `src/components/Footer/`
- [ ] Créer `src/components/Seo/`

### Tests

- [ ] Créer `src/test/setup.ts`
- [ ] Créer `src/test/mocks/framer-motion.tsx`
- [ ] Créer les tests de base (Layout, Nav, Footer, SEO, hooks, store)
- [ ] Vérifier que `npm run test:coverage` passe avec ≥ 70% de couverture

### CI/CD & Git

- [ ] Créer `.github/workflows/ci.yml`
- [ ] Créer `.github/dependabot.yml`
- [ ] Activer GitHub Pages (branche `gh-pages`) et, si besoin, la variable
      `CNAME`
- [ ] Installer Husky + Commitlint
- [ ] Configurer `lint-staged` dans `package.json`
- [ ] Créer `.husky/pre-commit` et `.husky/commit-msg`

### Validation finale

- [ ] `npm run lint` ✅
- [ ] `npm run format:check` ✅
- [ ] `npm run type-check` ✅
- [ ] `npm run test:coverage` ✅
- [ ] `npm run build` ✅
- [ ] `npm run validate` ✅ (tout en une fois)
- [ ] `npm audit --omit=dev` ✅
- [ ] `npm run preview` : navigation clavier, thème clair/sombre, aucune erreur
      axe dans la console

### Premier commit

```bash
git add .
git commit -m "chore: initialise le projet avec la stack standard"
git push -u origin main
```

---

## 📚 Ressources

- [Vite Documentation](https://vite.dev/)
- [Rolldown – Code splitting](https://rolldown.rs/in-depth/manual-code-splitting)
- [Vitest Documentation](https://vitest.dev/)
- [Zustand Documentation](https://zustand.docs.pmnd.rs/)
- [Tailwind CSS v3 Documentation](https://v3.tailwindcss.com/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Husky](https://typicode.github.io/husky/)
- [Conventional Commits](https://www.conventionalcommits.org/fr/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [axe-core](https://github.com/dequelabs/axe-core)
- [spa-github-pages](https://github.com/rafgraph/spa-github-pages)

---

_Dernière mise à jour : Octobre 2026 – Basé sur les patterns validés du projet
TGV._
