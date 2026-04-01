# Frederik Roeland Portfolio

A responsive, customizable personal portfolio website built with HTML5, Vanilla JavaScript, and SCSS.

## 🌟 Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing.
- **Dynamic Themes**: 
  - **Light/Dark Mode**: Toggle between light and dark themes with a single click.
  - **Color Themes**: Choose from four accent colors (Yellow, Blue, Green, Red).
  - **Persistence**: User theme preferences are saved in `localStorage`.
- **Interactive Menu**: A full-screen overlay navigation menu designed for all devices.
- **Clean Codebase**: Built with vanilla technologies to ensure minimal dependencies and fast loading times.

## 📂 Project Structure

- `docs/`: Contains the production-ready static assets and HTML pages.
  - `index.html`: Landing page.
  - `about.html`: Biographical information.
  - `work.html`: Project portfolio.
  - `contact.html`: Contact details.
  - `css/`: Compiled stylesheets from SCSS.
  - `js/`: Client-side JavaScript (`main.js`).
  - `img/`: Images for bio and project previews.
- `scss/`: Source SCSS files for modular styling.
  - `main.scss`: Main entry point for styles.
  - `_config.scss`: Global variables and mixins.
  - `_color_picker.scss`: Theme logic.
  - `_menu.scss`: Navigation styling.
  - `_mobile.scss`: Responsive overrides.

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development & Building

To compile the SCSS files into CSS, run the following command:

```bash
npm run sass
```

This will start a watch process that automatically recompiles your CSS whenever you make changes to the files in the `scss/` directory.

## 🛠️ Built With

- **Frontend**: HTML5, Vanilla JavaScript
- **Styling**: SCSS (compiled via `node-sass`)
- **Icons**: [FontAwesome](https://fontawesome.com/)

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Frederik Roeland**
- [LinkedIn](https://www.linkedin.com/in/frederik-r-38763a3/)
