import { test as base } from '@playwright/test';
import { ApiClient } from '../utils/api-client';

export const test = base.extend({
  api: async ({ request }, use) => {
    const client = new ApiClient(request, {
      baseUrl: 'https://dummyjson.com'
    });

    await use(client);
  }
});

export const expect = test.expect;