// src/data/contributors.js
// This replaces Gatsby's GraphQL + AsciiDoc data source.
// Add real contributors to the array below.
// Shape mirrors the original: contributor.node.pageAttributes / contributor.node.fields.slug

const contributors = [
  {
    node: {
      id: '1',
      html: `<p>Mark has been a Jenkins contributor since 2014, focusing on pipeline and plugin development.</p>
             <h2>How did you get involved in Jenkins?</h2>
             <p>I started using Jenkins at work and ended up filing bugs, then fixing them.</p>`,
      document: {
        title: 'Mark Waite',
        main: '',
      },
      fields: {
        slug: '/mark-waite',
      },
      pageAttributes: {
        datepublished: '2023-11-29',
        name: 'Mark Waite',
        pronouns: 'He/him',
        location: 'Colorado, USA',
        firstcommit: '2014',
        linkedin: 'markwaite',
        twitter: 'MarkEWaite',
        github: 'MarkEWaite',
        email: '',
        image: 'https://avatars.githubusercontent.com/u/461279?v=4',
        featured: 'true',
        intro:
          'is a long-time Jenkins contributor and maintainer of the git plugin, Jenkins platform, and contributor experience.',
      },
    },
  },
  {
    node: {
      id: '2',
      html: `<p>Basil Crow is a Jenkins core maintainer and active community contributor.</p>
             <h2>What do you work on?</h2>
             <p>I focus on Jenkins core, LTS releases, and helping triage issues.</p>`,
      document: {
        title: 'Basil Crow',
        main: '',
      },
      fields: {
        slug: '/basil-crow',
      },
      pageAttributes: {
        datepublished: '2023-10-15',
        name: 'Basil Crow',
        pronouns: 'He/him',
        location: 'USA',
        firstcommit: '2018',
        linkedin: '',
        twitter: '',
        github: 'basil',
        email: '',
        image: 'https://avatars.githubusercontent.com/u/20538984?v=4',
        featured: 'false',
        intro: 'is a Jenkins core maintainer focused on stability and LTS releases.',
      },
    },
  },
  {
    node: {
      id: '3',
      html: `<p>Kris Stern is a contributor focused on documentation and community outreach.</p>`,
      document: {
        title: 'Kris Stern',
        main: '',
      },
      fields: {
        slug: '/kris-stern',
      },
      pageAttributes: {
        datepublished: '2023-09-01',
        name: 'Kris Stern',
        pronouns: 'She/her',
        location: 'Hong Kong',
        firstcommit: '2020',
        linkedin: 'kris-stern',
        twitter: 'Kris_Stern',
        github: 'krisstern',
        email: '',
        image: 'https://avatars.githubusercontent.com/u/33717618?v=4',
        featured: 'false',
        intro: 'is a contributor who focuses on documentation, testing, and community building.',
      },
    },
  },
];

export default contributors;