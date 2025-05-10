import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { mockClerk } from './mocks/clerk';

// Mock fetch
global.fetch = vi.fn();

// Mock Clerk
vi.mock('@clerk/nextjs', () => mockClerk);

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/dashboard',
  useSearchParams: () => new URLSearchParams(),
}));
