import { test, expect } from '../fixtures/test-fixtures';

type Product = {
  id: number;
  title: string;
  price: number;
};

test('Pobieranie produktu z API i walidacja danych', async ({ api }) => {
  const product = await api.get<Product>('/products/1');

  expect(product.id).toBe(1);
  expect(product.title).toBeTruthy();
});

type User = {
  name: string;
  age: number;
};

test('Ładowanie danych testowych z JSON', async ({ data }) => {
  const user = data<User>('tests/data/user.json');

  expect(user.name).toBeDefined();
  expect(user.age).toBeGreaterThan(0);
});