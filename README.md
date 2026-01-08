# Urban Services Platform

A modern, Urban Company-like platform with enhanced services for Arts & Recreation sector including gym trainers, dance instructors, music teachers, and more.

## Features

- 🏠 **Home Services** - Plumbing, Electrical, Cleaning, Carpentry, Painting
- 💅 **Beauty & Wellness** - Salon, Spa, Massage, Skincare
- 💪 **Fitness & Health** - Personal Trainers, Yoga, Pilates, Nutrition
- 🎨 **Arts & Recreation** - Gym Trainers, Dance Instructors, Music Teachers, Art Classes, Sports Coaching

## Tech Stack

- React 18
- React Router DOM
- Vite
- HTML5, CSS3, JavaScript

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Project-I/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── ServiceCategory.jsx
│   │   ├── ServiceCategory.css
│   │   ├── ServiceProviderCard.jsx
│   │   └── ServiceProviderCard.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── ServiceListing.jsx
│   │   └── ServiceListing.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features Overview

### Home Page
- Hero section with search functionality
- Service category cards with visual icons
- Features section highlighting platform benefits

### Service Listing Page
- Filterable service provider listings
- Sort by rating, reviews, or price
- Detailed provider cards with:
  - Ratings and reviews
  - Experience and location
  - Pricing information
  - Specialties
  - Book now functionality

### Responsive Design
- Mobile-friendly navigation
- Responsive grid layouts
- Touch-optimized interactions

## Customization

You can easily customize:
- Colors in `src/index.css` (CSS variables)
- Service categories in `src/pages/Home.jsx`
- Service providers data in `src/pages/ServiceListing.jsx`
- Styling in individual component CSS files

## License

MIT

