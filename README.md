# TGV

## Project

TGV is a boilerplate for building websites with Vite.js, React, TypeScript and SCSS, deployed on GitHub Pages. It uses a hexagonal architecture (ports and adapters) for a clear separation of concerns. It also includes react-router navigation, JSON files for routes, navigation, and content, as well as a 404.html page that redirects lost pages to the homepage using hashrouter.

## Hexagonal Architecture

This project is organized according to the principles of hexagonal architecture (also known as "ports and adapters"):

- **Domain**: Contains the domain models and ports (interfaces)
- **Application**: Contains services and use cases
- **Infrastructure**: Contains adapters (primary and secondary) and configuration

This architecture offers several advantages:
- Clear separation of concerns
- Independence of business domain from technical details
- Improved testability
- Flexibility and ease of maintenance

## Prerequisites

- A good understanding of [GitHub Pages](https://docs.github.com/en/pages)
- Basic knowledge of hexagonal architecture

## Features

- [x] [Vite.js](https://vitejs.dev/)
- [x] [React](https://react.dev/)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [SCSS](https://sass-lang.com/)
- [x] [React-router](https://reactrouter.com/)
- [x] Hexagonal Architecture
- [x] Dependency Inversion
- [x] Path aliases for better code readability
- [x] Navigation
- [x] JSON files for routes, navigation, content

## To do

- [ ] Improve responsive assets
- [ ] Add more components
- [ ] Complete unit tests for each layer

## Installation

- Clone the repository
- Open a terminal in the project folder
- Run `npm install` to install dependencies

## Development

- Run `npm run dev` to start the development server

## Deployment

- In package.json, change the homepage path to your repository name
- Open a terminal in the project folder
- Run `npm run deploy` to deploy the project on GitHub Pages

That's it!

## Folder structure

- 404.html
- src
  - **domain** (Business core)
    - model (Domain entities and types)
    - ports (Interfaces for repositories)
  - **application** (Use cases)
    - services (Business services)
  - **infrastructure** (Technical details)
    - adapters
      - primary (Inbound adapters - UI)
        - components (React components)
        - pages (React pages)
      - secondary (Outbound adapters - Data)
    - config (Technical configuration)
  - assets
    - images.tsx
  - data
    - nav.json
  - styles
    - utils
      - \_breakpoints.scss
      - \_colors.scss
      - \_fonts.scss
      - \_mixins.scss
  - main.tsx

## Using aliases

This project uses import aliases to make the code more readable:

```typescript
// Instead of
import { NavData } from '../../domain/model/NavTypes';

// You can write
import { NavData } from '@domain/model/NavTypes';
```

Available aliases:
- `@domain/*` - For domain models and ports
- `@application/*` - For services and use cases
- `@infrastructure/*` - For adapters and configuration
- `@/data/*` - For JSON data
- `@assets/*` - For images and other assets
- `@styles/*` - For global styles
