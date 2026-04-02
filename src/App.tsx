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

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
