import { test as base } from '@playwright/test';
import { ApiClient } from '../utils/api-client';
import { loadData } from '../utils/data-loader';

type ApiConfig = {
  baseUrl: string;
  token: string;
};

export const test = base.extend<{
  api: ApiClient<ApiConfig>;
  data: <T>(path: string) => T;
}>({
  api: async ({ request }, use) => {
    const client = new ApiClient<ApiConfig>(request, {
      baseUrl: 'https://dummyjson.com',
      token: 'XYZ'
    });

    await use(client);
  },

  data: async ({}, use) => {
    await use(<T>(path: string) => loadData<T>(path));
  }
});

export const expect = test.expect;