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
  it('should render 0 by default', () => {
    renderWithProviders(<Calculator />);

    expect(screen.getByRole('textbox')).toHaveValue('0');
  });

  describe('clear action', () => {
    it('should render button', () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /clear/i }),
      ).toBeInTheDocument();
    });

    it('should render tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /clear/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /clear \(esc\); clear all \(opt-esc\)/i,
        }),
      ).toBeInTheDocument();
    });

    it('should render as clear all by default', () => {
      renderWithProviders(<Calculator />);

      expect(screen.getByRole('button', { name: /clear/i })).toHaveTextContent(
        'AC',
      );
    });
  });

  describe('negate action', () => {
    it('should render button', () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /negate/i }),
      ).toBeInTheDocument();
    });

    it('should render tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /negate/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /negate the displayed value \(or press option-minus \[-]\)/i,
        }),
      ).toBeInTheDocument();
    });

    it('should negate the display value', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /1/i }));

      await user.click(screen.getByRole('button', { name: /negate/i }));

      expect(screen.getByRole('textbox')).toHaveValue('-1');
    });

    it('should have no effect when display value is 0', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /negate/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0');
    });
  });

  describe('per cent action', () => {
    it('should render button', () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /per cent/i }),
      ).toBeInTheDocument();
    });

    it('should render tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /per cent/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /per cent \(or press %\)/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe('divide action', () => {
    it('should render button', () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /divide/i }),
      ).toBeInTheDocument();
    });

    it('should render tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /divide/i }));

      expect(
        await screen.findByRole('tooltip', { name: /divide \(or press \/\)/i }),
      ).toBeInTheDocument();
    });
  });

  describe('multiply action', () => {
    it('should render button', () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /multiply/i }),
      ).toBeInTheDocument();
    });

    it('should render tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /multiply/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /multiply \(or press \*\)/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe('subtract action', () => {
    it('should render button', () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /subtract/i }),
      ).toBeInTheDocument();
    });

    it('should render tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /subtract/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /subtract \(or press -\)/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe('add action', () => {
    it('should render button', () => {
      renderWithProviders(<Calculator />);

      expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    it('should render tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /add/i }));

      expect(
        await screen.findByRole('tooltip', { name: /add \(or press \+\)/i }),
      ).toBeInTheDocument();
    });
  });

  describe('equal action', () => {
    it('should render button', () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /equal/i }),
      ).toBeInTheDocument();
    });

    it('should render tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /equal/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /equal \(or press return\)/i,
        }),
      ).toBeInTheDocument();
    });
  });
});
