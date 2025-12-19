import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
  localStorage.clear();
});

// Mock console methods if needed
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
};
