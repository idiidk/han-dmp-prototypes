import Fuse from "fuse.js";

import { fetchSupermarketData } from "./api/api";
import type { Product } from "./api/models/product";
import type { Supermarket } from "./api/models/supermarket";

const searchTerm = process.argv[2];
if (!searchTerm) {
  throw new Error("please specify a search term");
}

const cache = await Bun.file("./supermarkets.json");
const content = await cache.text();

let supermarkets: Supermarket[] = [];

if (content) {
  supermarkets = JSON.parse(content);
} else {
  supermarkets = await fetchSupermarketData();
  await Bun.write(cache, JSON.stringify(supermarkets));
}

const allProducts = supermarkets.reduce(
  (prev, e) => [...prev, ...e.products],
  [] as Array<Product>
);

console.log(
  `searching for ${searchTerm} through ${supermarkets.length} supermarkets and ${allProducts.length} products`
);

const moddedProducts = allProducts.map((e) => ({
  uniq: `${e.name} ${e.size} ${e.price}`,
  name: e.name,
  link: e.link,
  price: e.price,
  size: e.size,
}));

const fuse = new Fuse(moddedProducts, {
  keys: ["uniq"],
});

const results = fuse.search(searchTerm);

console.log("found: ");
for (let i = 0; i < 3; i++) {
  const result = results[i];
  if (!result) continue;

  console.log(result.item.name, result.item.size);
}
