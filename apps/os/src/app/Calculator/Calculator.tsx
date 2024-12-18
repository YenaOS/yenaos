import { Box, Button, Input, styled, Tooltip } from '@mui/material';
import { isNaN } from 'lodash';
import { useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from 'react-i18next';

import { Operation, useCalculator } from './useCalculator';

interface Props {
  readonly autoFocus?: boolean;
}

export const Calculator = ({ autoFocus }: Props) => {
  const { t } = useTranslation('calculator');

  const {
    calculate,
    clearInput,
    decimalSeparator,
    digits,
    input,
    inputFallback,
    insertDecimalSeparator,
    insertDigit,
    negate,
    perCent,
    reset,
    result,
    setOperation,
  } = useCalculator();

  const handleClear = () => (input ? clearInput() : reset());

  const digitHotkeyRef = useHotkeys<HTMLDivElement>(
    digits.map(String),
    (_, event) => {
      insertDigit(Number(event.hotkey));
    },
  );
  const decimalPointHotkeyRef = useHotkeys<HTMLDivElement>(
    ['period', 'numpaddecimal'],
    () => {
      insertDecimalSeparator();
    },
  );
  const clearHotkeyRef = useHotkeys<HTMLDivElement>(
    ['escape', 'alt+escape'],
    (_, event) => {
      if (event.alt) {
        reset();
      } else {
        clearInput();
      }
    },
  );
  const negateHotkeyRef = useHotkeys<HTMLDivElement>('alt+minus', () => {
    negate();
  });
  const perCentHotkeyRef = useHotkeys<HTMLDivElement>('shift+5', () => {
    perCent();
  });
  const divideHotkeyRef = useHotkeys<HTMLDivElement>(
    ['slash', 'divide', 'numpaddivide'],
    () => {
      setOperation(Operation.Divide);
    },
  );
  const multiplyHotkeyRef = useHotkeys<HTMLDivElement>(
    ['shift+8', 'multiply'],
    () => {
      setOperation(Operation.Multiply);
    },
  );
  const subtractHotkeyRef = useHotkeys<HTMLDivElement>(
    ['minus', 'subtract'],
    () => {
      setOperation(Operation.Subtract);
    },
  );
  const addHotkeyRef = useHotkeys<HTMLDivElement>(
    ['shift+equal', 'add'],
    () => {
      setOperation(Operation.Add);
    },
  );
  const equalHotkeyRef = useHotkeys<HTMLDivElement>(
    ['enter', 'equal', 'numpadenter'],
    () => {
      calculate();
    },
  );

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const { current } = ref;

    if (!current) {
      return;
    }

    [
      addHotkeyRef,
      clearHotkeyRef,
      decimalPointHotkeyRef,
      digitHotkeyRef,
      divideHotkeyRef,
      equalHotkeyRef,
      multiplyHotkeyRef,
      negateHotkeyRef,
      perCentHotkeyRef,
      subtractHotkeyRef,
    ].forEach((r) => r(current));

    if (ref.current && autoFocus) {
      ref.current.focus();
    }
  }, [
    addHotkeyRef,
    autoFocus,
    clearHotkeyRef,
    decimalPointHotkeyRef,
    digitHotkeyRef,
    divideHotkeyRef,
    equalHotkeyRef,
    multiplyHotkeyRef,
    negateHotkeyRef,
    perCentHotkeyRef,
    subtractHotkeyRef,
    ref,
  ]);

  return (
    <Box
      display="grid"
      gridTemplateAreas="
        'input input input input'
        'clear negate perCent divide'
        'digit7 digit8 digit9 multiply'
        'digit4 digit5 digit6 subtract'
        'digit1 digit2 digit3 add'
        'digit0 digit0 decimalPoint equal'
      "
      gridTemplateColumns="repeat(4, 25%)"
      ref={ref}
      sx={{
        backgroundColor: '#222222',
      }}
      tabIndex={-1}
      width={230}
    >
      <Box gridArea="input">
        <Input
          disableUnderline
          fullWidth
          inputProps={{
            style: {
              color: '#fff',
              textAlign: 'right',
            },
          }}
          readOnly
          sx={{
            paddingRight: 1,
            fontSize: 40,
          }}
          value={isNaN(result) ? t('notANumber') : input || inputFallback}
        />
      </Box>
      <Box gridArea="clear">
        <Tooltip describeChild title={t('clearTooltip')}>
          <SecondaryActionButton
            aria-label={t(input ? 'clear' : 'clearAll')}
            fullWidth
            onClick={handleClear}
          >
            {input ? 'C' : 'AC'}
          </SecondaryActionButton>
        </Tooltip>
      </Box>
      <Box gridArea="negate">
        <Tooltip describeChild title={t('negateTooltip')}>
          <SecondaryActionButton
            aria-label={t('negate')}
            fullWidth
            onClick={negate}
          >
            &#177;
          </SecondaryActionButton>
        </Tooltip>
      </Box>
      <Box gridArea="perCent">
        <Tooltip describeChild title={t('perCentTooltip')}>
          <SecondaryActionButton
            aria-label={t('perCent')}
            fullWidth
            onClick={perCent}
          >
            &#37;
          </SecondaryActionButton>
        </Tooltip>
      </Box>
      {digits.map((digit) => (
        <Box gridArea={`digit${digit}`} key={digit}>
          <ActionButton fullWidth onClick={() => insertDigit(digit)}>
            {digit}
          </ActionButton>
        </Box>
      ))}
      <Box gridArea="decimalPoint" key="decimal-point">
        <ActionButton
          aria-label={t('decimalPoint')}
          fullWidth
          onClick={insertDecimalSeparator}
        >
          {decimalSeparator}
        </ActionButton>
      </Box>
      <Box gridArea="divide">
        <Tooltip describeChild title={t('divideTooltip')}>
          <PrimaryActionButton
            aria-label={t('divide')}
            fullWidth
            onClick={() => setOperation(Operation.Divide)}
          >
            &#247;
          </PrimaryActionButton>
        </Tooltip>
      </Box>
      <Box gridArea="multiply">
        <Tooltip describeChild title={t('multiplyTooltip')}>
          <PrimaryActionButton
            aria-label={t('multiply')}
            fullWidth
            onClick={() => setOperation(Operation.Multiply)}
          >
            &#215;
          </PrimaryActionButton>
        </Tooltip>
      </Box>
      <Box gridArea="subtract">
        <Tooltip describeChild title={t('subtractTooltip')}>
          <PrimaryActionButton
            aria-label={t('subtract')}
            fullWidth
            onClick={() => setOperation(Operation.Subtract)}
          >
            &#8722;
          </PrimaryActionButton>
        </Tooltip>
      </Box>
      <Box gridArea="add">
        <Tooltip describeChild title={t('addTooltip')}>
          <PrimaryActionButton
            aria-label={t('add')}
            fullWidth
            onClick={() => setOperation(Operation.Add)}
          >
            &#43;
          </PrimaryActionButton>
        </Tooltip>
      </Box>
      <Box gridArea="equal">
        <Tooltip describeChild title={t('equalTooltip')}>
          <PrimaryActionButton
            aria-label={t('equal')}
            fullWidth
            onClick={calculate}
          >
            &#61;
          </PrimaryActionButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

const AppButton = styled(Button)({
  borderRadius: 0,
  border: '1px black',
  borderTopStyle: 'solid',
  color: '#fff',
  fontSize: 18,
  minWidth: 0,
  minHeight: 48,
});

const ActionButton = styled(AppButton)({
  backgroundColor: '#595959',
  borderRightStyle: 'solid',
});

const PrimaryActionButton = styled(AppButton)({
  backgroundColor: '#ff9f0b',
});

const SecondaryActionButton = styled(AppButton)({
  backgroundColor: '#383838',
  borderRightStyle: 'solid',
});
