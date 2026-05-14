import { APIRequestContext } from '@playwright/test';

/* 
- APIRequestContext to typ z Playwright, który reprezentuje kontekst zapytań API,
- private bo jest używane tylko wewnątrz klasy ApiClient
- dzięki genrykom, klasa ApiClient jest elastyczna i może być używana 
  z różnymi konfiguracjami i typami odpowiedzi, np. w testach można określić, że odpowiedzią będzie obiekt typu Product,
- zapis ApiClient<TConfig> oznacza, że klasa ApiClient jest generyczna 
  i przyjmuje typ TConfig, który reprezentuje konfigurację klienta API,
  to powoduje, że możemy tworzyć różne instancje ApiClient z różnymi konfiguracjami, 
*/
export class ApiClient<TConfig> {
  constructor(
    private request: APIRequestContext,
    public config: TConfig
  ) {}

/* Metody do wykonywania zapytań HTTP: GET, POST, PUT, DELETE.
Każda metoda przyjmuje URL i opcjonalnie body (dla POST i PUT), 
na koniec 
zwraca odpowiedź jako obiekt typu R (który jest określany podczas wywoływania metody). 
*/
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

/* dzięki typom generycznym, ApiClient jest elastyczny i może być używany 
z różnymi konfiguracjami i typami odpowiedzi,
na przykład w testach można określić, że odpowiedzią będzie obiekt typu Product,
a konfiguracja może zawierać różne ustawienia, takie jak baseUrl, nagłówki itp. */