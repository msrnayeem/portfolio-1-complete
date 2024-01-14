import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import AddProject from './pages/AddProject';
import AddSkill from './pages/addSkill';
import Admin from './Layout/Admin';
import AdminPanel from './pages/AdminPanel';
import EditSkill from './pages/EditSkill';
import EditProject from './pages/EditProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/skills" element={<Layout><Skills /></Layout>} />
        <Route path="/projects" element={<Layout><Projects /></Layout>} />

        <Route path="/admin" element={<Admin><AdminPanel /></Admin>} />
        <Route path="/addproject" element={<Admin><AddProject /></Admin>} />
        <Route path="/addskill" element={<Admin><AddSkill /></Admin>} />
        <Route path="/editkill/:skillId" element={<Admin><EditSkill /></Admin>} />
        <Route path="/editProject/:projectId" element={<Admin><EditProject /></Admin>} />
      </Routes>
    </Router>
  );
}

export default App;
