import { APIRequestContext } from '@playwright/test';

export class ApiClient<TConfig> {
  constructor(
    private request: APIRequestContext,
    public config: TConfig
  ) {}

  async get<R>(url: string): Promise<R> {
    const res = await this.request.get(this.config.baseUrl + url);
    return await res.json() as R;
  }

  async post<R, B>(url: string, body: B): Promise<R> {
    const res = await this.request.post(this.config.baseUrl + url, { data: body });
    return await res.json() as R;
  }

  async put<R, B>(url: string, body: B): Promise<R> {
    const res = await this.request.put(this.config.baseUrl + url, { data: body });
    return await res.json() as R;
  }

  async delete<R>(url: string): Promise<R> {
    const res = await this.request.delete(this.config.baseUrl + url);
    return await res.json() as R;
  }
}