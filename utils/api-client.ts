import { APIRequestContext } from '@playwright/test';

export class ApiClient<TConfig> {
  constructor(
    private request: APIRequestContext,
    public config: TConfig
  ) {}

  async get<R>(url: string): Promise<R> {
    const res = await this.request.get(url);
    return await res.json() as R;
  }
}