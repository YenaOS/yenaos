import { Box, Button, Grid2, Input, Stack, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Operation, useCalculator } from './useCalculator';

export const Calculator = () => {
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
    setOperation,
  } = useCalculator();

  const handleClear = () => (input ? clearInput() : reset());

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
        value={
          input === NaN.toString() ? t('notANumber') : input || inputFallback
        }
      />
      <Stack direction="row">
        <Box>
          <Stack direction="row">
            <Tooltip describeChild title={t('clearTooltip')}>
              <Button aria-label={t('clear')} fullWidth onClick={handleClear}>
                {input ? 'C' : 'AC'}
              </Button>
            </Tooltip>
            <Tooltip describeChild title={t('negateTooltip')}>
              <Button aria-label={t('negate')} fullWidth onClick={negate}>
                +/-
              </Button>
            </Tooltip>
            <Tooltip describeChild title={t('perCentTooltip')}>
              <Button aria-label={t('perCent')} fullWidth onClick={perCent}>
                %
              </Button>
            </Tooltip>
          </Stack>
          <Grid2 columns={3} container direction="row-reverse">
            {digits.toReversed().map((digit) =>
              digit ? (
                <Grid2 key={digit} size={1}>
                  <Button fullWidth onClick={() => insertDigit(digit)}>
                    {digit}
                  </Button>
                </Grid2>
              ) : (
                [
                  <Grid2 key="decimal-point" size={1}>
                    <Button
                      aria-label={t('decimalPoint')}
                      fullWidth
                      onClick={insertDecimalSeparator}
                    >
                      {decimalSeparator}
                    </Button>
                  </Grid2>,
                  <Grid2 key={digit} size={2}>
                    <Button fullWidth onClick={() => insertDigit(digit)}>
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
              onClick={() => setOperation(Operation.Divide)}
            >
              /
            </Button>
          </Tooltip>
          <Tooltip describeChild title={t('multiplyTooltip')}>
            <Button
              aria-label={t('multiply')}
              onClick={() => setOperation(Operation.Multiply)}
            >
              x
            </Button>
          </Tooltip>
          <Tooltip describeChild title={t('subtractTooltip')}>
            <Button
              aria-label={t('subtract')}
              onClick={() => setOperation(Operation.Subtract)}
            >
              -
            </Button>
          </Tooltip>
          <Tooltip describeChild title={t('addTooltip')}>
            <Button
              aria-label={t('add')}
              onClick={() => setOperation(Operation.Add)}
            >
              +
            </Button>
          </Tooltip>
          <Tooltip describeChild title={t('equalTooltip')}>
            <Button aria-label={t('equal')} onClick={calculate}>
              =
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};
