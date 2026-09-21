/**
 * Analytics abstraction — vendor bağımsız event katmanı.
 * Provider (GA4 / Meta / vs.) cookie consent sonrası bağlanır.
 */

export type AnalyticsEventName =
  | "view_item"
  | "add_to_cart"
  | "view_cart"
  | "begin_checkout"
  | "purchase"
  | "search";

export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

type AnalyticsProvider = {
  track: (event: AnalyticsEventName, payload?: AnalyticsPayload) => void;
};

const noopProvider: AnalyticsProvider = {
  track: () => {
    // Provider bağlanana kadar no-op
  },
};

let provider: AnalyticsProvider = noopProvider;

export function setAnalyticsProvider(next: AnalyticsProvider) {
  provider = next;
}

export function trackEvent(event: AnalyticsEventName, payload?: AnalyticsPayload) {
  try {
    provider.track(event, payload);
  } catch {
    // Analytics asla UI'ı bozmamalı
  }
}
