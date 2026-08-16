# Sansar

[Homepage](https://hamrosansar.vercel.app)

A modern blogging web application and design collection built with React, Vite, and Tailwind CSS. Sansar contains reusable componentized pages (blog, destinations, budget planner) and UI examples with animated interactions, accessible markup, and modern build tooling.

## About

Sansar is a small, design-first blogging app and component library showcasing:

- Data-driven UI components (donut charts, summary cards, recommendation grids)
- Modern React + Vite architecture written in TypeScript
- Tailwind CSS for utility-first styling and responsive layouts
- Smooth animations with Framer Motion and GSAP
- Iconography with Lucide React and React Icons
- Example pages such as a Budget Planner and Destinations (componentized from static HTML)

This repository is intended as a starting point and demo: use the components and pages as examples or integrate them into your own project.

## Features

- Componentized pages and shared layout (Header / Footer)
- Computed SVG donut chart (percent-driven, not hardcoded)
- Example data files for budgets and recommendations
- Tailwind-based design tokens compatible across pages
- Ready-to-run Vite development server and production build

## Tech Stack

- Framework: React 19
- Build tool: Vite 8
- Language: TypeScript
- Styling: Tailwind CSS v4
- Animations: Framer Motion & GSAP
- Icons: Lucide React & React Icons
- Smooth Scrolling: Lenis

## Getting Started

### Prerequisites

- Node.js v18+ recommended
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/gaurab-arl/Sansar.git
```

2. Navigate into the project directory:

```bash
cd Sansar
```

3. Install dependencies:

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Open http://localhost:5173 in your browser to view the application.

## Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs Oxlint to analyze the code
- `npm run preview` - Previews the production build locally

## Contributing

Contributions are welcome — open an issue or submit a pull request. Keep changes focused and include a short description of the intent.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
