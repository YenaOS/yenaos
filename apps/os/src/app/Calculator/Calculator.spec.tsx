import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Calculator } from './Calculator';
import type { ReactNode } from 'react';

const renderWithProviders = (ui: ReactNode) => ({
  ...render(ui),
  user: userEvent.setup(),
});

describe(Calculator, () => {
  it('should display tooltip for Clear', async () => {
    const { user } = renderWithProviders(<Calculator />);

    await user.hover(screen.getByRole('button', { name: /clear/i }));

    expect(
      await screen.findByRole('tooltip', {
        name: /clear \(esc\); clear all \(opt-esc\)/i,
      }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Negate', async () => {
    const { user } = renderWithProviders(<Calculator />);

    await user.hover(screen.getByRole('button', { name: /negate/i }));

    expect(
      await screen.findByRole('tooltip', {
        name: /negate the displayed value \(or press option-minus \[-]\)/i,
      }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Per cent', async () => {
    const { user } = renderWithProviders(<Calculator />);

    await user.hover(screen.getByRole('button', { name: /per cent/i }));

    expect(
      await screen.findByRole('tooltip', { name: /per cent \(or press %\)/i }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Divide', async () => {
    const { user } = renderWithProviders(<Calculator />);

    await user.hover(screen.getByRole('button', { name: /divide/i }));

    expect(
      await screen.findByRole('tooltip', { name: /divide \(or press \/\)/i }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Multiply', async () => {
    const { user } = renderWithProviders(<Calculator />);

    await user.hover(screen.getByRole('button', { name: /multiply/i }));

    expect(
      await screen.findByRole('tooltip', { name: /multiply \(or press \*\)/i }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Subtract', async () => {
    const { user } = renderWithProviders(<Calculator />);

    await user.hover(screen.getByRole('button', { name: /subtract/i }));

    expect(
      await screen.findByRole('tooltip', { name: /subtract \(or press -\)/i }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Add', async () => {
    const { user } = renderWithProviders(<Calculator />);

    await user.hover(screen.getByRole('button', { name: /add/i }));

    expect(
      await screen.findByRole('tooltip', { name: /add \(or press \+\)/i }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Equal', async () => {
    const { user } = renderWithProviders(<Calculator />);

    await user.hover(screen.getByRole('button', { name: /equal/i }));

    expect(
      await screen.findByRole('tooltip', {
        name: /equal \(or press return\)/i,
      }),
    ).toBeInTheDocument();
  });
});
