/**
 * Documentation Page
 *
 * Project guide: setup, scripts, structure, adding pages, theming, state, tests and deployment.
 */

import type { MouseEvent, ReactNode } from 'react'
import content from '@data/content.json'

interface Section {
  id: string
  title: string
  body: ReactNode
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="text-sm">
      <code>{children.trim()}</code>
    </pre>
  )
}

const scripts: [string, string][] = [
  ['npm run dev', 'Serveur de développement avec rechargement à chaud'],
  ['npm run build', 'Vérification TypeScript puis build de production dans dist/'],
  ['npm run preview', 'Sert le build de production en local'],
  ['npm test', 'Tests en mode watch'],
  ['npm run test:coverage', 'Tests avec rapport de couverture (seuil : 70 %)'],
  ['npm run lint', 'ESLint, zéro avertissement toléré'],
  ['npm run type-check', 'Vérification TypeScript de tout le projet'],
  ['npm run format', 'Formate src/ avec Prettier'],
  ['npm run validate', 'Lint + types + tests : à lancer avant de pousser'],
  ['npm run deploy', 'Build puis publication sur GitHub Pages'],
]

const tokens: [string, string][] = [
  ['bg-surface', 'Fond de page'],
  ['bg-surface-raised', 'Cartes, boutons secondaires'],
  ['bg-surface-sunken', 'Bandeaux, zones en retrait'],
  ['text-fg', 'Texte principal'],
  ['text-fg-muted', 'Texte secondaire'],
  ['text-fg-subtle', 'Texte discret (mentions, version)'],
  ['text-accent', 'Liens et éléments mis en avant'],
  ['border-line', 'Bordures et séparateurs'],
]

