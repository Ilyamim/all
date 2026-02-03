import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { RouteGuard } from '../components/RouteGuard';
import { UserProfile } from '../types/firestore';

let mockAuthState: {
  user: { uid: string } | null;
  profile: UserProfile | null;
  loading: boolean;
} = {
  user: null,
  profile: null,
  loading: false,
};

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => mockAuthState,
}));

const Protected = () => <div>Protected content</div>;

const renderWithRouter = (initialEntry: string) => {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route
          path="/protected"
          element={
            <RouteGuard roles={['volunteer']}>
              <Protected />
            </RouteGuard>
          }
        />
        <Route path="/login" element={<div>Login page</div>} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('RouteGuard', () => {
  it('redirects unauthenticated users to login', () => {
    mockAuthState = { user: null, profile: null, loading: false };
    renderWithRouter('/protected');
    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('blocks users without required role', () => {
    mockAuthState = {
      user: { uid: '123' },
      profile: {
        role: 'organizer',
        name: 'Org',
        email: 'org@test.com',
        uid: '123',
        createdAt: '',
        totalHours: 0,
        xp: 0,
        badges: [],
      },
      loading: false,
    };
    renderWithRouter('/protected');
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
  });
});
