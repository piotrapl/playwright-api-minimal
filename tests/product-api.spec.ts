import { test, expect } from '../fixtures/api-fixtures';
import { Product } from '../models/product';

/*
 - to są testy API dla endpointów związanych z produktami.
 - każdy test korzysta z klienta API, który jest dostępny dzięki rozszerzeniu testów w api-fixtures.ts.
 - testy sprawdzają: GET, POST, PUT, DELETE
*/
test('GET /products/1', async ({ api }) => {
  const product = await api.get<Product>('/products/1');

  expect(product.id).toBe(1);
  expect(product.title).toBeTruthy();
  expect(product.price).toBeGreaterThan(0);
});

test('POST /products/add', async ({ api }) => {
  const created = await api.post<Product, Partial<Product>>(
    '/products/add',
    { title: 'Minimal Test', price: 100 }
  );

  expect(created.title).toBe('Minimal Test');
});

test('PUT /products/1', async ({ api }) => {
  const updated = await api.put<Product, Partial<Product>>(
    '/products/1',
    { price: 123 }
  );

  expect(updated.price).toBe(123);
});

test('DELETE /products/1', async ({ api }) => {
  const deleted = await api.delete<Product>('/products/1');

  expect(deleted.id).toBe(1);
});

/*
To są podstawowe testy CRUD dla endpointów produktów:
.toBeTruthy() - sprawdza, czy wartość jest prawdziwa (nie jest null, undefined, 0, false, itp.)
.toBeGreaterThan(0) - sprawdza, czy wartość jest większa niż 0

async ({ api }) => { - to jest funkcja asynchroniczna, która otrzymuje obiekt api (klient API) 
    jako argument, dzięki temu możemy wykonywać zapytania do API w naszych testach.

Partial<Product> - to typ TypeScript, który oznacza, że wszystkie właściwości typu Product
         są opcjonalne
*/