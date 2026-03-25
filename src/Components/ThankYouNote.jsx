// src/components/ThankYouNote.jsx

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import dayjs from 'dayjs';

const ThankYouNote = ({ darkmode }) => {
  const [thankYou, setThankYou] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
      setIsDesktop(window.innerWidth >= 1200);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchHonoredContributor = () => {
      fetch(
        'https://raw.githubusercontent.com/jenkins-infra/jenkins-contribution-stats/main/data/honored_contributor.csv'
      )
        .then((res) => res.text())
        .then((text) => {
          const parsed = Papa.parse(text)?.data[1];
          // Clean quotes from all fields immediately
          const cleanData = parsed?.map(field => field?.replace(/['"]+/g, '').trim());
          setThankYou(cleanData);
        })
        .catch((error) => {
          console.error('Error fetching thank you note:', error);
        });
    };

    fetchHonoredContributor();
    const interval = setInterval(fetchHonoredContributor, 3600000);
    return () => clearInterval(interval);
  }, []);

  if (!thankYou || thankYou.length === 0) return null;

  const imgSize = isDesktop ? 100 : isMobile ? 36 : 90;
  
  // Mapping indices to named variables for clarity
  const [ , date, username, fullName, , profileUrl, avatarUrl, prCount, repoList] = thankYou;
  const repos = repoList?.split(/\s+/) || [];

  return (
    <div
      style={{
        padding: '40px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkmode ? '#333333' : '#ffffff',
        color: darkmode ? 'white' : 'black',
      }}
    >
      <div
        style={{
          padding: isMobile ? '16px' : '24px',
          borderRadius: '20px',
          maxWidth: 'fit-content',
          height: 'fit-content',
          backgroundColor: 'rgba(218, 209, 198, 0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: darkmode ? '1px solid white' : '1px solid black',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: isMobile ? '8px' : '24px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={avatarUrl}
              alt="Random contributor"
              width={imgSize}
              height={isMobile ? 'auto' : imgSize}
              style={{ marginTop: 'auto', marginBottom: 'auto' }}
            />
          </div>

          <div style={{ fontSize: isMobile ? 'small' : 'medium' }}>
            Thank you{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href={profileUrl}
              style={{ color: darkmode ? '#add8e6' : '#0000EE' }}
            >
              {fullName || username}
            </a>
            <br />
            for making {prCount} pull {parseInt(prCount) >= 2 ? 'requests' : 'request'}
            <br />
            to{' '}
            {repos.length >= 4 ? `${repos.length} Jenkins ` : 'the '}
            {repos.length < 4 &&
              repos.map((repo, idx) => (
                <span key={idx}>
                  {repos.length > 1 && idx === repos.length - 1 && 'and '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://github.com/${repo}`}
                    style={{ color: darkmode ? '#add8e6' : '#0000EE' }}
                  >
                    {repo.split('/')[1] || repo}
                  </a>
                  {idx < repos.length - 2 ? ', ' : idx === repos.length - 2 ? ' ' : ''}
                </span>
              ))}
            {repos.length > 1 ? ' repos' : ' repo'}{' '}
            in {dayjs(date).format('MMMM YYYY')}!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouNote;