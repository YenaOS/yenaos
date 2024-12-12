import { Box, Button, Input, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';

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

  const handleDigit = (value: string) => () =>
    setDisplayedValue(displayedValue + value);

  const handleOperation = (value: Operation) => () => setOperation(value);

  const handleEqual = () => undefined;

  return (
    <Box>
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
          <Box>
            <Tooltip describeChild title="Clear (Esc); Clear All (Opt-Esc)">
              <Button aria-label="Clear" onClick={handleClear}>
                AC
              </Button>
            </Tooltip>
            <Tooltip
              describeChild
              title="Negate the displayed value (or press Option-Minus [-])"
            >
              <Button aria-label="Negate" onClick={handleNegate}>
                +/-
              </Button>
            </Tooltip>
            <Tooltip describeChild title="Per cent (or press %)">
              <Button aria-label="Per cent" onClick={handlePercent}>
                %
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Button onClick={handleDigit('7')}>7</Button>
            <Button onClick={handleDigit('8')}>8</Button>
            <Button onClick={handleDigit('9')}>9</Button>
            <Button onClick={handleDigit('4')}>4</Button>
            <Button onClick={handleDigit('5')}>5</Button>
            <Button onClick={handleDigit('6')}>6</Button>
            <Button onClick={handleDigit('1')}>1</Button>
            <Button onClick={handleDigit('2')}>2</Button>
            <Button onClick={handleDigit('3')}>3</Button>
            <Button onClick={handleDigit('0')}>0</Button>
            <Button>,</Button>
          </Box>
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
