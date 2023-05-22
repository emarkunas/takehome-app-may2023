import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { assert } from 'console';

// placeholder
test('app renders', () => {
  render(<App />);
  assert(true);
});
