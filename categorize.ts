import type { Product } from "./models/product";
import type { Supermarket } from "./models/supermarket";

const findCommonSubstring = (str1: string, str2: string): string => {
  let commonSubstring = "";

  // loop through characters of the first string
  for (let i = 0; i < str1.length; i++) {
    // loop through characters of the second string
    for (let j = 0; j < str2.length; j++) {
      let k = 0;
      let substring = "";

      // check for common substring starting from the current characters
      while (
        i + k < str1.length &&
        j + k < str2.length &&
        str1[i + k] === str2[j + k]
      ) {
        substring += str1[i + k];
        k++;
      }

      // update commonSubstring if a longer common substring is found
      if (substring.length > commonSubstring.length) {
        commonSubstring = substring;
      }
    }
  }

  return commonSubstring.trim();
};

const hasMatchingWord = (str1: string, str2: string): boolean => {
  // split the strings into words
  const words1 = str1.split(" ").map((e) => e.toLowerCase().trim());
  const words2 = str2.split(" ").map((e) => e.toLowerCase().trim());

  // convert words to sets to remove duplicates
  const set1 = new Set(words1);
  const set2 = new Set(words2);

  // check if there's any intersection between the sets
  for (const word of set1) {
    if (set2.has(word)) {
      return true;
    }
  }

  return false;
};

const removeNumbers = (str: string): string => {
  let result = "";
  const length = str.length;

  for (let i = 0; i < length; i++) {
    const char = str[i];
    if (char < "0" || char > "9") {
      result += char;
    }
  }

  return result;
};

export const categorizeProducts = (
  supermarket: Supermarket,
  categories: { [key: string]: Product[] } = {}
) => {
  for (const product of supermarket.products) {
    let productName = product.name.toLowerCase();

    // remove supermarket title from the product name
    productName = productName.replaceAll(supermarket.name, "");

    // remove different prefixes and suffixes for size from the product name
    productName = productName.replaceAll("dl ", "");
    productName = productName.replaceAll("ml ", "");
    productName = productName.replaceAll("stuk ", "");
    productName = productName.replaceAll("liter ", "");

    // remove random numbers from the title
    productName = removeNumbers(productName);

    // trim the name
    productName = productName.trim();

    // check if the categories array already contains a relevant category
    const potentialCategoryName = Object.keys(categories).find((e) => {
      return hasMatchingWord(e, productName);
    });

    if (!potentialCategoryName) {
      // if no match found just add the whole things first word
      categories[productName.split(" ")[0].trim()] = [product];
      continue;
    }

    // check which word is the common substring
    const common = findCommonSubstring(productName, potentialCategoryName);

    // if the common string is not the actual category name, and might be shorter
    // use this as the new category name
    if (
      common !== potentialCategoryName &&
      common.length < potentialCategoryName.length
    ) {
      categories[common.split(" ")[0].trim()] =
        categories[potentialCategoryName];
      categories[common.split(" ")[0].trim()].push(product);
      delete categories[potentialCategoryName];

      continue;
    }

    // if it is the same just add the product
    categories[common.split(" ")[0].trim()].push(product);
  }

  return categories;
};