// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ContributorDetails from './pages/ContributorDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<ContributorDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;