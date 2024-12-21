import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';

export const renderWithProviders = (ui: ReactNode) => ({
  ...render(ui),
  user: userEvent.setup(),
});
