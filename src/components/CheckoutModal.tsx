import { useState } from "react";
import { fmt, FREE_SHIPPING_FROM, SHIPPING_COST } from "../data/products";
import type { CartItem } from "../App";
import {
  IconCard,
  IconCash,
  IconCheck,
  IconPin,
  IconStore,
  IconTruck,
  IconX,
} from "./icons";

interface Props {
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onComplete: () => void;
}

type Step = "form" | "submitting" | "done";
type Delivery = "pickup" | "delivery";
type Payment = "card" | "cash";

const inputCls =
  "w-full rounded-md border border-bark/25 bg-cream px-4 py-3 text-sm outline-none transition-all placeholder:text-muted/60 focus:border-caramel focus:ring-4 focus:ring-caramel/20";

export default function CheckoutModal({ items, subtotal, onClose, onComplete }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [delivery, setDelivery] = useState<Delivery>("delivery");
  const [payment, setPayment] = useState<Payment>("card");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderNo, setOrderNo] = useState("");

  const shipping = delivery === "pickup" ? 0 : subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const count = items.reduce((s, i) => s + i.qty, 0);

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Укажите имя";
    if (!/^[+0-9()\-\s]{10,18}$/.test(phone.trim())) e.phone = "Телефон в формате +7 900 000-00-00";
    if (delivery === "delivery" && address.trim().length < 6) e.address = "Укажите адрес доставки";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    setStep("submitting");
    setTimeout(() => {
      setOrderNo(`KR-${Math.floor(1000 + Math.random() * 9000)}`);
      setStep("done");
    }, 1500);
  };

  const radioCard = (active: boolean) =>
    `flex items-start gap-3 rounded-md border-2 p-3.5 text-left transition-all active:scale-[0.98] ${
      active ? "border-caramel bg-caramel/10" : "border-bark/20 bg-cream hover:border-caramel/50"
    }`;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" role="dialog" aria-modal="true" aria-label="Оформление заказа">
      <div
        className="fixed inset-0 bg-espresso/80 backdrop-blur-sm"
        onClick={step === "submitting" ? undefined : onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div className="toast-in relative w-full max-w-xl rounded-lg border border-caramel/25 bg-paper text-ink shadow-2xl">
          {step !== "submitting" && (
            <button
              onClick={step === "done" ? onComplete : onClose}
              aria-label="Закрыть"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-bark/20 text-lg transition-all hover:border-caramel hover:text-caramel active:scale-90"
            >
              <IconX />
            </button>
          )}

          {step === "done" ? (
            <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
              <svg viewBox="0 0 64 64" className="h-20 w-20 text-caramel" fill="none">
                <circle cx="32" cy="32" r="27" stroke="currentColor" strokeWidth="3" className="check-circle" strokeLinecap="round" />
                <path d="M21 33.5 29 41l14-16" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" className="check-mark" />
              </svg>
              <h3 className="mt-6 font-display text-3xl">Заказ {orderNo} принят!</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                Мы отправили подтверждение на указанный телефон. Ваши зёрна попадут
                в ближайшую обжарку — {""}
                <span className="font-semibold text-ink">во вторник</span>, а дальше —
                48 часов дегазации и сразу к вам.
              </p>

              <dl className="mt-7 w-full max-w-sm rounded-md border border-bark/20 bg-cream p-5 text-sm">
                <div className="flex justify-between py-1">
                  <dt className="text-muted">Позиции</dt>
                  <dd className="font-semibold">{count} шт</dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-muted">Получение</dt>
                  <dd className="font-semibold">
                    {delivery === "pickup" ? "Самовывоз, Лялин пер., 5" : "Курьером"}
                  </dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-muted">Оплата</dt>
                  <dd className="font-semibold">{payment === "card" ? "Карта онлайн" : "При получении"}</dd>
                </div>
                <div className="mt-2 flex justify-between border-t border-bark/15 pt-3">
                  <dt className="font-display text-lg">Итого</dt>
                  <dd className="font-display text-lg">{fmt(total)}</dd>
                </div>
              </dl>

              <button
                onClick={onComplete}
                className="mt-7 rounded-full bg-espresso px-8 py-3.5 font-bold text-cream transition-all hover:bg-caramel hover:text-espresso active:scale-95"
              >
                Вернуться в магазин
              </button>
            </div>
          ) : (
            <div className="px-6 py-7 sm:px-8">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-caramel">
                шаг 1 из 1 · демо-оплата
              </p>
              <h3 className="mt-2 font-display text-3xl">Оформление заказа</h3>

              <div className="mt-6">
                <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                  Способ получения
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={() => setDelivery("pickup")} className={radioCard(delivery === "pickup")}>
                    <IconStore className="mt-0.5 shrink-0 text-xl text-caramel" />
                    <span>
                      <span className="block text-sm font-bold">Самовывоз — бесплатно</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                        Москва, Лялин пер., 5 · сегодня с 12:00
                      </span>
                    </span>
                  </button>
                  <button type="button" onClick={() => setDelivery("delivery")} className={radioCard(delivery === "delivery")}>
                    <IconTruck className="mt-0.5 shrink-0 text-xl text-caramel" />
                    <span>
                      <span className="block text-sm font-bold">
                        Доставка — {subtotal >= FREE_SHIPPING_FROM ? "бесплатно" : fmt(SHIPPING_COST)}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                        По России, 1–3 дня · бесплатно от {fmt(FREE_SHIPPING_FROM)}
                      </span>
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="co-name" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    Имя
                  </label>
                  <input
                    id="co-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как к вам обращаться"
                    className={`${inputCls} ${errors.name ? "border-red-700/60" : ""}`}
                  />
                  {errors.name && <p className="mt-1 text-xs font-medium text-red-800">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="co-phone" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    Телефон
                  </label>
                  <input
                    id="co-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 900 000-00-00"
                    inputMode="tel"
                    className={`${inputCls} ${errors.phone ? "border-red-700/60" : ""}`}
                  />
                  {errors.phone && <p className="mt-1 text-xs font-medium text-red-800">{errors.phone}</p>}
                </div>
              </div>

              {delivery === "delivery" && (
                <div className="toast-in mt-4">
                  <label htmlFor="co-address" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    Адрес доставки
                  </label>
                  <input
                    id="co-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Город, улица, дом, квартира"
                    className={`${inputCls} ${errors.address ? "border-red-700/60" : ""}`}
                  />
                  {errors.address && <p className="mt-1 text-xs font-medium text-red-800">{errors.address}</p>}
                </div>
              )}

              <div className="mt-5">
                <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.16em] text-muted">Оплата</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={() => setPayment("card")} className={radioCard(payment === "card")}>
                    <IconCard className="mt-0.5 shrink-0 text-xl text-caramel" />
                    <span>
                      <span className="block text-sm font-bold">Картой онлайн</span>
                      <span className="mt-0.5 block text-xs text-muted">Visa · MC · МИР · СБП</span>
                    </span>
                  </button>
                  <button type="button" onClick={() => setPayment("cash")} className={radioCard(payment === "cash")}>
                    <IconCash className="mt-0.5 shrink-0 text-xl text-caramel" />
                    <span>
                      <span className="block text-sm font-bold">При получении</span>
                      <span className="mt-0.5 block text-xs text-muted">Наличными или картой</span>
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-md border border-bark/20 bg-cream px-4 py-3 text-sm">
                <span className="text-muted">
                  {count} шт · {delivery === "pickup" ? "самовывоз" : "доставка"}
                  {shipping > 0 ? ` + ${fmt(shipping)}` : ""}
                </span>
                <span className="font-display text-xl">{fmt(total)}</span>
              </div>

              <button
                onClick={submit}
                disabled={step === "submitting"}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-espresso py-4 font-bold text-cream transition-all hover:bg-caramel hover:text-espresso active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
              >
                {step === "submitting" ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                    Проводим оплату…
                  </>
                ) : (
                  <>
                    <IconCheck className="text-lg" />
                    Подтвердить заказ
                  </>
                )}
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
                <IconPin className="text-sm text-caramel" />
                Это демонстрация: данные никуда не отправляются
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
