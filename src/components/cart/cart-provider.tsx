"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import {
  addToCartAction,
  getCartAction,
  removeCartLineAction,
  updateCartLineAction,
} from "@/lib/shopify/actions";
import type { Cart } from "@/types/shopify";

type OptimisticAction =
  | { type: "update"; lineId: string; quantity: number }
  | { type: "remove"; lineId: string };

type CartContextValue = {
  cart: Cart | null;
  isOpen: boolean;
  isPending: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  refreshCart: () => Promise<void>;
  addItem: (
    merchandiseId: string,
    quantity?: number,
  ) => Promise<{ ok: boolean; error?: string }>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

function applyOptimistic(current: Cart | null, action: OptimisticAction): Cart | null {
  if (!current) return current;

  if (action.type === "remove") {
    const lines = current.lines.filter((line) => line.id !== action.lineId);
    return {
      ...current,
      lines,
      totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    };
  }

  const lines = current.lines
    .map((line) =>
      line.id === action.lineId ? { ...line, quantity: action.quantity } : line,
    )
    .filter((line) => line.quantity > 0);

  return {
    ...current,
    lines,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
  };
}

export function CartProvider({
  children,
  initialCart,
}: {
  children: ReactNode;
  initialCart: Cart | null;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [optimisticCart, addOptimistic] = useOptimistic(cart, applyOptimistic);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const refreshCart = useCallback(async () => {
    const next = await getCartAction();
    setCart(next);
  }, []);

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      const result = await addToCartAction({ merchandiseId, quantity });
      if ("error" in result) {
        return { ok: false, error: result.error };
      }
      setCart(result.cart);
      setIsOpen(true);
      return { ok: true };
    },
    [],
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      startTransition(async () => {
        addOptimistic({ type: "update", lineId, quantity });
        const result = await updateCartLineAction({ lineId, quantity });
        if ("cart" in result) {
          setCart(result.cart);
        } else {
          await refreshCart();
        }
      });
    },
    [addOptimistic, refreshCart],
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      startTransition(async () => {
        addOptimistic({ type: "remove", lineId });
        const result = await removeCartLineAction(lineId);
        if ("cart" in result) {
          setCart(result.cart);
        } else {
          await refreshCart();
        }
      });
    },
    [addOptimistic, refreshCart],
  );

  const value = useMemo(
    () => ({
      cart: optimisticCart,
      isOpen,
      isPending,
      openCart,
      closeCart,
      toggleCart,
      refreshCart,
      addItem,
      updateItem,
      removeItem,
    }),
    [
      optimisticCart,
      isOpen,
      isPending,
      openCart,
      closeCart,
      toggleCart,
      refreshCart,
      addItem,
      updateItem,
      removeItem,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
