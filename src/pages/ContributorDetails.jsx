// src/pages/ContributorDetails.jsx

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Mail, Calendar, GitCommitHorizontal, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import XIcon from '../Components/XIcon';
import contributors from '../data/contributors';
import '../styles/contributor-details.css';
import dayjs from 'dayjs';

const ContributorDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const darkmode =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 600 && window.innerWidth < 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
      setIsDesktop(window.innerWidth >= 1200);
      setIsTablet(window.innerWidth >= 600 && window.innerWidth < 1200);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Find current contributor by slug
  const currentIndex = contributors.findIndex(
    (c) => c.node.fields.slug === `/${slug}`
  );
  const contributor = contributors[currentIndex];

  // Previous and next contributors
  const previousNode = currentIndex > 0 ? contributors[currentIndex - 1].node : null;
  const nextNode =
    currentIndex < contributors.length - 1
      ? contributors[currentIndex + 1].node
      : null;

  if (!contributor) {
    return (
      <div style={{ padding: '96px', textAlign: 'center' }}>
        <h1>Contributor not found</h1>
        <Link to="/">Go back home</Link>
      </div>
    );
  }

  const { pageAttributes, document, html } = contributor.node;
  const {
    name,
    image,
    location,
    datepublished,
    firstcommit,
    linkedin,
    twitter,
    github,
    email,
    pronouns,
    intro,
  } = pageAttributes;

  const title = `${name} - Jenkins Contributor Spotlight`;

  const socialLinkVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    }),
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { type: 'spring', stiffness: 400 },
    },
  };

  const padding = isDesktop
    ? '32px 160px'
    : isTablet
    ? '24px 64px'
    : '16px 32px';

  return (
    <>
      <title>{title}</title>

      <div style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Hero image section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '40px' : '80px',
            backgroundImage:
              'url("/marek-szturc-2s3fI3M1lO0-unsplash.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div style={{ paddingTop: isMobile ? '40px' : '64px' }}>
            <img
              src={image}
              alt="Contributor avatar"
              width={isDesktop ? 350 : isTablet ? 300 : 250}
              height={isDesktop ? 350 : isTablet ? 300 : 250}
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
        </div>

        {/* Content section */}
        <div style={{ padding }}>

          {/* Back button */}
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>←</span>
              <span>Back to Spotlight</span>
            </div>
          </Link>

          {/* Contributor Spotlight label */}
          <div style={{ paddingBottom: '16px', paddingTop: '16px' }}>
            <h5
              style={{
                fontWeight: 500,
                textAlign: 'center',
                margin: 0,
                fontSize: '1.25rem',
              }}
            >
              Contributor Spotlight
            </h5>
          </div>

          {/* Name and pronouns */}
          <div style={{ paddingBottom: '12px' }}>
            <h4
              style={{
                fontWeight: 700,
                textAlign: 'center',
                color: '#0096FF',
                margin: 0,
                fontSize: '1.5rem',
              }}
            >
              {document.title}
            </h4>
            <h5
              style={{
                textAlign: 'center',
                color: '#0096FF',
                margin: '4px 0 0',
                fontSize: '1.25rem',
                fontWeight: 400,
              }}
            >
              {pronouns ?? 'They/them'}
            </h5>
          </div>

          {/* Location and first commit */}
          <div style={{ paddingBottom: '12px' }}>
            <h6
              style={{
                textAlign: 'center',
                margin: 0,
                fontSize: '1rem',
                fontWeight: 400,
              }}
            >
              {location ?? 'World'}
            </h6>
            {firstcommit &&
              firstcommit !== 'null' &&
              firstcommit !== '' && (
                <h6
                  style={{
                    textAlign: 'center',
                    margin: '4px 0 0',
                    fontSize: '1rem',
                    fontWeight: 400,
                  }}
                >
                  First Commit: {firstcommit}
                </h6>
              )}
          </div>

          {/* Date published */}
          <div style={{ paddingBottom: '12px' }}>
            <h6
              style={{
                textAlign: 'center',
                margin: 0,
                fontSize: '1rem',
                fontWeight: 400,
              }}
            >
              Date Published: {datepublished}
            </h6>
          </div>

          {/* Social links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              paddingBottom: '16px',
            }}
          >
            {linkedin && linkedin !== '' && (
              <motion.a
                href={`https://linkedin.com/in/${linkedin}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                variants={socialLinkVariants}
                custom={1}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                className="social-link"
              >
                <Linkedin size={18} />
                <span className="social-tooltip">LinkedIn</span>
              </motion.a>
            )}

            {twitter && twitter !== '' && (
              <motion.a
                href={`https://x.com/${twitter}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                variants={socialLinkVariants}
                custom={2}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                className="social-link"
              >
                <XIcon size={18} />
                <span className="social-tooltip">X (formerly Twitter)</span>
              </motion.a>
            )}

            {github && github !== '' && (
              <motion.a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                variants={socialLinkVariants}
                custom={0}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                className="social-link"
              >
                <Github size={18} />
                <span className="social-tooltip">GitHub</span>
              </motion.a>
            )}

            {email && email !== '' && (
              <motion.a
                href={`mailto:${email}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                variants={socialLinkVariants}
                custom={1}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                className="social-link"
              >
                <Mail size={18} />
                <span className="social-tooltip">Email</span>
              </motion.a>
            )}
          </div>

          {/* Intro */}
          <div style={{ margin: '16px 0' }}>
            <p>{intro}</p>
          </div>

          {/* HTML content */}
          <div dangerouslySetInnerHTML={{ __html: html }} />

          {/* Previous / Next navigation */}
          <div
            style={{
              marginTop: '80px',
              paddingTop: '32px',
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: '16px',
            }}
          >
            {previousNode ? (
              <Link
                to={previousNode.fields.slug}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span>←</span>
                  <img
                    src={previousNode.pageAttributes.image}
                    alt={previousNode.document.title}
                    width={44}
                    height={44}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: darkmode ? '#bbbbbb' : '#666',
                      }}
                    >
                      Previous Profile
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        maxWidth: '180px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {previousNode.document.title}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextNode ? (
              <div style={{ alignSelf: isMobile ? 'flex-end' : 'auto' }}>
                <Link
                  to={nextNode.fields.slug}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: darkmode ? '#bbbbbb' : '#666',
                        }}
                      >
                        Next Profile
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          maxWidth: '180px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {nextNode.document.title}
                      </div>
                    </div>
                    <img
                      src={nextNode.pageAttributes.image}
                      alt={nextNode.document.title}
                      width={44}
                      height={44}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span>→</span>
                  </div>
                </Link>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContributorDetails;