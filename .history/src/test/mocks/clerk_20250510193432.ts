import { vi } from 'vitest';

export const mockClerk = {
  auth: vi.fn(() => ({
    userId: 'user_123',
    getToken: vi.fn(() => 'mock_token'),
  })),
  useAuth: vi.fn(() => ({
    isLoaded: true,
    isSignedIn: true,
    userId: 'user_123',
  })),
  useUser: vi.fn(() => ({
    isLoaded: true,
    isSignedIn: true,
    user: {
      id: 'user_123',
      primaryEmailAddress: {
        emailAddress: 'test@example.com',
      },
      fullName: 'Test User',
    },
  })),
  useClerk: vi.fn(() => ({
    signOut: vi.fn(),
    user: {
      id: 'user_123',
      primaryEmailAddress: {
        emailAddress: 'test@example.com',
      },
    },
  })),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignIn: () => <div>Sign In</div>,
  SignUp: () => <div>Sign Up</div