# Jenkins Contributor Spotlight — Gatsby to Vite Migration

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
```bash
npm install
npm run dev
```

---

## Project structure
```
src/
├── components/
│   ├── Contributor/
│   │   ├── ContributorCard.jsx
│   │   ├── ContributorsList.jsx
│   │   └── contributors.css
│   ├── FeaturedContributor/
│   │   ├── FeaturedContributor.jsx
│   │   └── featured-contributor.css
│   ├── ThankYouNote.jsx
│   └── XIcon.jsx
├── data/
│   └── contributors.js
├── pages/
│   ├── Home.jsx
│   └── ContributorDetails.jsx
├── styles/
│   ├── index.css
│   └── contributor-details.css
├── App.jsx
└── main.jsx
index.html
public/
├── jenkins.png
└── marek-szturc-2s3fI3M1lO0-unsplash.jpg
```
