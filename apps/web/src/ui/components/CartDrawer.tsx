"use client";

import { useCartStore } from "@/store/cart.store";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useCartStore(
    useShallow(state => ({
      isCartOpen: state.isCartOpen,
      closeCart: state.closeCart,
    }))
  );

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCartOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    const previouslyFocused =
      (document.activeElement as HTMLElement | null) ?? null;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isCartOpen, closeCart]);

  return (
    <div
      className={`cart-drawer${isCartOpen ? " cart-drawer--open" : ""}`}
      aria-hidden={!isCartOpen}
    >
      <div
        className="cart-drawer__backdrop"
        onClick={closeCart}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="cart-drawer__panel"
        id="cart-drawer"
        tabIndex={-1}
        role={isCartOpen ? "dialog" : undefined}
        aria-modal={isCartOpen ? "true" : undefined}
        aria-label={isCartOpen ? "Shopping cart" : undefined}
      >
        <button
          type="button"
          className="cart-drawer__close"
          onClick={closeCart}
          aria-label="Close cart"
        >
          <X />
        </button>

        <div className="cart-drawer__body">
          <p className="cart-drawer__empty">Your cart is empty</p>
        </div>
        <footer className="cart-drawer__footer">
          <Link href="/cart" className="cart-drawer__view-cart" onClick={closeCart}>
            View Cart
          </Link>
        </footer>
      </div>
    </div>
  );
}
