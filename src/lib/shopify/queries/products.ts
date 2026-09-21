import { PRODUCT_CARD_FRAGMENT, PRODUCT_FRAGMENT } from "../fragments";

export const getProductByHandleQuery = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const getProductsQuery = `#graphql
  query Products($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const searchProductsQuery = `#graphql
  query SearchProducts($query: String!, $first: Int!) {
    search(query: $query, first: $first, types: PRODUCT) {
      nodes {
        ... on Product {
          ...ProductCard
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const getProductHandlesQuery = `#graphql
  query ProductHandles($first: Int!) {
    products(first: $first) {
      nodes {
        handle
        updatedAt
      }
    }
  }
`;
