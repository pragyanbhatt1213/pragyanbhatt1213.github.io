import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { Home } from './Home';
import { Work } from './Work';
import { CaseStudy } from './CaseStudy';
import { Notes } from './Notes';
import { LearningHistory } from './LearningHistory';
import { About } from './About';
import { Contact } from './Contact';
import { NotFound } from './NotFound';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<CaseStudy />} />
          <Route path="notes" element={<Notes />} />
          <Route path="notes/history" element={<LearningHistory />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
