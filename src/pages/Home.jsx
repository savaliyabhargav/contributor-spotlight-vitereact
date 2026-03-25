// src/pages/Home.jsx

import { useEffect, useState } from 'react';
import contributors from '../data/contributors';
import ThankYouNote from '../Components/ThankYouNote';
import ContributorsList from '../Components/Contributor/ContributorsList';
import FeaturedContributor from '../Components/FeaturedContributor/FeaturedContributor';
import '../styles/index.css';

const Home = () => {
  const [darkmode, setDarkmode] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaquery = window.matchMedia('(prefers-color-scheme: dark)');
      setDarkmode(mediaquery.matches);

      const handler = (event) => {
        setDarkmode(event.matches);
      };
      mediaquery.addEventListener('change', handler);
      return () => mediaquery.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const featuredContributor = contributors.find(
    (contributor) => contributor.node.pageAttributes.featured === 'true'
  );

  if (!mounted) return null;

  return (
    <>
      <title>Jenkins Contributor Spotlight</title>

      {/* Hero Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: isMobile ? '40px' : '80px',
          backgroundImage: 'url("/marek-szturc-2s3fI3M1lO0-unsplash.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h4
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: isMobile ? '1.25rem' : '1.5rem',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          <strong>Meet the driving forces behind Jenkins</strong>
          <br />
          as we showcase the top contributors shaping the future of continuous
          integration and delivery
        </h4>

        <div style={{ paddingTop: '64px' }}>
          <img src="/jenkins.png" alt="Jenkins logo" />
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          textAlign: 'center',
          fontSize: '35px',
          fontWeight: 'bolder',
          background: 'transparent',
          padding: '20px',
        }}
      >
        Contributor Spotlight
      </div>

      {/* Featured Contributor */}
      <FeaturedContributor
        contributor={featuredContributor}
        darkmode={darkmode}
      />

      {/* Contributors Grid */}
      <ContributorsList contributors={contributors} darkmode={darkmode} />

      {/* Thank You Note */}
      <ThankYouNote darkmode={darkmode} />
    </>
  );
};

export default Home;