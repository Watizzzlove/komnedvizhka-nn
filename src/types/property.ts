export type PropertyCategory =
  | "warehouse"      // Складские комплексы
  | "office"         // Офисы и БЦ
  | "retail"         // Торговые помещения / Стрит-ритейл
  | "manufacturing"  // Производственные площади
  | "land"           // Коммерческая земля
  | "free_purpose";  // Свободное назначение (ПСН)

export type DealType = "rent" | "sale";

export type SourceType = "GiperNN" | "Domclick" | "XML-Feed" | "Direct";

export interface PropertyFeatures {
  // Склад / Производство
  ceilingHeight?: number;      // Высота потолков, метры
  floorType?: string;          // Антипыль, топпинг, бетон
  hasRamp?: boolean;           // Пандус / дебаркадер
  hasRailway?: boolean;        // Ж/Д тупик / ветка
  powerKw?: number;            // Выделенная мощность, кВт
  hasCraneBeam?: boolean;      // Кран-балка
  craneCapacityTons?: number;  // Грузоподъемность крана, т
  heating?: boolean;           // Отопление

  // Офис
  buildingClass?: "A" | "B+" | "B" | "C";
  parkingSpaces?: number;      // Парковочные места
  floor?: number;              // Этаж
  totalFloors?: number;        // Этажность здания
  hasVentilation?: boolean;    // Приточно-вытяжная вентиляция

  // Ритейл / Общепит
  line?: 1 | 2;                // 1-я или 2-я линия
  separateEntrance?: boolean;  // Отдельный вход с улицы
  displayWindows?: boolean;    // Витринные окна в пол
  wetPoints?: number;          // Мокрые точки
  exhaustVent?: boolean;       // Отдельная вентиляционная шахта под общепит

  // Земля
  landCategory?: string;       // Категория земель (земли населенных пунктов, промышленность)
  permittedUse?: string;       // ВРИ
  gasConnected?: boolean;      // Газификация
  waterConnected?: boolean;    // Водоснабжение
}

export interface Property {
  id: string;
  title: string;
  description: string;
  dealType: DealType;
  category: PropertyCategory;
  priceTotal: number;          // Общая цена (руб/мес для аренды или полная стоимость для продажи)
  pricePerSqm: number;         // Ставка за 1 м²
  area: number;                // Площадь, м²
  address: string;             // Адрес в НН
  district: string;            // Район (Нижегородский, Канавинский, Советский и т.д.)
  metroStation?: string;       // Ближайшая станция метро
  metroDistanceMin?: number;   // Минут до метро
  coordinates: {
    lat: number;
    lng: number;
  };
  photos: string[];
  features: PropertyFeatures;
  source: SourceType;
  sourceUrl?: string;
  verifiedOwner: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MetroStation {
  name: string;
  line: "Автозаводская" | "Сормовско-Мещерская";
  lineColor: string;
  lat: number;
  lng: number;
}
