import { range } from 'lodash';
import { useState } from 'react';

const digits: readonly string[] = range(0, 10).map(String);

const decimalSeparator = '.';

const inputFallback = '0';

export enum Operation {
  Add = '+',
  Divide = '/',
  Multiply = '*',
  Subtract = '-',
}

type OperationExecutor = (a: number, b: number) => number;

const operationExecutors: Readonly<Record<Operation, OperationExecutor>> = {
  [Operation.Add]: (a, b) => a + b,
  [Operation.Divide]: (a, b) => a / b,
  [Operation.Multiply]: (a, b) => a * b,
  [Operation.Subtract]: (a, b) => a - b,
};

const isInputEmpty = (value: string) => !value || value === inputFallback;

interface UseCalculatorResult {
  calculate(): void;
  clearInput(): void;
  readonly decimalSeparator: string;
  deleteLastCharacter(): void;
  readonly digits: readonly string[];
  readonly hasInput: boolean;
  readonly hasResult: boolean;
  readonly input: string;
  readonly inputFallback: string;
  insertDecimalSeparator(): void;
  insertDigit(value: string): void;
  negate(): void;
  readonly operation: Operation | undefined;
  perCent(): void;
  reset(): void;
  readonly result: number | undefined;
  setOperation(value: Operation): void;
}

export const useCalculator = (): UseCalculatorResult => {
  const [input, setInput] = useState('');

  const [operand, setOperand] = useState('');
  const [op, setOp] = useState<Operation | undefined>();

  const [result, setResult] = useState<number | undefined>();

  const insertDigit = (value: string) => {
    if (!digits.includes(value)) {
      return;
    }

    setInput(isInputEmpty(input) ? value : input + value);
  };

  const insertDecimalSeparator = () => {
    if (input.includes(decimalSeparator)) {
      return;
    }

    setInput((input || inputFallback) + decimalSeparator);
  };

  const deleteLastCharacter = () =>
    setInput((value) => (value ? value.substring(0, value.length - 1) || inputFallback : value));

  const setOperation = (value: Operation) => {
    if (!operand) {
      setOperand(input || inputFallback);
      setInput(inputFallback);
    }

    setOp(value);
  };

  const negate = () => {
    if (isInputEmpty(input)) {
      return;
    }

    setInput(input.startsWith('-') ? input.substring(1) : `-${input}`);
  };

  const perCent = () => setInput((Number(input) / 100).toString());

  const clearInput = () => setInput('');

  const reset = () => {
    setInput('');

    setOperand('');
    setOp(undefined);
    setResult(undefined);
  };

  const calculate = () => {
    if (!operand || !op) {
      return;
    }

    const leftOperand = Number(operand);
    const rightOperand = Number(input);

    const executor = operationExecutors[op];

    const result = executor(leftOperand, rightOperand);

    setResult(result);

    setInput(result.toString());
  };

  return {
    calculate,
    clearInput,
    decimalSeparator,
    deleteLastCharacter,
    digits,
    hasInput: !isInputEmpty(input),
    hasResult: !!result,
    input,
    inputFallback,
    insertDecimalSeparator,
    insertDigit,
    negate,
    operation: op,
    perCent,
    reset,
    result,
    setOperation,
  };
};
