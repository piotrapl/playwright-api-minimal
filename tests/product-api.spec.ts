import { test, expect } from '../fixtures/api-fixtures';
import { Product } from '../models/product';

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