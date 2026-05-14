// to jest model danych dla produktu, który jest używany w testach API.
// bez niego nie mielibyśmy jasno zdefiniowanej struktury danych, 
// co utrudniałoby pisanie testów

export type Product = {
  id: number;
  title: string;
  price: number;
};