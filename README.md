# Jenkins Contributor Spotlight — Gatsby to Vite Migration

![CI](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions/workflows/ci.yml/badge.svg)

This project migrates the Jenkins Contributor Spotlight site from Gatsby to Vite + React.

Original site: https://contributors.jenkins.io

---

## What was migrated

| Feature | Original File (Gatsby) | New File (Vite) |
|---|---|---|
| Contributor data source | GraphQL + AsciiDoc files via `gatsby-transformer-asciidoc` | `src/data/contributors.js` (static JS array) |
| Home page | `src/pages/index.js` | `src/pages/Home.jsx` |
| Contributor detail page | `src/templates/contributor-details.jsx` | `src/pages/ContributorDetails.jsx` |
| Contributor card component | `src/Components/Contributor/ContributorCard.jsx` | `src/components/Contributor/ContributorCard.jsx` |
| Contributors grid component | `src/Components/Contributor/ContributorsList.jsx` | `src/components/Contributor/ContributorsList.jsx` |
| Contributors grid styles | `src/Components/Contributor/contributors.css` | `src/components/Contributor/contributors.css` |
| Featured contributor component | `src/Components/Featured-contributor/FeaturedContributor.jsx` | `src/components/FeaturedContributor/FeaturedContributor.jsx` |
| Featured contributor styles | `src/Components/Featured-contributor/featured-contributor.css` | `src/components/FeaturedContributor/featured-contributor.css` |
| Thank you note component | `src/Components/ThankYouNote.jsx` | `src/components/ThankYouNote.jsx` |
| X (Twitter) icon component | `src/Components/XIcon.jsx` | `src/components/XIcon.jsx` |
| Global styles | `src/styles/index.css` | `src/styles/index.css` |
| Contributor detail styles | `src/styles/contributor-details.css` | `src/styles/contributor-details.css` |
| Routing | Gatsby file-based routing + `gatsby-node.js` | `src/App.jsx` with React Router DOM |
| App entry point | `gatsby-browser.js` | `src/main.jsx` |
| Navbar and footer | `gatsby-ssr.jsx` (Jenkins web components) | `index.html` (Jenkins web components) |

---

## Key technology changes

| Old (Gatsby) | New (Vite) |
|---|---|
| `gatsby` | `vite` |
| `gatsby` routing | `react-router-dom` |
| GraphQL + AsciiDoc | Static JS data file |
| `react-helmet` | Plain `<title>` tag |
| `@mui/material` | Inline styles |
| `axios` | Native `fetch` |
| `lucide-react` brand icons | `react-icons` (FaGithub, FaLinkedin) |

---

## How to run

### Local development
```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

### Production build
```bash
npm run build
npm run preview
```

---

## Docker

### Run with Docker
```bash
# Build the image
docker build -t contributor-spotlight .

# Run the container
docker run -p 8080:80 contributor-spotlight
```

Then open http://localhost:8080 in your browser.

### Why Docker?
- No need to install Node.js on your machine
- Consistent environment across all platforms
- Uses a multi-stage build — Node.js to build, nginx to serve
- nginx handles React Router client-side routing correctly

---

## CI/CD

This project uses GitHub Actions for continuous integration.

The pipeline runs automatically on every push and pull request to `main` and does the following:

1. **Build job** — installs dependencies and runs `npm run build` to verify nothing is broken
2. **Docker job** — builds the Docker image to verify the container works correctly

The pipeline is intentionally minimal to demonstrate CI/CD concepts without over-engineering.

---

## Project structure
```
.
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI/CD pipeline
├── public/
│   ├── jenkins.png              # Jenkins logo
│   └── marek-szturc-2s3fI3M1lO0-unsplash.jpg  # Hero background image
├── src/
│   ├── components/
│   │   ├── Contributor/
│   │   │   ├── ContributorCard.jsx    # Single contributor card
│   │   │   ├── ContributorsList.jsx   # Grid of all contributor cards
│   │   │   └── contributors.css       # Styles for contributor cards
│   │   ├── FeaturedContributor/
│   │   │   ├── FeaturedContributor.jsx      # Featured contributor banner
│   │   │   └── featured-contributor.css     # Styles for featured section
│   │   ├── ThankYouNote.jsx       # Honored contributor thank you banner
│   │   └── XIcon.jsx              # X (formerly Twitter) SVG icon
│   ├── data/
│   │   └── contributors.js        # Static contributor data (replaces GraphQL)
│   ├── pages/
│   │   ├── Home.jsx               # Main landing page
│   │   └── ContributorDetails.jsx # Individual contributor detail page
│   ├── styles/
│   │   ├── index.css              # Global styles
│   │   └── contributor-details.css # Styles for detail page
│   ├── App.jsx                    # Root component with routing
│   └── main.jsx                   # Vite app entry point
├── .dockerignore                  # Files excluded from Docker build
├── Dockerfile                     # Multi-stage Docker build
├── nginx.conf                     # nginx config for React Router support
├── index.html                     # HTML entry point with Jenkins web components
└── README.md
```

---

## About this migration

This is a proof of concept migration done as part of a GSoC (Google Summer of Code) project proposal for Jenkins.

The goal was to demonstrate:
- Understanding of the existing Gatsby codebase
- Ability to migrate it to a modern Vite + React setup
- Knowledge of routing, component structure, and styling
- CI/CD with GitHub Actions
- Containerization with Docker and nginx

The full production migration would also include:
- Reading real contributor data from AsciiDoc files
- Search and filter functionality
- SEO meta tags with react-helmet-async
- Full DOMPurify HTML sanitization
- Complete test coverage