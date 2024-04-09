import type { SearchResponse } from "./models/search-response";

const QUERY = "eieren";
const ENDPOINT = "https://api.shoppingscraper.com";
const COUNTRY_CODE = "nl";
const API_KEY = process.env.API_KEY;

const searchProducts = async (keyword: string) => {
  const res = await fetch(
    `${ENDPOINT}/search/ah/${COUNTRY_CODE}?api_key=${API_KEY}&keyword=${keyword}&pages=1`
  );

  return (await res.json()) as SearchResponse;
};

const products = await searchProducts(QUERY);
console.log("rauwe data:");
console.log(products);
console.log();

const results = products.shoppingscraper.results;

console.log(`gezocht naar ${QUERY} - ${results.length} resultaten`);
