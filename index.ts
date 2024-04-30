import algoliasearch from "algoliasearch";
import { fetchSupermarketData } from "./api/api";

const client = algoliasearch(process.env.APPLICATION_ID, process.env.API_KEY);

const supermarkets = await fetchSupermarketData();
console.log(`Fetched ${supermarkets.length} supermarkets`);

const index = client.initIndex("supermarkets");

for (const supermarket of supermarkets) {
  await index.saveObjects(supermarket.products).wait();
  console.log(`Saved index for supermarket ${supermarket.name}`);
}
