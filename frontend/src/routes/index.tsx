import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/layouts/RootLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

import { PortalEntry } from '@/pages/PortalEntry';
import { Login } from '@/pages/Login';
import { AdminLogin } from '@/pages/AdminLogin';

import { Dashboard } from '@/pages/Dashboard';
import { Services } from '@/pages/Services';
import { Consent } from '@/pages/Consent';
import { Interoperability } from '@/pages/Interoperability';
import { Applications } from '@/pages/Applications';
import { PortalsDirectory } from '@/pages/PortalsDirectory';
import { PortalDetail } from '@/pages/PortalDetail';
import { VerificationHub } from '@/pages/VerificationHub';

import { Admin } from '@/pages/Admin';
import { AdminApplications } from '@/pages/AdminApplications';
import { AdminDepartments } from '@/pages/AdminDepartments';

export const router = createBrowserRouter([
  /* =====================================================
     LANDING PAGE
  ===================================================== */

  {
    path: '/',
    element: <PortalEntry />,
  },

  /* =====================================================
     CITIZEN LOGIN
  ===================================================== */

  {
    path: '/login',
    element: <Login />,
  },

  /* =====================================================
     CITIZEN PORTAL
  ===================================================== */

  {
    path: '/user',
    element: <RootLayout />,
    children: [

      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: 'portals',
        element: <PortalsDirectory />,
      },

      {
        path: 'portals/:portalId',
        element: <PortalDetail />,
      },

      {
        path: 'verification',
        element: <VerificationHub />,
      },

      {
        path: 'services',
        element: <Services />,
      },

      {
        path: 'consent',
        element: <Consent />,
      },

      {
        path: 'interop',
        element: <Interoperability />,
      },

      {
        path: 'applications',
        element: <Applications />,
      },

    ],
  },

  /* =====================================================
     ADMIN LOGIN
  ===================================================== */

  {
    path: '/admin/login',
    element: <AdminLogin />,
  },

  /* =====================================================
     ADMIN PORTAL
  ===================================================== */

  {
  path: '/admin',
  element: <AdminLayout />,
  children: [
    { index: true, element: <Admin /> },
    { path: 'applications', element: <AdminApplications /> },
    { path: 'departments', element: <AdminDepartments /> },
  ],
},
]);