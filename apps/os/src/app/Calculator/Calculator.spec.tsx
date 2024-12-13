import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Calculator } from './Calculator';
import type { ReactNode } from 'react';
import { range } from 'lodash';

const renderWithProviders = (ui: ReactNode) => ({
  ...render(ui),
  user: userEvent.setup(),
});

describe(Calculator, () => {
  it("should render '0' as default display value", () => {
    renderWithProviders(<Calculator />);

    expect(screen.getByRole('textbox')).toHaveValue('0');
  });

  describe('digit actions', () => {
    describe.each(
      range(0, 10).map((digit) => ({
        digit,
      })),
    )('digit $digit action', ({ digit }) => {
      it('should render button', () => {
        renderWithProviders(<Calculator />);

        expect(
          screen.getByRole('button', { name: digit.toString() }),
        ).toBeInTheDocument();
      });

      it('should replace default display value when clicked one time', async () => {
        const { user } = renderWithProviders(<Calculator />);

        await user.click(
          screen.getByRole('button', { name: digit.toString() }),
        );

        const expected = digit.toString();

        expect(screen.getByRole('textbox')).toHaveValue(expected);
      });

      it(
        digit === 0
          ? 'should not change display value when clicked multiple times'
          : 'should append digit to display value when clicked multiple times',
        async () => {
          const { user } = renderWithProviders(<Calculator />);

          await user.click(
            screen.getByRole('button', { name: digit.toString() }),
          );
          await user.click(
            screen.getByRole('button', { name: digit.toString() }),
          );

          const expected = digit.toString().repeat(!digit ? 1 : 2);

          expect(screen.getByRole('textbox')).toHaveValue(expected);
        },
      );
    });
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
        /^ac$/i,
      );
    });

    it('should render as clear when display value is set', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '0' }));

      expect(screen.getByRole('button', { name: /clear/i })).toHaveTextContent(
        /^c$/i,
      );
    });

    it('should render as clear all when display value is cleared', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '0' }));

      await user.click(screen.getByRole('button', { name: /clear/i }));

      expect(screen.getByRole('button', { name: /clear/i })).toHaveTextContent(
        /^ac$/i,
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
