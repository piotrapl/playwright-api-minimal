import { test as base } from '@playwright/test';
import { ApiClient } from '../utils/api-client';

/*
 test = base.extend({ 
 - to rozszerzenie funkcjonalności testów Playwright o dodatkowe możliwości, 
   tu o klienta API.
 api: async ({ request }, use) => { 
 - funkcja, która tworzy instancję ApiClient i przekazuje do niej Playwright'owy obiekt request 
 - ApiClient - klasa prawdopodobnie zawierająca metody do wykonywania zapytań HTTP..

 await use(client) - użycie tej instancji klienta w testach
 test - będzie oznaczał rozszerzoną klasę test, której obiekt będzie miał dostęp do klienta API
*/ 
export const test = base.extend({
  api: async ({ request }, use) => {
    const client = new ApiClient(request, {
      baseUrl: 'https://dummyjson.com'
    });

    await use(client);
  }
});

export const expect = test.expect;