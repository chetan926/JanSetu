import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Login } from '@/pages/Login';
import { Services } from '@/pages/Services';
import { Consent } from '@/pages/Consent';
import { Interoperability } from '@/pages/Interoperability';
import { Applications } from '@/pages/Applications';
import { Admin } from '@/pages/Admin';
import { PortalsDirectory } from '@/pages/PortalsDirectory';
import { PortalDetail } from '@/pages/PortalDetail';
import { VerificationHub } from '@/pages/VerificationHub';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'portals', element: <PortalsDirectory /> },
      { path: 'portals/:portalId', element: <PortalDetail /> },
      { path: 'verification', element: <VerificationHub /> },
      { path: 'services', element: <Services /> },
      { path: 'consent', element: <Consent /> },
      { path: 'interop', element: <Interoperability /> },
      { path: 'applications', element: <Applications /> },
      { path: 'admin', element: <Admin /> },
    ],
  },
]);
