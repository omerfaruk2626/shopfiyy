import { PRODUCT_CARD_FRAGMENT } from "../fragments";

export const getCollectionByHandleQuery = `#graphql
  query CollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      image {
        id
        url
        altText
        width
        height
      }
      seo {
        title
        description
      }
      products(first: $first) {
        nodes {
          ...ProductCard
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export const getCollectionsQuery = `#graphql
  query Collections($first: Int!) {
    collections(first: $first) {
      nodes {
        handle
        title
        updatedAt
      }
    }
  }
`;
