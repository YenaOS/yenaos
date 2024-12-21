import { Box, Button, ButtonProps, Input, styled, Tooltip } from '@mui/material';
import { isNaN } from 'lodash';
import { forwardRef, Ref, useCallback, useEffect, useRef } from 'react';
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
    deleteLastCharacter,
    digits,
    hasInput,
    hasResult,
    input,
    inputFallback,
    insertDecimalSeparator,
    insertDigit,
    negate,
    operation,
    perCent,
    reset,
    result,
    setOperation,
  } = useCalculator();

  const useClearInput = input && !result;

  const handleClearAll = useCallback(() => reset(), [reset]);

  const handleClear = useCallback(() => clearInput(), [clearInput]);

  const digitHotkeyRef = useHotkeys<HTMLDivElement>(
    digits,
    (_, event) => {
      insertDigit(event.hotkey);
    },
    [insertDigit],
  );
  const decimalPointHotkeyRef = useHotkeys<HTMLDivElement>(
    ['period', 'numpaddecimal'],
    () => {
      insertDecimalSeparator();
    },
    [insertDecimalSeparator],
  );
  const deleteLastCharacterHotkeyRef = useHotkeys<HTMLDivElement>('backspace', () => deleteLastCharacter(), [
    deleteLastCharacter,
  ]);
  const clearHotkeyRef = useHotkeys<HTMLDivElement>(
    ['escape', 'alt+escape'],
    (_, event) => {
      if (event.alt) {
        reset();
      } else {
        clearInput();
      }
    },
    [clearInput, reset],
  );
  const negateHotkeyRef = useHotkeys<HTMLDivElement>(
    'alt+minus',
    () => {
      negate();
    },
    [negate],
  );
  const perCentHotkeyRef = useHotkeys<HTMLDivElement>(
    'shift+5',
    () => {
      perCent();
    },
    [perCent],
  );
  const divideHotkeyRef = useHotkeys<HTMLDivElement>(
    ['slash', 'divide', 'numpaddivide'],
    () => {
      setOperation(Operation.Divide);
    },
    [setOperation],
  );
  const multiplyHotkeyRef = useHotkeys<HTMLDivElement>(
    ['shift+8', 'multiply'],
    () => {
      setOperation(Operation.Multiply);
    },
    [setOperation],
  );
  const subtractHotkeyRef = useHotkeys<HTMLDivElement>(
    ['minus', 'subtract'],
    () => {
      setOperation(Operation.Subtract);
    },
    [setOperation],
  );
  const addHotkeyRef = useHotkeys<HTMLDivElement>(
    ['shift+equal', 'add'],
    () => {
      setOperation(Operation.Add);
    },
    [setOperation],
  );
  const equalHotkeyRef = useHotkeys<HTMLDivElement>(
    ['enter', 'equal', 'numpadenter'],
    () => {
      calculate();
    },
    [calculate],
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
      deleteLastCharacterHotkeyRef,
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
    deleteLastCharacterHotkeyRef,
    digitHotkeyRef,
    divideHotkeyRef,
    equalHotkeyRef,
    multiplyHotkeyRef,
    negateHotkeyRef,
    perCentHotkeyRef,
    ref,
    subtractHotkeyRef,
  ]);

  const disableOperations = !!operation && hasInput;

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
          {useClearInput ? (
            <SecondaryActionButton aria-label={t('clear')} fullWidth onClick={handleClear}>
              C
            </SecondaryActionButton>
          ) : (
            <SecondaryActionButton aria-label={t('clearAll')} fullWidth onClick={handleClearAll}>
              AC
            </SecondaryActionButton>
          )}
        </Tooltip>
      </Box>
      <Box gridArea="negate">
        <Tooltip describeChild title={t('negateTooltip')}>
          <SecondaryActionButton aria-label={t('negate')} disabled={hasResult} fullWidth onClick={negate}>
            &#177;
          </SecondaryActionButton>
        </Tooltip>
      </Box>
      <Box gridArea="perCent">
        <Tooltip describeChild title={t('perCentTooltip')}>
          <SecondaryActionButton aria-label={t('perCent')} disabled={hasResult} fullWidth onClick={perCent}>
            &#37;
          </SecondaryActionButton>
        </Tooltip>
      </Box>
      {digits.map((digit) => (
        <Box gridArea={`digit${digit}`} key={digit}>
          <DigitButton disabled={hasResult} fullWidth onClick={insertDigit} value={digit}>
            {digit}
          </DigitButton>
        </Box>
      ))}
      <Box gridArea="decimalPoint" key="decimal-point">
        <ActionButton aria-label={t('decimalPoint')} disabled={hasResult} fullWidth onClick={insertDecimalSeparator}>
          {decimalSeparator}
        </ActionButton>
      </Box>
      <Box gridArea="divide">
        <Tooltip describeChild title={t('divideTooltip')}>
          <OperationButton
            aria-label={t('divide')}
            disabled={disableOperations}
            fullWidth
            onClick={setOperation}
            value={Operation.Divide}
          >
            &#247;
          </OperationButton>
        </Tooltip>
      </Box>
      <Box gridArea="multiply">
        <Tooltip describeChild title={t('multiplyTooltip')}>
          <OperationButton
            aria-label={t('multiply')}
            disabled={disableOperations}
            fullWidth
            onClick={setOperation}
            value={Operation.Multiply}
          >
            &#215;
          </OperationButton>
        </Tooltip>
      </Box>
      <Box gridArea="subtract">
        <Tooltip describeChild title={t('subtractTooltip')}>
          <OperationButton
            aria-label={t('subtract')}
            disabled={disableOperations}
            fullWidth
            onClick={setOperation}
            value={Operation.Subtract}
          >
            &#8722;
          </OperationButton>
        </Tooltip>
      </Box>
      <Box gridArea="add">
        <Tooltip describeChild title={t('addTooltip')}>
          <OperationButton
            aria-label={t('add')}
            disabled={disableOperations}
            fullWidth
            onClick={setOperation}
            value={Operation.Add}
          >
            &#43;
          </OperationButton>
        </Tooltip>
      </Box>
      <Box gridArea="equal">
        <Tooltip describeChild title={t('equalTooltip')}>
          <PrimaryActionButton aria-label={t('equal')} disabled={hasResult} fullWidth onClick={calculate}>
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

interface DigitButtonProps extends Omit<ButtonProps, 'onClick'> {
  readonly onClick?: (value: string) => void;
  readonly value: string;
}

const DigitButton = forwardRef(({ onClick, value, ...props }: DigitButtonProps) => {
  const handleClick = useCallback(() => onClick?.(value), [onClick, value]);

  return <ActionButton {...props} onClick={handleClick} />;
});

const PrimaryActionButton = styled(AppButton)({
  backgroundColor: '#ff9f0b',
});

interface OperationButtonProps extends Omit<ButtonProps, 'onClick'> {
  readonly onClick?: (value: Operation) => void;
  readonly value: Operation;
}

const OperationButton = forwardRef(
  ({ onClick, value, ...props }: OperationButtonProps, ref: Ref<HTMLButtonElement>) => {
    const handleClick = useCallback(() => onClick?.(value), [onClick, value]);

    return <PrimaryActionButton {...props} onClick={handleClick} ref={ref} />;
  },
);

const SecondaryActionButton = styled(AppButton)({
  backgroundColor: '#383838',
  borderRightStyle: 'solid',
});
