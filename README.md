<div align="center">
  
  <img src="https://raw.githubusercontent.com/antariksh19/portfolio/main/public/og-image.png" alt="Portfolio Banner" width="100%">
  
  <h1>Antariksh Mohapatra | Developer Portfolio</h1>

  <p>A high-performance personal portfolio built to showcase full-stack engineering projects, technical writing, and system architecture.</p>

  <h3>🟢 <a href="[https://your-live-portfolio-link.vercel.app](https://antariksh-portfolio.vercel.app/)">Live Deployment Available Here</a></h3>
</div>

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
</div>

---

## 🖥️ Application Preview

<div align="center">
  <!-- Replace this source with your actual recorded GIF -->
  <img src="./public/portfolio-demo.gif" alt="Portfolio UI Demo" width="800">
</div>

## 🚀 Overview

This repository contains the source code for my personal developer portfolio (v2). It goes beyond a simple frontend application by incorporating structured product documentation, a defined design system, and a clear development roadmap.

### 📂 Product Documentation
Unlike standard portfolios, this project is architected with product management principles. You can explore the engineering and design decisions in the `docs/` directory:
* **[Product Requirements Document (PRD)](docs/portfolio-v2-prd.md):** The core requirements, user stories, and architectural scope.
* **[Design System](docs/design-system.md):** The typography, color palettes, and component guidelines ensuring UI consistency across the application.
* **[Roadmap](docs/roadmap.md):** Future feature implementations and optimization tracking.

## ✨ Key Features

* **Component-Driven UI:** Built with modular, reusable React components.
* **Responsive Architecture:** Engineered with Tailwind CSS for seamless scaling and fluid layouts across mobile, tablet, and desktop displays.
* **Strict Code Quality:** Enforced via modern flat-config ESLint rules to maintain enterprise-level code standards.
* **Optimized Build Pipeline:** Powered by Vite for lightning-fast Hot Module Replacement (HMR) and highly optimized production bundling.

## ⚡ Performance Metrics

<!-- Replace this with an actual screenshot of your 100/100 Lighthouse score -->
<div align="center">
  <img src="./public/lighthouse-score.png" alt="Lighthouse Performance Score" width="600">
</div>

## 📂 Project Structure

```text
portfolio/
├── docs/                # PRD, Roadmap, and Design System
├── public/              # Static assets, Open Graph images, and icons
├── src/
│   ├── assets/          # Local CSS and media
│   ├── components/      # Reusable React UI components
│   ├── pages/           # Page-level components
│   ├── utils/           # Helper functions and constants
│   ├── App.jsx          # Root application component
│   └── main.jsx         # React DOM entry point
├── eslint.config.js     # Linter configuration
├── postcss.config.js    # Tailwind/PostCSS configuration
└── package.json         # Dependencies & scripts
```

## 🛠 System Setup

The project utilizes standard Node.js package management, incorporating customized PostCSS styling and strict ESLint configurations.

### Prerequisites
* Node.js (v18+)
* npm (Configured via the local `.npmrc` file)

### Local Development

**1. Clone the repository:**
```bash
git clone [https://github.com/antariksh19/portfolio.git](https://github.com/antariksh19/portfolio.git)
cd portfolio
```

**2. Install dependencies:**
```bash
npm install
```

**3. Run the development server:**
```bash
npm run dev
```

**4. Open your browser:**
Navigate to `http://localhost:5173` to view the application locally.

## 📦 Key Configurations

* `eslint.config.js` - Modern flat-config ESLint rules enforcing code quality and consistency.
* `postcss.config.js` - PostCSS configuration handling the CSS processing pipeline.
* `public/og-image.png` - Pre-configured Open Graph image for optimized social sharing previews.
* `public/profile.png` - Standardized profile asset used throughout the UI.

## 📫 Connect

* **LinkedIn:** [Antariksh Mohapatra](https://www.linkedin.com/in/antariksh-mohapatra/)
* **Email:** [antariksh19m@gmail.com](mailto:antariksh19m@gmail.com)
* **GitHub:** [@antariksh19](https://github.com/antariksh19)

## 📄 License
Distributed under the MIT License.
