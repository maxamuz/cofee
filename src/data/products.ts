export type Category = "all" | "filter" | "espresso" | "universal" | "decaf";
export type Weight = 250 | 1000;

export interface Product {
  id: string;
  name: string;
  country: string;
  region: string;
  category: Exclude<Category, "all">;
  price: number; // за 250 г
  roast: 1 | 2 | 3 | 4 | 5;
  notes: string[];
  description: string;
  process: string;
  altitude: string;
  variety: string;
  sca: number;
  badge?: "new" | "hit";
  image: string;
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "Все лоты" },
  { id: "filter", label: "Для фильтра" },
  { id: "espresso", label: "Для эспрессо" },
  { id: "universal", label: "Универсальное" },
  { id: "decaf", label: "Без кофеина" },
];

export const WEIGHTS: { value: Weight; label: string }[] = [
  { value: 250, label: "250 г" },
  { value: 1000, label: "1 кг" },
];

export const weightPrice = (p: Product, w: Weight): number =>
  w === 250 ? p.price : Math.round((p.price * 3.6) / 10) * 10;

export const weightLabel = (w: Weight): string => (w === 250 ? "250 г" : "1 кг");

export const fmt = (n: number): string => `${n.toLocaleString("ru-RU")} ₽`;

export const FREE_SHIPPING_FROM = 3000;
export const SHIPPING_COST = 350;

export const roastName = (r: number): string =>
  r <= 2 ? "Светлая обжарка" : r === 3 ? "Средняя обжарка" : "Тёмная обжарка";

export const PRODUCTS: Product[] = [
  {
    id: "ethiopia-yirgacheffe",
    name: "Эфиопия Иргачефф",
    country: "Эфиопия",
    region: "Гедео, кооператив Идидо",
    category: "filter",
    price: 1290,
    roast: 2,
    notes: ["бергамот", "черника", "жасмин"],
    description:
      "Микролот с высокогорных садов региона Гедео, где кофейные деревья растут в тени ложных бананов. Мытая обработка подчёркивает чайную структуру и яркую цитрусовую кислотность. В чашке — бергамот и чёрный чай, аромат жасмина и сочное черничное послевкусие. Идеален в воронке V60 и кемексе.",
    process: "Мытая обработка",
    altitude: "1 900–2 200 м",
    variety: "Эфирные наследственные сорта",
    sca: 87,
    badge: "hit",
    image:
      "https://image.qwenlm.ai/generated-images/06f2db18-a6df-438d-a10d-31011c6cf6ae/_result.png",
  },
  {
    id: "colombia-huila",
    name: "Колумбия Уила",
    country: "Колумбия",
    region: "Департамент Уила, финка Ла-Эсперанса",
    category: "espresso",
    price: 1190,
    roast: 3,
    notes: ["карамель", "красное яблоко", "какао"],
    description:
      "Классика спешелти из сердца Колумбии, выращенная семьёй Ортис на склонах Центральной Кордильеры. Сбалансированное тело, мягкая яблочная кислотность и долгое карамельное послевкусие. Раскрывается и в эспрессо, и в капучино — ореховая сладость без капли горечи.",
    process: "Мытая обработка",
    altitude: "1 650–1 800 м",
    variety: "Катурра, кастильо",
    sca: 85,
    image:
      "https://image.qwenlm.ai/generated-images/553ef039-5c5d-4e53-b0ba-e3873027faef/_result.png",
  },
  {
    id: "brazil-cerrado",
    name: "Бразилия Серрадо",
    country: "Бразилия",
    region: "Минас-Жерайс, Серрадо-Минейро",
    category: "espresso",
    price: 990,
    roast: 4,
    notes: ["фундук", "тёмный шоколад", "изюм"],
    description:
      "Плотный и сладкий лот натуральной обработки с равнин Серрадо. Минимум кислотности, максимум тела: лесной орех, плитка горького шоколада и изюм в послевкусии. Наша базовая рекомендация для эспрессо и напитков с молоком — от флэт-уайта до рафа.",
    process: "Натуральная обработка",
    altitude: "900–1 100 м",
    variety: "Мундо-ново, катуаи",
    sca: 84,
    image:
      "https://image.qwenlm.ai/generated-images/7fa2ef84-3cd8-4f74-aefa-a4751e7ca60f/_result.png",
  },
  {
    id: "kenya-nyeri",
    name: "Кения Ньери AA",
    country: "Кения",
    region: "Округ Ньери, станция Гичатхаини",
    category: "filter",
    price: 1490,
    roast: 2,
    notes: ["чёрная смородина", "грейпфрут", "тростниковый сахар"],
    description:
      "Знаменитый кенийский скрин AA со станции Гичатхаини — ягода в каждой капле. Двойная ферментация и сушка на африканских кроватях дают плотное винное тело, сочную кислотность чёрной смородины и грейпфрутовую искру. Для тех, кто ищет в фильтре максимум яркости.",
    process: "Мытая обработка, двойная ферментация",
    altitude: "1 700–1 900 м",
    variety: "SL28, SL34",
    sca: 88,
    badge: "new",
    image:
      "https://image.qwenlm.ai/generated-images/a53b8851-4c65-454b-a66c-2031cbaf1556/_result.png",
  },
  {
    id: "guatemala-antigua",
    name: "Гватемала Антигуа",
    country: "Гватемала",
    region: "Долина Антигуа, вулкан Акатенанго",
    category: "universal",
    price: 1250,
    roast: 3,
    notes: ["какао", "апельсин", "цветочный мёд"],
    description:
      "Лот с вулканических почв долины Антигуа, выращенный под сенью Акатенанго. Богатое какао-тело, деликатная апельсиновая кислинка и медовая сладость в финале. Универсальный профиль: одинаково уверенно ведёт себя в воронке, эспрессо и гейзерной кофеварке.",
    process: "Мытая обработка",
    altitude: "1 500–1 700 м",
    variety: "Бурбон, катуаи",
    sca: 86,
    image:
      "https://image.qwenlm.ai/generated-images/0f4a4c22-76fd-491f-bc16-942c313dc1ed/_result.png",
  },
  {
    id: "decaf-colombia",
    name: "Колумбия Декаф",
    country: "Колумбия",
    region: "Департамент Толима, финка Палестина",
    category: "decaf",
    price: 1150,
    roast: 3,
    notes: ["молочный шоколад", "финик", "пряник"],
    description:
      "Декофеинизация Swiss Water — без единого химического растворителя, только вода и осмос. Кофе сохраняет природную сладость: молочный шоколад, спелый финик и пряничные специи. Вечерний капучино, после которого вы уснёте, — и он будет вкусным.",
    process: "Swiss Water + мытая обработка",
    altitude: "1 600–1 750 м",
    variety: "Катурра, колумбия",
    sca: 84,
    image:
      "https://image.qwenlm.ai/generated-images/844104ce-6049-463b-9e07-cdd63c065e59/_result.png",
  },
];
