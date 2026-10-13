"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/types";

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  couponCode: string;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  total: number;
  cartCount: number;
  wishlistCount: number;
  notification: string | null;
  dismissNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 2999;
const STANDARD_SHIPPING_FEE = 350;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("chic_couture_cart");
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem("chic_couture_wishlist");
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedCoupon = localStorage.getItem("chic_couture_coupon");
      if (storedCoupon === "CHIC10") {
        setCouponCode("CHIC10");
        setCouponDiscount(0.1);
      }
    } catch {
      // ignore SSR or storage exceptions
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("chic_couture_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("chic_couture_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3800);
  };

  const dismissNotification = () => setNotification(null);

  const addToCart = (product: Product, size?: string, color?: string, quantity: number = 1) => {
    const selectedSize = size || product.sizes[0] || "Standard";
    const selectedColor = color || (product.colors[0]?.name ?? "Standard");
    const itemKey = `${product.id}-${selectedSize}-${selectedColor}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemKey,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          size: selectedSize,
          color: selectedColor,
          quantity,
        };
        return [newItem, ...prev];
      }
    });

    showNotification(`Added "${product.name}" to your shopping bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showNotification("Item removed from your wishlist.");
        return prev.filter((id) => id !== productId);
      } else {
        showNotification("Saved to your luxury wishlist.");
        return [...prev, productId];
      }
    });
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "CHIC10") {
      setCouponCode("CHIC10");
      setCouponDiscount(0.1);
      try {
        localStorage.setItem("chic_couture_coupon", "CHIC10");
      } catch {}
      return { success: true, message: "10% Chic Circle privilege applied!" };
    }
    return { success: false, message: "Invalid privilege code. Try CHIC10." };
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponDiscount(0);
    try {
      localStorage.removeItem("chic_couture_coupon");
    } catch {}
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * couponDiscount);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isWishlisted,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        couponCode,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        total,
        cartCount,
        wishlistCount,
        notification,
        dismissNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
