import type { Product, RawProduct } from "./product";

export interface RawSupermarket {
  n: string;
  d: RawProduct[];
  u: string;
  c: string;
  i: string;
}

export interface Supermarket {
  name: string;
  products: Product[];
  url: string;
  tag: string;
  icon: string;
}
