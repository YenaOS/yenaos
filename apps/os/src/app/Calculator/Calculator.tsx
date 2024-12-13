import { Box, Button, Grid2, Input, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { range } from 'lodash';

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

  const handleNegate = () =>
    setDisplayedValue(
      displayedValue.startsWith('-')
        ? displayedValue.substring(1)
        : `-${displayedValue}`,
    );

  const handlePercent = () => undefined;

  const handleDigit = (value: number) => () =>
    setDisplayedValue(displayedValue + value);

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
        value={displayedValue || 0}
      />
      <Stack direction="row">
        <Box>
          <Stack direction="row">
            <Tooltip describeChild title="Clear (Esc); Clear All (Opt-Esc)">
              <Button aria-label="Clear" fullWidth onClick={handleClear}>
                AC
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
            {range(9, -1).map((digit) =>
              digit ? (
                <Grid2 key={digit} size={1}>
                  <Button fullWidth onClick={handleDigit(digit)}>
                    {digit}
                  </Button>
                </Grid2>
              ) : (
                [
                  <Grid2 key="decimal-point" size={1}>
                    <Button fullWidth>,</Button>
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
