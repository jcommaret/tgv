# TGV

Starter de site web : [Vite](https://vitejs.dev/) 8 + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/).

Démo : [https://jcommaret.github.io/tgv](https://jcommaret.github.io/tgv)

## Prérequis

- Node.js 20+ (LTS recommandé)
- npm

## Installation

```bash
git clone https://github.com/jcommaret/tgv.git
cd tgv
npm install
```

Si `vite` ou `esbuild` ne se lancent pas (scripts d’installation bloqués) :

```bash
npm install-scripts approve esbuild
npm install-scripts approve fsevents
```

## Lancer

```bash
npm run dev
```

Ouvre [http://localhost:5173/tgv/](http://localhost:5173/tgv/) (`base` Vite = `/tgv/`).

## Scripts

| Commande | Rôle |
|----------|------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build TypeScript + Vite (sortie `dist/`) |
| `npm run preview` | Prévisualise le build |
| `npm run lint` | ESLint |
| `npm test` | Tests Vitest |
| `npm run deploy` | Build puis publication GitHub Pages (`gh-pages`) |

## Structure

```
tgv/
├── index.html
├── src/
│   ├── main.tsx
│   ├── pages/          # Home, Documentation, ErrorPage
│   ├── components/     # Layout, Nav, Footer, Seo
│   ├── data/
│   └── styles/
├── vite.config.ts      # alias @, @components, @data… ; base /tgv/
└── package.json
```

Importer un composant :

```ts
import Nav from "@components/Nav"
```

## Licence

MIT. Voir `LICENSE`.
