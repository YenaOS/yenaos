import '@testing-library/jest-dom/vitest';
import { beforeAll } from 'vitest';

import { setupInternationalization } from './src/i18n';

beforeAll(() => {
  setupInternationalization();
});
