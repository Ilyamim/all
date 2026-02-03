import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteTransitions } from './components/RouteTransitions';
import { RouteGuard } from './components/RouteGuard';
import { AppShell } from './layouts/AppShell';

const Landing = React.lazy(() => import('./pages/landing/Landing'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword'));

const VolunteerDashboard = React.lazy(() => import('./pages/volunteer/VolunteerDashboard'));
const VolunteerEvents = React.lazy(() => import('./pages/volunteer/events/VolunteerEvents'));
const VolunteerEventDetails = React.lazy(
  () => import('./pages/volunteer/events/VolunteerEventDetails'),
);
const CheckIn = React.lazy(() => import('./pages/volunteer/CheckIn'));
const Certificates = React.lazy(() => import('./pages/volunteer/Certificates'));

const OrganizerDashboard = React.lazy(() => import('./pages/organizer/OrganizerDashboard'));
const OrganizerEvents = React.lazy(() => import('./pages/organizer/events/OrganizerEvents'));
const OrganizerEventNew = React.lazy(() => import('./pages/organizer/events/OrganizerEventNew'));
const OrganizerEventManage = React.lazy(
  () => import('./pages/organizer/events/OrganizerEventManage'),
);

const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center text-muted">Loading...</div>
);

const DashboardShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppShell>{children}</AppShell>
);

const withShell = (element: React.ReactNode) => <DashboardShell>{element}</DashboardShell>;

const App = () => (
  <Suspense fallback={<Loading />}>
    <RouteTransitions>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard/volunteer"
          element={
            <RouteGuard roles={['volunteer']}>
              {withShell(<VolunteerDashboard />)}
            </RouteGuard>
          }
        />
        <Route
          path="/events"
          element={
            <RouteGuard roles={['volunteer']}>
              {withShell(<VolunteerEvents />)}
            </RouteGuard>
          }
        />
        <Route
          path="/events/:id"
          element={
            <RouteGuard roles={['volunteer']}>
              {withShell(<VolunteerEventDetails />)}
            </RouteGuard>
          }
        />
        <Route
          path="/checkin"
          element={
            <RouteGuard roles={['volunteer']}>
              {withShell(<CheckIn />)}
            </RouteGuard>
          }
        />
        <Route
          path="/certificates"
          element={
            <RouteGuard roles={['volunteer']}>
              {withShell(<Certificates />)}
            </RouteGuard>
          }
        />
        <Route
          path="/dashboard/organizer"
          element={
            <RouteGuard roles={['organizer']}>
              {withShell(<OrganizerDashboard />)}
            </RouteGuard>
          }
        />
        <Route
          path="/organizer/events"
          element={
            <RouteGuard roles={['organizer']}>
              {withShell(<OrganizerEvents />)}
            </RouteGuard>
          }
        />
        <Route
          path="/organizer/events/new"
          element={
            <RouteGuard roles={['organizer']}>
              {withShell(<OrganizerEventNew />)}
            </RouteGuard>
          }
        />
        <Route
          path="/organizer/events/:id"
          element={
            <RouteGuard roles={['organizer']}>
              {withShell(<OrganizerEventManage />)}
            </RouteGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <RouteGuard roles={['admin']}>
              {withShell(<AdminDashboard />)}
            </RouteGuard>
          }
        />
      </Routes>
    </RouteTransitions>
  </Suspense>
);

export default App;
