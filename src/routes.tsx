import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './features/landing/LandingPage';
import { GeneratorPortal } from './features/generator/GeneratorPortal';
import { MatchEnginePage } from './features/matching/MatchEnginePage';
import { SettlementPage } from './features/settlement/SettlementPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="generator" element={<GeneratorPortal />} />
        <Route path="matching" element={<MatchEnginePage />} />
        <Route path="settlement" element={<SettlementPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

