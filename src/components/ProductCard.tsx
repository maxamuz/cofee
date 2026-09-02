import { useEffect, useRef, useState } from "react";
import {
  CATEGORIES,
  fmt,
  roastName,
  type Product,
} from "../data/products";
import { IconBasket, IconCheck } from "./icons";

interface Props {
  product: Product;
  onOpen: (p: Product) => void;
  onAdd: (p: Product) => void;
}

export default function ProductCard({ product: p, onOpen, onAdd }: Props) {
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(p);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 950);
  };

  const catLabel = CATEGORIES.find((c) => c.id === p.category)?.label ?? "";

  return (
    <article
      onClick={() => onOpen(p)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-bark/25 bg-cream text-ink shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-caramel/60 hover:shadow-xl hover:shadow-bark/15"
    >
      <div className="relative overflow-hidden rounded-t-[6.5rem]">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="aspect-[4/5] w-full bg-paper object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {p.badge && (
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
              p.badge === "new" ? "bg-honey text-espresso" : "bg-espresso text-honey"
            }`}
          >
            {p.badge === "new" ? "Новинка" : "Хит"}
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-espresso/80 px-3 py-1 text-[11px] font-semibold text-cream/90 backdrop-blur-sm">
          SCA {p.sca}
        </span>
      </div>

      <div className="flex grow flex-col p-5 sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-caramel">
          {catLabel} · {p.country}
        </p>
        <h3 className="mt-2 font-display text-xl leading-snug sm:text-[1.35rem]">
          {p.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.notes.map((n) => (
            <span
              key={n}
              className="rounded-full border border-bark/20 bg-paper px-2.5 py-1 text-xs text-muted transition-colors group-hover:border-caramel/40"
            >
              {n}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-4 rounded-full ${i <= p.roast ? "bg-bark" : "bg-bark/20"}`}
              />
            ))}
          </span>
          <span className="text-xs font-medium text-muted">{roastName(p.roast)}</span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-bark/15 pt-4">
          <div className="leading-tight">
            <span className="font-display text-[1.35rem]">{fmt(p.price)}</span>
            <span className="block text-xs text-muted">за 250 г</span>
          </div>
          <button
            onClick={handleAdd}
            aria-label={`Добавить ${p.name} в корзину`}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl transition-all duration-300 active:scale-90 ${
              added
                ? "scale-110 bg-caramel text-espresso"
                : "bg-espresso text-cream hover:bg-caramel hover:text-espresso"
            }`}
          >
            {added ? <IconCheck /> : <IconBasket />}
          </button>
        </div>
      </div>
    </article>
  );
}
