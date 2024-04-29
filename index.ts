import { fetchSupermarketData } from "./api/api";
import { categorizeProducts } from "./categorize";

const supermarkets = await fetchSupermarketData();

let currentCategorized = {};
for (const supermarket of [supermarkets[0]]) {
  console.log(
    `[${supermarket.name}] found ${supermarket.products.length} products`
  );

  currentCategorized = categorizeProducts(supermarket, currentCategorized);
  console.log(
    `[${supermarket.name}] categorized to ${
      Object.keys(currentCategorized).length
    } categories!`
  );
}

console.log();

const file = await Bun.file("./categorized.json");
await Bun.write(file, JSON.stringify(currentCategorized));

console.log(`wrote ${Object.keys(currentCategorized).length} categories`);
