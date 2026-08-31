import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FREE_SHIPPING_FROM,
  PRODUCTS,
  SHIPPING_COST,
  weightLabel,
  weightPrice,
  type Category,
  type Product,
  type Weight,
} from "./data/products";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shop, { type SortId } from "./components/Shop";
import RoastSection from "./components/RoastSection";
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Toast from "./components/Toast";

export interface CartItem {
  key: string;
  product: Product;
  weight: Weight;
  qty: number;
}

const MAX_QTY = 10;
const CART_KEY = "krater-cart-v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return parsed.filter((i) => PRODUCTS.some((p) => p.id === i.product.id));
  } catch {
    return [];
  }
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortId>("featured");

  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; id: number } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* noop */
    }
  }, [cart]);

  // body scroll lock
  useEffect(() => {
    const locked = cartOpen || modalProduct !== null || checkoutOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, modalProduct, checkoutOpen]);

  // Esc closes the topmost layer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (checkoutOpen) setCheckoutOpen(false);
      else if (modalProduct) setModalProduct(null);
      else if (cartOpen) setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [checkoutOpen, modalProduct, cartOpen]);

  // toast auto-hide
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = useCallback((product: Product, weight: Weight = 250, qty = 1) => {
    setCart((prev) => {
      const key = `${product.id}-${weight}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i,
        );
      }
      return [...prev, { key, product, weight, qty }];
    });
    setToast({ msg: `${product.name} · ${weightLabel(weight)} — в корзине`, id: Date.now() });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: Math.min(MAX_QTY, Math.max(1, qty)) } : i)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + weightPrice(i.product, i.weight) * i.qty, 0),
    [cart],
  );
  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const completeOrder = useCallback(() => {
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-espresso font-body text-cream">
      <Header count={count} onOpenCart={() => setCartOpen(true)} />

      <main>
        <Hero />
        <Shop
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          onOpen={setModalProduct}
          onAdd={(p) => addToCart(p, 250, 1)}
        />
        <RoastSection />
      </main>

      <Footer />

      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onAdd={(p, w, q) => addToCart(p, w, q)}
        />
      )}

      <CartDrawer
        open={cartOpen}
        items={cart}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onClose={() => setCartOpen(false)}
        onQty={setQty}
        onRemove={removeItem}
        onCheckout={() => setCheckoutOpen(true)}
      />

      {checkoutOpen && (
        <CheckoutModal
          items={cart}
          subtotal={subtotal}
          onClose={() => setCheckoutOpen(false)}
          onComplete={completeOrder}
        />
      )}

      {toast && (
        <div key={toast.id}>
          <Toast msg={toast.msg} onOpenCart={() => { setToast(null); setCartOpen(true); }} />
        </div>
      )}
    </div>
  );
}
