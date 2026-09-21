/**
 * Cookie consent mimarisi için stub.
 * Analytics / marketing scriptleri kullanıcı onayı olmadan eklenmemelidir.
 */

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type ConsentState = Record<ConsentCategory, boolean>;

export const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function hasConsent(state: ConsentState, category: ConsentCategory) {
  return state[category] === true;
}
