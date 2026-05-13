# Playwright API Minimal – Generics Demo

## Abstract (in Polish)

Minimalistyczny projekt pokazujący testowanie API w Playwright + TypeScript z naciskiem na użycie typów generycznych (*TypeScript Generics*).  
Repozytorium prezentuje prostą, ale skalowalną architekturę klienta API z typowanymi odpowiedziami oraz reusable helperami.  
Projekt może służyć jako:
- demo do portfolio QA Automation,
- materiał edukacyjny do nauki TypeScript,
- baza pod większy framework API testingowy.

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
├── tests/
│   └── products.spec.ts
│
├── utils/
│   ├── api-client.ts
│   └── api-helpers.ts
│
├── types/
│   └── api.types.ts
│
├── playwright.config.ts
├── package.json
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

# Generic Types Applied in the Project

The project demonstrates several important TypeScript generic patterns commonly used in modern API automation frameworks.

---

## 1. Generic API Response Type

### Example

```ts
async get<T>(endpoint: string): Promise<T>
```

### Purpose

Allows the API client to return different response types depending on the endpoint.

### Example Usage

```ts
const response = await apiClient.get<ProductResponse>('/products');
```

### Benefits

- compile-time safety
- autocomplete support
- reusable API client
- reduced type duplication

---

## 2. Generic Helper Functions

### Example

```ts
export function getFirstItem<T>(items: T[]): T {
  return items[0];
}
```

### Purpose

Makes helper functions reusable for many data types.

### Example Usage

```ts
const firstProduct = getFirstItem(products);
```

### Benefits

- reusable utilities
- strong typing
- cleaner code

---

## 3. Generic Array Operations

### Example

```ts
export function mapIds<T extends { id: number }>(items: T[]): number[]
```

### Purpose

Uses generic constraints (`extends`) to ensure objects contain required properties.

### Benefits

- safe reusable transformations
- constraint-based typing
- scalable helper design

---

# Test Cases Run in the Project

## 1. Get Products List

### Flow

1. Send GET request to `/products`
2. Validate response status
3. Validate response body
4. Validate typed response structure

### Example Assertions

```ts
expect(response.products.length).toBeGreaterThan(0);
```

---

## 2. Extract First Product

### Flow

1. Fetch products
2. Use generic helper
3. Validate extracted object

### Example

```ts
const firstProduct = getFirstItem(response.products);
```

---

## 3. Map Product IDs

### Flow

1. Fetch products list
2. Transform array using generic helper
3. Verify mapped IDs

### Example

```ts
const ids = mapIds(response.products);
```

---

# Why This Project Is Useful

This repository demonstrates several important concepts valued in QA Automation projects:

- reusable API architecture
- TypeScript generics
- typed API responses
- scalable helper utilities
- clean Playwright API testing structure

It is intentionally minimal to make the generic concepts easier to understand.

---

# Possible Improvements

## Architecture

- add service layer
- add request builders
- add environment configuration
- add authentication handling

## Testing

- negative test cases
- schema validation
- contract testing
- data-driven testing

## Reporting & CI

- GitHub Actions CI
- Allure reporting
- HTML reporting
- test artifacts upload

## TypeScript

- discriminated unions
- generic repositories
- advanced mapped types
- utility types

---

# Run Tests

## Install

```bash
npm install
```

## Run tests

```bash
npx playwright test
```

---

# Example API Used

- DummyJSON:
  https://dummyjson.com
