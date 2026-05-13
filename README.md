# Playwright API Minimal

## Abstract (in Polish)

#### Projekt testów API oparty o Playwright i TypeScript. 
#### Projekt pokazuje, jak budować lekką warstwę klienta API z użyciem typów generycznych w TypeScript.  
#### Testy obejmują podstawowe operacje CRUD dla publicznego API DummyJSON.   
---

## Tech Stack

- Playwright
- TypeScript
- Node.js
---

## Project Structure

```text
playwright-api-minimal/
│
├── fixtures/
│   └── api-fixtures.ts
│
├── models/
│   └── product.ts
│
├── tests/
│   └── product-api.spec.ts
│
├── utils/
│   └── api-client.ts
│
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

### Structure Overview

| Folder/File | Purpose |
|---|---|
| `tests/` | API test cases |
| `utils/api-client.ts` | Generic API client methods |
| `utils/api-helpers.ts` | Reusable generic helper functions |
| `types/api.types.ts` | TypeScript API response models |
| `playwright.config.ts` | Playwright configuration |

---

# 2. Generic Types Applied in the Project

This project demonstrates several practical TypeScript generic patterns.

---

## 2.1 Generic Class

### Generic Configuration Type

```ts
export class ApiClient<TConfig> {
```

### Explanation

`TConfig` allows the API client to work with different configuration objects.

Instead of hardcoding configuration types, the class becomes reusable and scalable.

---

## 2.2 Generic Response Type

### Generic GET Method

```ts
async get<R>(url: string): Promise<R> {
  const res = await this.request.get(this.config.baseUrl + url);
  return await res.json() as R;
}
```

### Explanation

`R` represents the expected response type.

Example usage:

```ts
const product = await api.get<Product>('/products/1');
```

The returned object is automatically typed as `Product`.

---

## 2.3 Multiple Generic Parameters

### POST Method

```ts
async post<R, B>(url: string, body: B): Promise<R> {
  const res = await this.request.post(
    this.config.baseUrl + url,
    { data: body }
  );

  return await res.json() as R;
}
```

### Explanation

Two generic parameters are used:

| Generic | Meaning |
|---|---|
| `R` | response type |
| `B` | request body type |

Example:

```ts
const created = await api.post<Product, Partial<Product>>(
  '/products/add',
  { title: 'Minimal Test', price: 100 }
);
```

---

## 2.4 Utility Generic Type — Partial<T>

### Example

```ts
Partial<Product>
```

### Explanation

`Partial<T>` converts all object properties into optional ones.

Original type:

```ts
type Product = {
  id: number;
  title: string;
  price: number;
};
```

After applying `Partial<Product>`:

```ts
{
  id?: number;
  title?: string;
  price?: number;
}
```

Useful for:
- PATCH requests
- partial updates
- lightweight payloads

---

## 2.5 Generic Playwright Fixture Extension

### Example

```ts
export const test = base.extend({
  api: async ({ request }, use) => {
```

### Explanation

Playwright fixtures internally rely heavily on generic typing.

This allows:
- typed dependency injection
- typed fixtures
- IntelliSense support
- safer test architecture

---

# 3. Test Cases Executed During Test Run

The project executes the following API scenarios:

| Test Case | HTTP Method | Endpoint | Purpose |
|---|---|---|---|
| Get single product | GET | `/products/1` | Validate product retrieval |
| Create product | POST | `/products/add` | Validate product creation |
| Update product | PUT | `/products/1` | Validate product update |
| Delete product | DELETE | `/products/1` | Validate product deletion |

---

## Example Assertions

### GET validation

```ts
expect(product.id).toBe(1);
expect(product.title).toBeTruthy();
expect(product.price).toBeGreaterThan(0);
```

### PUT validation

```ts
expect(updated.price).toBe(123);
```

---

# Test Execution Timeline

## 1. Playwright starts the test

```bash
npx playwright test
```

---

## 2. Fixture initialization

Playwright creates:

- APIRequestContext
- ApiClient instance

---

## 3. Test execution

Example flow:

```text
Test
 → api.get<Product>()
   → ApiClient.get()
     → HTTP request
       → DummyJSON API
         → JSON response
```

---

## 4. Assertions execution

Playwright validates:
- response data
- object fields
- expected values

---

## 5. Test completion

Playwright generates:
- terminal report
- HTML report (if enabled)

---

# Running Tests

## Install dependencies

```bash
npm install
```

---

## Run all tests

```bash
npx playwright test
```

---

## Run specific file

```bash
npx playwright test tests/product-api.spec.ts
```

---

# Possible Improvements

## API Architecture

- add dedicated services layer
- introduce request logging
- add response status validation
- add retry mechanism

---

## TypeScript Improvements

- stricter response typing
- discriminated unions
- generic API error models
- reusable DTO types

---

## Playwright Improvements

- environment configuration
- parallel execution
- CI integration
- HTML reporting
- Allure reporting

---

## Test Coverage Improvements

Additional test scenarios:

- negative API tests
- invalid payload validation
- schema validation
- authorization tests
- response time assertions
- contract testing

---

# Why This Project Is Valuable

This repository demonstrates:

- practical Playwright API testing
- TypeScript generics in real usage
- reusable API client architecture
- clean project structure
- beginner-friendly but scalable design

---

# API Under Test

The project uses:

- DummyJSON API  
  https://dummyjson.com
