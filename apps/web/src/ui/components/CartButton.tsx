"use client";

import { useCartStore } from "@/store/cart.store";
import { ShoppingCart } from "lucide-react";
import { useShallow } from "zustand/shallow";

export default function CartButton() {
  const { isCartOpen, count, toggleCart } = useCartStore(
    useShallow(state => ({
      isCartOpen: state.isCartOpen,
      count: state.count,
      toggleCart: state.toggleCart,
    }))
  );

  return (
    <button
      className="cart-btn"
      onClick={toggleCart}
      aria-expanded={isCartOpen}
      aria-controls="cart-drawer"
      aria-label={`${isCartOpen ? "Close" : "Open"} cart, ${count} item${count === 1 ? "" : "s"}`}
    >
      <ShoppingCart className="cart-btn__icon" size={24} />
      {count > 0 && <span className="cart-btn__count">{count}</span>}
    </button>
  );
}