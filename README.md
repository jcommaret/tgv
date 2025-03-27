# TGV

## Table of Contents

- [Hexagonal Architecture](#hexagonal-architecture)
- [Prerequisites](#prerequisites)
- [Features](#features)
- [To Do](#to-do)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Using Aliases](#using-aliases)
- [Examples](#examples)
- [Screenshots](#screenshots)
- [Additional Resources](#additional-resources)

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

## To Do

- [ ] Improve responsive assets
- [ ] Add more components
- [ ] Complete unit tests for each layer

## Installation

1. Clone the repository
2. Open a terminal in the project folder
3. Run `npm install` to install dependencies

## Development

- Run `npm run dev` to start the development server

## Deployment

1. In `package.json`, change the homepage path to your repository name
2. Open a terminal in the project folder
3. Run `npm run deploy` to deploy the project on GitHub Pages

## Folder Structure

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

## Using Aliases

This project uses import aliases to make the code more readable:

```typescript
// Instead of
import { NavData } from '../../domain/model/NavTypes';

// You can write
import { NavData } from '@domain/model/NavTypes';
```
