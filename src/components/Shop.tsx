import { useMemo } from "react";
import {
  CATEGORIES,
  PRODUCTS,
  type Category,
  type Product,
} from "../data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { IconChevronDown, IconCup, IconSearch, IconX } from "./icons";

export type SortId = "featured" | "price-asc" | "price-desc" | "roast-desc";

const SORTS: { id: SortId; label: string }[] = [
  { id: "featured", label: "По популярности" },
  { id: "price-asc", label: "Сначала дешевле" },
  { id: "price-desc", label: "Сначала дороже" },
  { id: "roast-desc", label: "По крепости обжарки" },
];

const pluralLots = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "лот";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "лота";
  return "лотов";
};

interface Props {
  query: string;
  setQuery: (v: string) => void;
  category: Category;
  setCategory: (c: Category) => void;
  sort: SortId;
  setSort: (s: SortId) => void;
  onOpen: (p: Product) => void;
  onAdd: (p: Product) => void;
}

export default function Shop({
  query,
  setQuery,
  category,
  setCategory,
  sort,
  setSort,
  onOpen,
  onAdd,
}: Props) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const inCategory = category === "all" || p.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.country,
        p.region,
        p.process,
        ...p.notes,
        CATEGORIES.find((c) => c.id === p.category)?.label ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "roast-desc":
        list = [...list].sort((a, b) => b.roast - a.roast);
        break;
      default:
        break;
    }
    return list;
  }, [query, category, sort]);

  const reset = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <section id="catalog" className="relative scroll-mt-20 bg-paper py-16 text-ink lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading + search */}
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-caramel">
                <span className="inline-block h-px w-10 bg-caramel" />
                зерно · дрип-пакеты скоро
              </p>
              <h2 className="font-display text-4xl sm:text-5xl">Каталог лотов</h2>
              <p className="mt-3 text-sm font-medium text-muted">
                {filtered.length} {pluralLots(filtered.length)} · обжарено{" "}
                {new Date(Date.now() - 2 * 86400000).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>

            <label className="relative block w-full md:w-80">
              <IconSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Эфиопия, какао, для фильтра…"
                className="w-full rounded-full border border-bark/25 bg-cream py-3.5 pl-11 pr-10 text-sm outline-none transition-all placeholder:text-muted/70 focus:border-caramel focus:ring-4 focus:ring-caramel/20"
                aria-label="Поиск по каталогу"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Очистить поиск"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition-colors hover:bg-paper hover:text-ink"
                >
                  <IconX />
                </button>
              )}
            </label>
          </div>
        </Reveal>

        {/* filters */}
        <Reveal delay={80}>
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0">
              {CATEGORIES.map((c) => {
                const count =
                  c.id === "all"
                    ? PRODUCTS.length
                    : PRODUCTS.filter((p) => p.category === c.id).length;
                const active = category === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
                      active
                        ? "border-espresso bg-espresso text-honey shadow-md shadow-espresso/20"
                        : "border-bark/25 bg-transparent text-ink/80 hover:border-caramel hover:text-caramel"
                    }`}
                  >
                    {c.label}
                    <span className={`ml-1.5 text-xs ${active ? "text-cream/60" : "text-muted/70"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="relative w-full lg:w-60">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="w-full cursor-pointer appearance-none rounded-full border border-bark/25 bg-cream py-2.5 pl-4 pr-10 text-sm font-medium outline-none transition-colors focus:border-caramel"
                aria-label="Сортировка"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <IconChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
            </label>
          </div>
        </Reveal>

        {/* grid / empty state */}
        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90} className="h-full">
                <ProductCard product={p} onOpen={onOpen} onAdd={onAdd} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-4 rounded-lg border border-dashed border-bark/30 bg-cream/60 px-6 py-20 text-center">
            <IconCup className="text-5xl text-tan" />
            <h3 className="font-display text-2xl">Ничего не нашлось</h3>
            <p className="max-w-sm text-sm text-muted">
              По запросу{query ? ` «${query.trim()}»` : ""} в этой категории пусто.
              Попробуйте другое название, ноту вкуса или сбросьте фильтры.
            </p>
            <button
              onClick={reset}
              className="mt-2 rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-caramel hover:text-espresso active:scale-95"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
