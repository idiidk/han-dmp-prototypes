import type { Product } from "./models/product";
import type { RawSupermarket, Supermarket } from "./models/supermarket";

const ENDPOINT =
  "https://raw.githubusercontent.com/supermarkt/checkjebon/main/data/supermarkets.json";

export const fetchRawSupermarketData = async () => {
  const data = (await fetch(ENDPOINT).then((res) =>
    res.json()
  )) as RawSupermarket[];

  return data;
};

export const fetchSupermarketData = async () => {
  const rawData = await fetchRawSupermarketData();

  return rawData.map((raw) => {
    return {
      name: raw.n,
      products: raw.d.map((rawProduct) => {
        return {
          name: rawProduct.n,
          link: rawProduct.l,
          price: rawProduct.p,
          size: rawProduct.s,
        } as Product;
      }),
      url: raw.u,
      tag: raw.c,
      icon: raw.i,
    } as Supermarket;
  }) as Supermarket[];
};

const supermarkets = await fetchSupermarketData();
for (const supermarket of supermarkets) {
  console.log(
    `de supermarkt "${supermarket.name}" heeft ${supermarket.products.length} producten waarvan de eerste "${supermarket.products[0]?.name}" die een prijs heeft van: ${supermarket.products[0]?.price}`
  );
}
