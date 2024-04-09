export interface SearchResponse {
  shoppingscraper: Shoppingscraper
}

export interface Shoppingscraper {
  query: Query
  endpoint: Endpoint
  geo: Geo
  stats: Stats
  results: Result[]
}

export interface Query {
  link: string
  keyword: string
}

export interface Endpoint {
  type: string
  app: string
}

export interface Geo {
  country: string
  language: string
}

export interface Stats {
  results: number
  pagespeed: number
}

export interface Result {
  classification: string
  title: string
  brand: string
  category: Category[]
  ean: string
  sku: string
  currency: string
  sponsored: boolean
  ranking: Ranking
  stats: Stats2
  offers: Offer[]
  content: Content
  reviews: Reviews3
}

export interface Category {
  name: string
  url: string
}

export interface Ranking {
  productList: number
  organic: number
}

export interface Stats2 {}

export interface Offer {
  price: number
  shipment: string
  shippingCosts: number
  seller: string
  availability: string
  state: string
  reviews: Reviews
}

export interface Reviews {}

export interface Content {
  specs: any[]
  description: string
  images: string[]
  reviews: Reviews2
}

export interface Reviews2 {}

export interface Reviews3 {}
