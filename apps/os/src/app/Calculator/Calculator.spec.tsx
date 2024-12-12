import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Calculator } from './Calculator';

describe(Calculator, () => {
  it('should display tooltip for Clear', async () => {
    render(<Calculator />);

    fireEvent.mouseOver(screen.getByRole('button', { name: /clear/i }));

    expect(
      await screen.findByRole('tooltip', {
        name: /clear \(esc\); clear all \(opt-esc\)/i,
      }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Negate', async () => {
    render(<Calculator />);

    fireEvent.mouseOver(screen.getByRole('button', { name: /negate/i }));

    expect(
      await screen.findByRole('tooltip', {
        name: /negate the displayed value \(or press option-minus \[-]\)/i,
      }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Per cent', async () => {
    render(<Calculator />);

    fireEvent.mouseOver(screen.getByRole('button', { name: /per cent/i }));

    expect(
      await screen.findByRole('tooltip', { name: /per cent \(or press %\)/i }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Divide', async () => {
    render(<Calculator />);

    fireEvent.mouseOver(screen.getByRole('button', { name: /divide/i }));

    expect(
      await screen.findByRole('tooltip', { name: /divide \(or press \/\)/i }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Multiply', async () => {
    render(<Calculator />);

    fireEvent.mouseOver(screen.getByRole('button', { name: /multiply/i }));

    expect(
      await screen.findByRole('tooltip', { name: /multiply \(or press \*\)/i }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Subtract', async () => {
    render(<Calculator />);

    fireEvent.mouseOver(screen.getByRole('button', { name: /subtract/i }));

    expect(
      await screen.findByRole('tooltip', { name: /subtract \(or press -\)/i }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Add', async () => {
    render(<Calculator />);

    fireEvent.mouseOver(screen.getByRole('button', { name: /add/i }));

    expect(
      await screen.findByRole('tooltip', { name: /add \(or press \+\)/i }),
    ).toBeInTheDocument();
  });

  it('should display tooltip for Equal', async () => {
    render(<Calculator />);

    fireEvent.mouseOver(screen.getByRole('button', { name: /equal/i }));

    expect(
      await screen.findByRole('tooltip', {
        name: /equal \(or press return\)/i,
      }),
    ).toBeInTheDocument();
  });
});
