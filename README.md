# CreatorChain Landing Page

A modern, animated landing page for CreatorChain - a blockchain-powered platform for protecting digital content creators from theft.

## Features

- **Modern Design**: Sleek black theme with gradient accents and sophisticated animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: Powered by Framer Motion for engaging user interactions
- **Interactive Elements**:
  - Animated hero section with staggered content reveals
  - Hover effects on cards and buttons
  - Smooth scrolling navigation
  - Video modal popup
  - Form validation and submission feedback
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **React 18**: Latest React features with hooks and modern patterns

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd LandingPage
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   └── CreatorChainLanding.jsx  # Main landing page component
├── App.jsx                      # Root App component
├── main.jsx                     # Application entry point
└── index.css                    # Global styles and Tailwind imports
```

## Key Components

### CreatorChainLanding

The main landing page component featuring:

- **Hero Section**: Eye-catching headline with call-to-action buttons
- **Problem Statement**: Statistics and information about content theft
- **Solution Features**: Four key features with icons and descriptions
- **How It Works**: 3-step process explanation
- **Waitlist Form**: Email capture form with validation
- **Footer**: Links and company information
- **Video Modal**: Popup for demo video (placeholder)

### Animations

The page uses Framer Motion for various animations:

- Staggered content reveals
- Hover effects on interactive elements
- Smooth page transitions
- Form submission feedback
- Modal animations

## Customization

### Colors

The design uses a dark theme with these primary colors:

- Background: Black (`bg-black`)
- Primary: Indigo to Purple gradient (`from-indigo-600 to-purple-600`)
- Accent: Red for alerts (`text-red-400`)
- Text: White and gray variations

### Content

To customize the content, edit the data arrays in `CreatorChainLanding.jsx`:

- `problemStats` - Statistics about content theft
- `features` - Key features of the platform
- `howItWorks` - Step-by-step process

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary software for CreatorChain.