const sections: Section[] = [
  {
    id: 'demarrage',
    title: 'Démarrage rapide',
    body: (
      <>
        <p>
          TGV nécessite <strong>Node.js 24</strong> ou plus (version indiquée dans{' '}
          <code>.nvmrc</code>).
        </p>
        <CodeBlock>{`
git clone https://github.com/jcommaret/tgv.git
cd tgv
nvm use
npm install
cp .env.example .env
npm run dev
`}</CodeBlock>
        <p>
          Le site est alors disponible sur <code>http://localhost:3000/tgv/</code>.
        </p>
      </>
    ),
  },
  {
    id: 'scripts',
    title: 'Scripts',
    body: (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-2 pr-4 font-semibold">
                Commande
              </th>
              <th scope="col" className="py-2 font-semibold">
                Rôle
              </th>
            </tr>
          </thead>
          <tbody>
            {scripts.map(([command, description]) => (
              <tr key={command} className="border-b border-line">
                <td className="py-2 pr-4 whitespace-nowrap">
                  <code>{command}</code>
                </td>
                <td className="py-2 text-fg-muted">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'structure',
    title: 'Structure du projet',
    body: (
      <>
        <CodeBlock>{`
src/
├── assets/        Images importées par le code
├── components/    Layout, Nav, Footer, Seo
├── data/          content.json : textes, pages et SEO
├── hooks/         useDarkMode, useMediaQuery…
├── pages/         Une page par dossier (Home, Documentation, ErrorPage)
├── shared/        Composants réutilisables (ErrorBoundary, Toast, Loader…)
├── store/         État global (Zustand)
├── styles/        SCSS global et couleurs du thème
└── test/          Tests, mocks et configuration Vitest
public/            Fichiers copiés tels quels (logo, manifest)
`}</CodeBlock>
        <p>
          Des alias évitent les chemins relatifs : <code>@components</code>, <code>@pages</code>,{' '}
          <code>@hooks</code>, <code>@store</code>, <code>@data</code>, <code>@shared</code>,{' '}
          <code>@assets</code>, <code>@styles</code> et <code>@</code> pour <code>src/</code>.
        </p>
      </>
    ),
  },
  {
    id: 'ajouter-une-page',
    title: 'Ajouter une page',
    body: (
      <>
        <p>1. Créez le composant de la page :</p>
        <CodeBlock>{`
// src/pages/Contact/index.tsx
function Contact() {
  return <h1 className="text-fg text-4xl font-bold">Contact</h1>
}

export default Contact
`}</CodeBlock>
        <p>
          2. Déclarez-la dans <code>src/data/content.json</code>. Le menu et les balises SEO sont
          générés à partir de ce fichier :
        </p>
        <CodeBlock>{`
"contact": {
  "title": "Contact",
  "path": "/contact",
  "seo": { "description": "Nous contacter" }
}
`}</CodeBlock>
        <p>
          3. Ajoutez la route dans <code>src/main.tsx</code> (la page est chargée à la demande) :
        </p>
        <CodeBlock>{`
const Contact = lazy(() => import('@/pages/Contact'))

<Route path="contact" element={<Contact />} />
`}</CodeBlock>
        <p>
          Le site utilise un routage par hash (<code>/tgv/#/contact</code>), ce qui fonctionne sur
          GitHub Pages sans configuration serveur. Toute URL inconnue affiche la page 404.
        </p>
      </>
    ),
  },
  {
    id: 'theme',
    title: 'Mode clair et mode sombre',
    body: (
      <>
        <p>
          Le thème suit la préférence du système, jusqu’à ce que l’utilisateur le change avec le
          bouton de la barre de navigation. Son choix est mémorisé. Pour qu’un composant s’adapte
          automatiquement aux deux modes, utilisez les couleurs sémantiques plutôt que des couleurs
          fixes comme <code>text-white</code> ou <code>bg-gray-800</code> :
        </p>
        <ul className="grid gap-2 sm:grid-cols-2 list-none">
          {tokens.map(([token, role]) => (
            <li key={token} className="flex flex-col">
              <code className="self-start">{token}</code>
              <span className="text-sm text-fg-muted">{role}</span>
            </li>
          ))}
        </ul>
        <p>
          Leurs valeurs sont définies dans <code>src/styles/index.scss</code> (un jeu pour le clair,
          un pour le sombre) et respectent un contraste d’au moins 4,5:1 (WCAG AA).
        </p>
      </>
    ),
  },
  {
    id: 'etat-global',
    title: 'État global et notifications',
    body: (
      <>
        <p>
          L’état partagé (thème, chargement, notifications) vit dans{' '}
          <code>src/store/appStore.ts</code>. Pour afficher une notification :
        </p>
        <CodeBlock>{`
import { useAddNotification } from '@store/appStore'

const addNotification = useAddNotification()
addNotification({ type: 'success', message: 'Enregistré !' })
`}</CodeBlock>
        <p>
          Les types disponibles sont <code>success</code>, <code>error</code>, <code>warning</code>{' '}
          et <code>info</code>. Les notifications disparaissent après 5 secondes (option{' '}
          <code>duration</code>, <code>0</code> pour les garder).
        </p>
      </>
    ),
  },
  {
    id: 'tests',
    title: 'Tests et qualité',
    body: (
      <>
        <p>
          Les tests (Vitest + Testing Library) sont dans <code>src/test/</code>. Pour les composants
          animés, réutilisez le mock fourni :
        </p>
        <CodeBlock>{`
vi.mock('framer-motion', () => import('../mocks/framer-motion'))
`}</CodeBlock>
        <p>
          À chaque commit, les fichiers modifiés sont lintés et formatés automatiquement, et le
          message doit suivre les{' '}
          <a href="https://www.conventionalcommits.org/fr/" target="_blank" rel="noreferrer">
            Conventional Commits
          </a>{' '}
          (<code>feat: …</code>, <code>fix: …</code>). En développement, axe-core signale les
          problèmes d’accessibilité dans la console du navigateur.
        </p>
      </>
    ),
  },
  {
    id: 'deploiement',
    title: 'Déploiement',
    body: (
      <>
        <p>
          Chaque push sur <code>master</code> lance la CI GitHub Actions (lint, types, tests, build)
          puis publie <code>dist/</code> sur GitHub Pages. Pour publier à la main :
        </p>
        <CodeBlock>{`
npm run deploy
`}</CodeBlock>
        <p>
          Le site est servi sous <code>/tgv/</code>. Pour un autre chemin, définissez{' '}
          <code>VITE_BASE_URL</code> dans <code>.env</code>.
        </p>
      </>
    ),
  },
]

// The URL hash belongs to the router, so table-of-contents links scroll instead of navigating
const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
  event.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Documentation() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 lg:grid lg:grid-cols-[14rem_1fr] lg:gap-12">
      <nav aria-label="Sommaire" className="mb-10 lg:mb-0">
        <div className="lg:sticky lg:top-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-fg-subtle mb-3">
            Sommaire
          </p>
          <ul className="space-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(event) => scrollToSection(event, section.id)}
                  className="text-fg-muted hover:text-accent"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <article className="min-w-0 text-fg">
        <h1 className="text-4xl font-bold mb-4">{content.pages.documentation.title}</h1>
        <p className="text-lg text-fg-muted mb-12">
          Tout ce qu’il faut pour créer, faire évoluer et publier un site avec TGV.
        </p>

        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="mb-12 scroll-mt-24 space-y-4 leading-relaxed [&_p]:mb-0"
          >
            <h2 id={`${section.id}-title`} className="text-2xl font-bold">
              {section.title}
            </h2>
            {section.body}
          </section>
        ))}
      </article>
    </div>
  )
}

export default Documentation
