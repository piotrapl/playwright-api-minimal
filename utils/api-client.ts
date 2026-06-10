import { APIRequestContext, APIResponse } from '@playwright/test';

/* 
- APIRequestContext to typ z Playwright, który reprezentuje kontekst zapytań API,
- private bo jest używane tylko wewnątrz klasy ApiClient
- dzięki genrykom, klasa ApiClient jest elastyczna i może być używana 
  z różnymi konfiguracjami i typami odpowiedzi, np. w testach można określić, że odpowiedzią będzie obiekt typu Product,
- zapis ApiClient<TConfig> oznacza, że klasa ApiClient jest generyczna 
  i przyjmuje typ TConfig, który reprezentuje konfigurację klienta API,
  to powoduje, że możemy tworzyć różne instancje ApiClient z różnymi konfiguracjami, 
*/
export class ApiClient<TConfig extends { baseUrl: string }> {
  constructor(
    private request: APIRequestContext,
    public config: TConfig
  ) {}

  private logRequest(method: string, url: string, body?: any): void {
    const message = body
      ? `[ApiClient] ${method} ${url}`
      : `[ApiClient] ${method} ${url}`;
    console.log(message, body ? { body } : '');
  }

  private logResponse(status: number, body: any): void {
    if (status < 200 || status >= 300) {
      console.log(`[ApiClient] response`, { status, body });
    }
  }

  private async parseResponse<R>(res: APIResponse): Promise<R> {
    const text = await res.text();
    this.logResponse(res.status(), text);
    return text ? JSON.parse(text) as R : (undefined as unknown as R);
  }

/* Metody do wykonywania zapytań HTTP: GET, POST, PUT, DELETE.
Każda metoda przyjmuje URL i opcjonalnie body (dla POST i PUT), 
na koniec 
zwraca odpowiedź jako obiekt typu R (który jest określany podczas wywoływania metody). 
*/
  async get<R>(url: string): Promise<R> {
    const fullUrl = this.config.baseUrl + url;
    this.logRequest('GET', fullUrl);
    const res = await this.request.get(fullUrl);
    return this.parseResponse<R>(res);
  }

  async post<R, B>(url: string, body: B): Promise<R> {
    const fullUrl = this.config.baseUrl + url;
    this.logRequest('POST', fullUrl, body);
    const res = await this.request.post(fullUrl, { data: body });
    return this.parseResponse<R>(res);
  }

  async put<R, B>(url: string, body: B): Promise<R> {
    const fullUrl = this.config.baseUrl + url;
    this.logRequest('PUT', fullUrl, body);
    const res = await this.request.put(fullUrl, { data: body });
    return this.parseResponse<R>(res);
  }

  async delete<R>(url: string): Promise<R> {
    const fullUrl = this.config.baseUrl + url;
    this.logRequest('DELETE', fullUrl);
    const res = await this.request.delete(fullUrl);
    return this.parseResponse<R>(res);
  }
}

/* dzięki typom generycznym, ApiClient jest elastyczny i może być używany 
z różnymi konfiguracjami i typami odpowiedzi,
na przykład w testach można określić, że odpowiedzią będzie obiekt typu Product,
a konfiguracja może zawierać różne ustawienia, takie jak baseUrl, nagłówki itp. */