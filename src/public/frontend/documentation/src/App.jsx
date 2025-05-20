import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ThemeDebug from './components/ThemeDebug';
import Home from './pages/Home';
import APIDocs from './pages/APIDocs';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<APIDocs />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ThemeDebug />
    </ThemeProvider>
  );
}

export default App;
