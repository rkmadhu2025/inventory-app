/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Assets } from './pages/Assets';
import { Configurations } from './pages/Configurations';
import { Vulnerabilities } from './pages/Vulnerabilities';
import { Compliance } from './pages/Compliance';
import { AuditLog } from './pages/AuditLog';
import { Tenants } from './pages/Tenants';
import { Automation } from './pages/Automation';
import { Infrastructure } from './pages/Infrastructure';
import { Topology } from './pages/Topology';
import { Monitoring } from './pages/Monitoring';
import { Racks } from './pages/Racks';
import { NetworkAI } from './components/NetworkAI';
import { AuthProvider, useAuth } from './components/AuthProvider';

function AppContent() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-muted-foreground">Initializing NetConfig Pro...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">NetConfig Pro</h1>
            <p className="text-muted-foreground">Secure Multi-Tenant Infrastructure Management</p>
          </div>
          <div className="bg-card border rounded-xl p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Welcome Back</h2>
              <p className="text-sm text-muted-foreground">Sign in with your Google account to access your network inventory.</p>
            </div>
            <button
              onClick={signIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            <p className="text-[10px] text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="infrastructure" element={<Infrastructure />} />
          <Route path="topology" element={<Topology />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="racks" element={<Racks />} />
          <Route path="configs" element={<Configurations />} />
          <Route path="automation" element={<Automation />} />
          <Route path="vulnerabilities" element={<Vulnerabilities />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="audit-log" element={<AuditLog />} />
          <Route path="tenants" element={<Tenants />} />
        </Route>
      </Routes>
      <NetworkAI />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
