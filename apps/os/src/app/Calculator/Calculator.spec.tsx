import { screen } from '@testing-library/react';
import { range } from 'lodash';

import { renderWithProviders } from '../../testUtils';

import { Calculator } from './Calculator';

describe(Calculator, () => {
  it('should render 0 as default display value', async () => {
    renderWithProviders(<Calculator />);

    expect(screen.getByRole('textbox')).toHaveValue('0');
  });

  describe('digit actions', () => {
    describe.each(
      range(0, 10).map((digit) => ({
        digit,
      })),
    )('digit $digit action', ({ digit }) => {
      it('should render button', async () => {
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

      it('should handle primary hotkey', async () => {
        const { user } = renderWithProviders(<Calculator autoFocus />);

        await user.keyboard(digit.toString());

        expect(screen.getByRole('textbox')).toHaveValue(digit.toString());
      });

      it('should handle secondary hotkey', async () => {
        const { user } = renderWithProviders(<Calculator autoFocus />);

        await user.keyboard(`numpad${digit}`);

        expect(screen.getByRole('textbox')).toHaveValue(digit.toString());
      });
    });
  });

  describe('decimal point action', () => {
    it('should render button', async () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /decimal point/i }),
      ).toBeInTheDocument();
    });

    it('should append decimal point when no display value', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /decimal point/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0.');
    });

    it('should append decimal point', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));

      await user.click(screen.getByRole('button', { name: /decimal point/i }));

      expect(screen.getByRole('textbox')).toHaveValue('1.');
    });

    it('should do nothing when decimal point is already present', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /decimal point/i }));

      await user.click(screen.getByRole('button', { name: /decimal point/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0.');
    });

    it('should handle primary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('[period]');

      expect(screen.getByRole('textbox')).toHaveValue('0.');
    });

    it('should handle secondary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('[numpaddecimal]');

      expect(screen.getByRole('textbox')).toHaveValue('0.');
    });
  });

  describe('clear action', () => {
    it('should render button', async () => {
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

    it('should render as clear all by default', async () => {
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

    it('should clear display value', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));

      await user.click(screen.getByRole('button', { name: /clear/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0');
    });

    it('should clear display value using keyboard', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[esc]');

      expect(screen.getByRole('textbox')).toHaveValue('0');
    });

    it('should render as clear all when display value is cleared', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '0' }));

      await user.click(screen.getByRole('button', { name: /clear/i }));

      expect(screen.getByRole('button', { name: /clear/i })).toHaveTextContent(
        /^ac$/i,
      );
    });

    it('should only clear input when first operand is set', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));

      await user.click(screen.getByRole('button', { name: /add/i }));

      await user.click(screen.getByRole('button', { name: '2' }));

      await user.click(screen.getByRole('button', { name: /clear/i }));

      await user.click(screen.getByRole('button', { name: '3' }));

      await user.click(screen.getByRole('button', { name: /equal/i }));

      expect(screen.getByRole('textbox')).toHaveValue('4');
    });
  });

  describe('negate action', () => {
    it('should render button', async () => {
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

      await user.click(screen.getByRole('button', { name: '1' }));

      await user.click(screen.getByRole('button', { name: /negate/i }));

      expect(screen.getByRole('textbox')).toHaveValue('-1');
    });

    it('should have no effect when display value is 0', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /negate/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0');
    });

    it('should handle primary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1{alt>}[minus]{/alt}');

      expect(screen.getByRole('textbox')).toHaveValue('-1');
    });
  });

  describe('per cent action', () => {
    it('should render button', async () => {
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

    it('should divide the display value by 100', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));

      await user.click(screen.getByRole('button', { name: /per cent/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0.01');
    });

    it('should do nothing when display value is 0', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /per cent/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0');
    });

    it('should render 0 when display value is 0 with decimal point', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /decimal point/i }));
      await user.click(screen.getByRole('button', { name: '0' }));

      await user.click(screen.getByRole('button', { name: /per cent/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0');
    });

    it('should handle primary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1{shift>}5{/shift}');

      expect(screen.getByRole('textbox')).toHaveValue('0.01');
    });
  });

  describe('divide action', () => {
    it('should render button', async () => {
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

    it('should perform division', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));

      await user.click(screen.getByRole('button', { name: /divide/i }));

      await user.click(screen.getByRole('button', { name: '2' }));

      await user.click(screen.getByRole('button', { name: /equal/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0.5');
    });

    it('should render not a number message when dividing by 0', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /divide/i }));

      await user.click(screen.getByRole('button', { name: /equal/i }));

      expect(screen.getByRole('textbox')).toHaveValue('Not a number');
    });

    it('should handle primary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[slash]2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('0.5');
    });

    it('should handle secondary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[numpaddivide]2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('0.5');
    });
  });

  describe('multiply action', () => {
    it('should render button', async () => {
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

    it('should perform multiplication', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '2' }));

      await user.click(screen.getByRole('button', { name: /multiply/i }));

      await user.click(screen.getByRole('button', { name: '3' }));

      await user.click(screen.getByRole('button', { name: /equal/i }));

      expect(screen.getByRole('textbox')).toHaveValue('6');
    });

    it('should handle primary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('2{Shift>}8{/Shift}3[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('6');
    });

    it('should handle secondary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('2[numpadmultiply]3[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('6');
    });
  });

  describe('subtract action', () => {
    it('should render button', async () => {
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

    it('should perform sutraction', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));

      await user.click(screen.getByRole('button', { name: /subtract/i }));

      await user.click(screen.getByRole('button', { name: '2' }));

      await user.click(screen.getByRole('button', { name: /equal/i }));

      expect(screen.getByRole('textbox')).toHaveValue('-1');
    });

    it('should handle primary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[minus]2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('-1');
    });

    it('should handle secondary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[numpadsubtract]2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('-1');
    });
  });

  describe('add action', () => {
    it('should render button', async () => {
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

    it('should perform addition', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));

      await user.click(screen.getByRole('button', { name: /add/i }));

      await user.click(screen.getByRole('button', { name: '2' }));

      await user.click(screen.getByRole('button', { name: /equal/i }));

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });

    it('should handle primary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1{Shift>}[equal]{/Shift}2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });

    it('should handle secondary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[numpadadd]2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });
  });

  describe('equal action', () => {
    it('should render button', async () => {
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

    it('should handle primary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1{shift>}[equal]{/shift}2[enter]');

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });

    it('should handle secondary hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1{shift>}[equal]{/shift}2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });

    it('should handle secondary 2 hotkey', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1{shift>}[equal]{/shift}2[numpadenter]');

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });
  });
});
