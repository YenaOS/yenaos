import { Box, Button, Grid2, Input, Stack, Tooltip } from '@mui/material';
import { range } from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const digits = range(0, 10);

const decimalPoint = '.';

const defaultDisplayValue = digits[0].toString();

enum Operation {
  Add = '+',
  Divide = '/',
  Multiply = '*',
  Subtract = '-',
}

export const Calculator = () => {
  const { t } = useTranslation('calculator');

  const [displayedValue, setDisplayedValue] = useState('');

  const [operand, setOperand] = useState('');
  const [operation, setOperation] = useState<Operation | undefined>();

  const handleClear = () => {
    setDisplayedValue('');

    setOperand('');
    setOperation(undefined);
  };

  const handleNegate = () => {
    if (!displayedValue || displayedValue === defaultDisplayValue) {
      return;
    }

    setDisplayedValue(
      displayedValue.startsWith('-')
        ? displayedValue.substring(1)
        : `-${displayedValue}`,
    );
  };

  const handlePercent = () =>
    setDisplayedValue((Number(displayedValue) / 100).toString());

  const handleDigit = (value: number) => () =>
    setDisplayedValue(
      !displayedValue || displayedValue === defaultDisplayValue
        ? value.toString()
        : displayedValue + value,
    );

  const handleDecimalPoint = () => {
    if (displayedValue.includes(decimalPoint)) {
      return;
    }

    setDisplayedValue((displayedValue || defaultDisplayValue) + decimalPoint);
  };

  const handleOperation = (value: Operation) => () => {
    if (!operand) {
      setOperand(displayedValue || defaultDisplayValue);
      setDisplayedValue(defaultDisplayValue);
    }

    setOperation(value);
  };

  const handleEqual = () => {
    if (!operand || !operation) {
      return;
    }

    const leftOperand = Number(operand);
    const rightOperand = Number(displayedValue);

    const performOperation = (a: number, b: number, op: Operation) => {
      switch (op) {
        case Operation.Add:
          return a + b;
        case Operation.Subtract:
          return a - b;
        case Operation.Multiply:
          return a * b;
        case Operation.Divide:
          return a / b;
      }
    };

    const result = performOperation(leftOperand, rightOperand, operation);

    setDisplayedValue(result.toString());
  };

  return (
    <Box maxWidth={300}>
      <Input
        fullWidth
        inputProps={{
          style: {
            textAlign: 'right',
          },
        }}
        readOnly
        value={displayedValue || defaultDisplayValue}
      />
      <Stack direction="row">
        <Box>
          <Stack direction="row">
            <Tooltip describeChild title={t('clearTooltip')}>
              <Button aria-label={t('clear')} fullWidth onClick={handleClear}>
                {displayedValue ? 'C' : 'AC'}
              </Button>
            </Tooltip>
            <Tooltip describeChild title={t('negateTooltip')}>
              <Button aria-label={t('negate')} fullWidth onClick={handleNegate}>
                +/-
              </Button>
            </Tooltip>
            <Tooltip describeChild title={t('perCentTooltip')}>
              <Button
                aria-label={t('perCent')}
                fullWidth
                onClick={handlePercent}
              >
                %
              </Button>
            </Tooltip>
          </Stack>
          <Grid2 columns={3} container direction="row-reverse">
            {digits.toReversed().map((digit) =>
              digit ? (
                <Grid2 key={digit} size={1}>
                  <Button fullWidth onClick={handleDigit(digit)}>
                    {digit}
                  </Button>
                </Grid2>
              ) : (
                [
                  <Grid2 key="decimal-point" size={1}>
                    <Button
                      aria-label={t('decimalPoint')}
                      fullWidth
                      onClick={handleDecimalPoint}
                    >
                      {decimalPoint}
                    </Button>
                  </Grid2>,
                  <Grid2 key={digit} size={2}>
                    <Button fullWidth onClick={handleDigit(digit)}>
                      {digit}
                    </Button>
                  </Grid2>,
                ]
              ),
            )}
          </Grid2>
        </Box>
        <Stack direction="column">
          <Tooltip describeChild title={t('divideTooltip')}>
            <Button
              aria-label={t('divide')}
              onClick={handleOperation(Operation.Divide)}
            >
              /
            </Button>
          </Tooltip>
          <Tooltip describeChild title={t('multiplyTooltip')}>
            <Button
              aria-label={t('multiply')}
              onClick={handleOperation(Operation.Multiply)}
            >
              x
            </Button>
          </Tooltip>
          <Tooltip describeChild title={t('subtractTooltip')}>
            <Button
              aria-label={t('subtract')}
              onClick={handleOperation(Operation.Subtract)}
            >
              -
            </Button>
          </Tooltip>
          <Tooltip describeChild title={t('addTooltip')}>
            <Button
              aria-label={t('add')}
              onClick={handleOperation(Operation.Add)}
            >
              +
            </Button>
          </Tooltip>
          <Tooltip describeChild title={t('equalTooltip')}>
            <Button aria-label={t('equal')} onClick={handleEqual}>
              =
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};
