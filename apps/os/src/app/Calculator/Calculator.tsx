import { Box, Button, Grid2, Input, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { range } from 'lodash';

const digits = range(0, 10);

const defaultDisplayValue = digits[0].toString();

enum Operation {
  Add = '+',
  Divide = '/',
  Multiply = '*',
  Subtract = '-',
}

export const Calculator = () => {
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
    setDisplayedValue(
      (Number(displayedValue.replace(',', '.')) / 100).toString(),
    );

  const handleDigit = (value: number) => () =>
    setDisplayedValue(
      !displayedValue || displayedValue === defaultDisplayValue
        ? value.toString()
        : displayedValue + value,
    );

  const handleDecimalPoint = () => {
    if (displayedValue.includes(',')) {
      return;
    }

    setDisplayedValue(displayedValue || defaultDisplayValue + ',');
  };

  const handleOperation = (value: Operation) => () => setOperation(value);

  const handleEqual = () => undefined;

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
            <Tooltip describeChild title="Clear (Esc); Clear All (Opt-Esc)">
              <Button aria-label="Clear" fullWidth onClick={handleClear}>
                {displayedValue ? 'C' : 'AC'}
              </Button>
            </Tooltip>
            <Tooltip
              describeChild
              title="Negate the displayed value (or press Option-Minus [-])"
            >
              <Button aria-label="Negate" fullWidth onClick={handleNegate}>
                +/-
              </Button>
            </Tooltip>
            <Tooltip describeChild title="Per cent (or press %)">
              <Button aria-label="Per cent" fullWidth onClick={handlePercent}>
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
                      aria-label="Decimal point"
                      fullWidth
                      onClick={handleDecimalPoint}
                    >
                      ,
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
          <Tooltip describeChild title="Divide (or press /)">
            <Button
              aria-label="Divide"
              onClick={handleOperation(Operation.Divide)}
            >
              /
            </Button>
          </Tooltip>
          <Tooltip describeChild title="Multiply (or press *)">
            <Button
              aria-label="Multiply"
              onClick={handleOperation(Operation.Multiply)}
            >
              x
            </Button>
          </Tooltip>
          <Tooltip describeChild title="Subtract (or press -)">
            <Button
              aria-label="Subtract"
              onClick={handleOperation(Operation.Subtract)}
            >
              -
            </Button>
          </Tooltip>
          <Tooltip describeChild title="Add (or press +)">
            <Button aria-label="Add" onClick={handleOperation(Operation.Add)}>
              +
            </Button>
          </Tooltip>
          <Tooltip describeChild title="Equal (or press Return)">
            <Button aria-label="Equal" onClick={handleEqual}>
              =
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};
