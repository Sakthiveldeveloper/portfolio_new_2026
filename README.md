# Personal Portfolio

A modern, responsive, and interactive personal portfolio website built to showcase my projects, skills, and professional experience. Designed with a focus on UI/UX, performance, and accessibility.

## 🚀 Features

- **Dynamic Hero Section**: Engaging introduction with visual appeal.
- **About Me**: Detailed background information and professional summary.
- **Skills Showcase**: Visual representation of my technical expertise and tools.
- **Projects Gallery**: A collection of my work with descriptions and links.
- **Experience Timeline**: A chronological display of my professional journey.
- **Contact Form**: operational form for potential collaborations.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Smooth Navigation**: Intuitive navigation with smooth scrolling and progress indication.
- **Modern UI**: Built with modern design principles using Tailwind CSS and shadcn/ui.
- **Animations**: Fluid transitions and effects powered by Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── portfolio/      # Portfolio-specific sections (Hero, About, Projects, etc.)
│   └── ui/             # Generic UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Application views (Index, NotFound)
├── App.tsx             # Main application component with routing
└── main.tsx            # Entry point
```

## 🏃‍♂️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```sh
    git clone git@github.com:sa-photon/personal-portfolio-new.git
    cd personal-portfolio-new
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```

3.  **Start the development server**
    ```sh
    npm run dev
    ```

4.  **Open in browser**
    Navigate to `http://localhost:8080` (or the port shown in your terminal).

## 🚢 Deployment

This project is optimized for deployment on modern static hosting platforms:

- **Vercel**: Import the project and deploy (automatic detection of Vite).
- **Netlify**: Drag and drop the `dist` folder after building (`npm run build`).
- **GitHub Pages**: Configure actions for Vite deployment.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

