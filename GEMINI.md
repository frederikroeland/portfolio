# Frederik Roeland Portfolio

A responsive personal portfolio website built with a focus on user customization and Frederik's work experience.

## Project Overview

- **Purpose**: Showcases personal projects, professional experience, and contact information.
- **Main Technologies**:
  - **Frontend**: HTML5, Vanilla JavaScript.
  - **Styling**: SCSS (compiled via `node-sass`).
  - **Icons**: FontAwesome.
- **Architecture**: Static site with assets and HTML pages served from the `docs/` directory.

## Directory Structure

- `docs/`: The main entry point and production-ready static assets.
  - `index.html`: Landing page.
  - `about.html`: Biographical information.
  - `work.html`: Project portfolio.
  - `contact.html`: Contact details.
  - `css/`: Compiled stylesheets.
  - `js/`: Client-side JavaScript (e.g., `main.js` for UI interactions).
  - `img/`: Images for projects and personal bio.
- `scss/`: Source SASS files.
  - `main.scss`: Main stylesheet that imports other partials.
  - `_config.scss`: Global variables (colors, fonts) and mixins (media queries, themes).
  - `_color_picker.scss`: Logic for different color themes (yellow, blue, green, red).
  - `_menu.scss`: Styling for the navigation menu.
  - `_mobile.scss`: Mobile-specific overrides and responsive design.

## Features

- **Responsive Design**: Mobile-first approach using SCSS media query mixins.
- **Dynamic Themes**: Supports both light/dark modes and multiple color themes, persisted via `localStorage`.
- **Interactive Menu**: Custom full-screen overlay menu for mobile and desktop navigation.

## Building and Running

### Prerequisites

- Node.js and npm installed.

### Installation

```bash
npm install
```

### Development

To watch and compile SCSS files:

```bash
npm run sass
```

## Development Conventions

- **SCSS**: Modularize styles using partials (`_filename.scss`). Use the mixins in `_config.scss` for consistent responsiveness.
- **JavaScript**: Maintain UI logic in `docs/js/main.js`. Use vanilla JS to avoid unnecessary dependencies.
- **Static Assets**: All public-facing files should be placed in the `docs/` folder for deployment (e.g., via GitHub Pages).

#### Additional Coding Preferences

- Do not use semicolons for any javascript.
- Keep project dependencies minimal.
