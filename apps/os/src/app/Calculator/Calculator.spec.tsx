import { screen } from '@testing-library/react';
import { range, without } from 'lodash';

import { renderWithProviders } from '../../testUtils';

import { Calculator } from './Calculator';

// TODO: render vs display, etc.
// TODO: rename negate to smth like negate input?
// TODO: rename per cent?
// TODO: not a number as regexp?
// TODO: rethink digit actions tests
describe(Calculator, () => {
  it('should render 0 by default', async () => {
    renderWithProviders(<Calculator />);

    expect(screen.getByRole('textbox')).toHaveValue('0');
  });

  describe('digit actions', () => {
    const digits = range(0, 10).map(String);
    const digit0 = digits[0];

    describe.each(without(digits, digit0))('digit %s action', (digit) => {
      it('should render action', async () => {
        renderWithProviders(<Calculator />);

        expect(screen.getByRole('button', { name: digit })).toBeInTheDocument();
      });

      it('should enter digit', async () => {
        const { user } = renderWithProviders(<Calculator />);

        await user.click(screen.getByRole('button', { name: digit }));

        expect(screen.getByRole('textbox')).toHaveValue(digit);
      });

      it('should add digit', async () => {
        const { user } = renderWithProviders(<Calculator />);

        await user.click(screen.getByRole('button', { name: digit }));
        await user.click(screen.getByRole('button', { name: digit }));

        expect(screen.getByRole('textbox')).toHaveValue(digit.repeat(2));
      });

      it('should support primary shortcut', async () => {
        const { user } = renderWithProviders(<Calculator autoFocus />);

        await user.keyboard(digit);

        expect(screen.getByRole('textbox')).toHaveValue(digit);
      });

      it('should support secondary shortcut', async () => {
        const { user } = renderWithProviders(<Calculator autoFocus />);

        await user.keyboard(`numpad${digit}`);

        expect(screen.getByRole('textbox')).toHaveValue(digit);
      });
    });

    describe.each([digit0])('digit %s action', (digit) => {
      it('should render action', async () => {
        renderWithProviders(<Calculator />);

        expect(screen.getByRole('button', { name: digit })).toBeInTheDocument();
      });

      it('should enter digit', async () => {
        const { user } = renderWithProviders(<Calculator />);

        await user.click(screen.getByRole('button', { name: digit }));

        expect(screen.getByRole('textbox')).toHaveValue(digit);
        expect(
          screen.getByRole('button', { name: /^clear$/i }),
        ).toBeInTheDocument();
      });

      it('should not add digit when already entered', async () => {
        const { user } = renderWithProviders(<Calculator />);

        await user.click(screen.getByRole('button', { name: digit }));
        await user.click(screen.getByRole('button', { name: digit }));

        expect(screen.getByRole('textbox')).toHaveValue(digit);
      });

      it('should add digit when different digit entered', async () => {
        const { user } = renderWithProviders(<Calculator />);

        await user.click(screen.getByRole('button', { name: '1' }));
        await user.click(screen.getByRole('button', { name: digit }));

        expect(screen.getByRole('textbox')).toHaveValue(`1${digit}`);
      });
    });
  });

  describe('decimal point action', () => {
    it('should render action', async () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /^decimal point$/i }),
      ).toBeInTheDocument();
    });

    it('should add decimal separator', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(
        screen.getByRole('button', { name: /^decimal point$/i }),
      );

      expect(screen.getByRole('textbox')).toHaveValue('0.');
    });

    it('should add decimal separator when digit entered', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(
        screen.getByRole('button', { name: /^decimal point$/i }),
      );

      expect(screen.getByRole('textbox')).toHaveValue('1.');
    });

    it('should not add decimal separator when already present', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(
        screen.getByRole('button', { name: /^decimal point$/i }),
      );
      await user.click(
        screen.getByRole('button', { name: /^decimal point$/i }),
      );

      expect(screen.getByRole('textbox')).toHaveValue('0.');
    });

    it('should support primary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('[period]');

      expect(screen.getByRole('textbox')).toHaveValue('0.');
    });

    it('should support secondary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('[numpaddecimal]');

      expect(screen.getByRole('textbox')).toHaveValue('0.');
    });
  });

  describe('delete last character action', () => {
    it('should do nothing when no input', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('backspace');

      expect(screen.getByRole('textbox')).toHaveValue('0');
    });

    it('should delete last character when digit', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[backspace]');

      expect(screen.getByRole('textbox')).toHaveValue('0');
      expect(
        screen.getByRole('button', { name: /^clear$/i }),
      ).toBeInTheDocument();
    });

    it('should delete last character when decimal separator', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('[period][backspace]');

      expect(screen.getByRole('textbox')).toHaveValue('0');
      expect(
        screen.getByRole('button', { name: /^clear$/i }),
      ).toBeInTheDocument();
    });
  });

  describe('clear actions', () => {
    it('should render clear all by default', async () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /^clear all$/i }),
      ).toBeInTheDocument();
    });

    it('should render action tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /^clear all$/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /^clear \(esc\); clear all \(opt-esc\)$/i,
        }),
      ).toBeInTheDocument();
    });

    it.todo('IMPLEMENT');
  });

  describe('negate action', () => {
    it('should render action', async () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /^negate$/i }),
      ).toBeInTheDocument();
    });

    it('should render action tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /^negate$/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /^negate the displayed value \(or press option-minus \[-]\)$/i,
        }),
      ).toBeInTheDocument();
    });

    it('should negate input', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: /^negate$/i }));

      expect(screen.getByRole('textbox')).toHaveValue('-1');
    });

    it('should do nothing when input is 0', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /^negate$/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0');
    });

    it('should support primary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1{alt>}[minus]{/alt}');

      expect(screen.getByRole('textbox')).toHaveValue('-1');
    });
  });

  describe('per cent action', () => {
    it('should render action', async () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /^per cent$/i }),
      ).toBeInTheDocument();
    });

    it('should render action tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /^per cent$/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /^per cent \(or press %\)$/i,
        }),
      ).toBeInTheDocument();
    });

    it('should divide input by 100', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: /^per cent$/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0.01');
    });

    it('should do nothing when input is 0', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /^per cent$/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0');
    });

    it('should do nothing when input is 0', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /^per cent$/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0');
    });

    it('should support primary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1{shift>}5{/shift}');

      expect(screen.getByRole('textbox')).toHaveValue('0.01');
    });
  });

  describe('divite action', () => {
    it('should render action', async () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /^divide$/i }),
      ).toBeInTheDocument();
    });

    it('should render action tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /^divide$/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /^divide \(or press \/\)$/i,
        }),
      ).toBeInTheDocument();
    });

    it('should perform division', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: /^divide$/i }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: /^equal$/i }));

      expect(screen.getByRole('textbox')).toHaveValue('0.5');
    });

    it('should render not a number message when dividing by 0', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: /^divide$/i }));
      await user.click(screen.getByRole('button', { name: /^equal$/i }));

      expect(screen.getByRole('textbox')).toHaveValue('Not a number');
    });

    it('should support primary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[slash]2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('0.5');
    });

    it('should support secondary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[numpaddivide]2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('0.5');
    });
  });

  describe('multiply action', () => {
    it('should render action', async () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /^multiply$/i }),
      ).toBeInTheDocument();
    });

    it('should render action tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /^multiply$/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /^multiply \(or press \*\)$/i,
        }),
      ).toBeInTheDocument();
    });

    it('should perform multiplication', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: /^multiply$/i }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: /^equal$/i }));

      expect(screen.getByRole('textbox')).toHaveValue('6');
    });

    it('should support primary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('2{Shift>}8{/Shift}3[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('6');
    });

    it('should support secondary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('2[numpadmultiply]3[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('6');
    });
  });

  describe('subtract action', () => {
    it('should render action', async () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /^subtract$/i }),
      ).toBeInTheDocument();
    });

    it('should render action tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /^subtract$/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /^subtract \(or press -\)$/i,
        }),
      ).toBeInTheDocument();
    });

    it('should perform sutraction', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: /^subtract$/i }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: /^equal$/i }));

      expect(screen.getByRole('textbox')).toHaveValue('-1');
    });

    it('should support primary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[minus]2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('-1');
    });

    it('should support secondary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[numpadsubtract]2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('-1');
    });
  });

  describe('add action', () => {
    it('should render action', async () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /^add$/i }),
      ).toBeInTheDocument();
    });

    it('should render action tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /^add$/i }));

      expect(
        await screen.findByRole('tooltip', { name: /^add \(or press \+\)$/i }),
      ).toBeInTheDocument();
    });

    it('should perform addition', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: /^add$/i }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: /^equal$/i }));

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });

    it('should support primary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1{Shift>}[equal]{/Shift}2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });

    it('should support secondary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[numpadadd]2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });
  });

  describe('equal action', () => {
    it('should render action', async () => {
      renderWithProviders(<Calculator />);

      expect(
        screen.getByRole('button', { name: /^equal$/i }),
      ).toBeInTheDocument();
    });

    it('should render action tooltip', async () => {
      const { user } = renderWithProviders(<Calculator />);

      await user.hover(screen.getByRole('button', { name: /^equal$/i }));

      expect(
        await screen.findByRole('tooltip', {
          name: /^equal \(or press return\)$/i,
        }),
      ).toBeInTheDocument();
    });

    it('should support primary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1{shift>}[equal]{/shift}2[equal]');

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });

    it('should support secondary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1{shift>}[equal]{/shift}2[enter]');

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });

    it('should support tertiary shortcut', async () => {
      const { user } = renderWithProviders(<Calculator autoFocus />);

      await user.keyboard('1[numpadadd]2[numpadenter]');

      expect(screen.getByRole('textbox')).toHaveValue('3');
    });
  });
});
