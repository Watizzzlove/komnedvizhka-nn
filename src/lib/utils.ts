import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Property } from "@/types/property";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount).replace("RUB", "₽");
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ru-RU").format(num);
}

// Вычисление расстояния между двумя координатами по формуле Haversine (в метрах)
export function getDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // радиус Земли в метрах
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Движок дедупликации объектов из разных источников
export function deduplicateProperties(existing: Property[], incoming: Property[]): {
  merged: Property[];
  duplicatesCount: number;
} {
  const result: Property[] = [...existing];
  let duplicatesCount = 0;

  for (const item of incoming) {
    const duplicateIndex = result.findIndex((target) => {
      // 1. Проверяем расстояние между точками (< 90 метров)
      const dist = getDistanceMeters(
        item.coordinates.lat,
        item.coordinates.lng,
        target.coordinates.lat,
        target.coordinates.lng
      );

      // 2. Проверяем категорию и тип сделки
      const categoryMatch = item.category === target.category;
      const dealMatch = item.dealType === target.dealType;

      // 3. Проверяем площадь с допуском 3.5%
      const areaDiff = Math.abs(item.area - target.area) / target.area;
      const areaMatch = areaDiff <= 0.035;

      return (dist < 90 || item.address.toLowerCase() === target.address.toLowerCase()) && categoryMatch && dealMatch && areaMatch;
    });

    if (duplicateIndex >= 0) {
      duplicatesCount++;
      // Объединяем информацию: если у нового объекта больше фото или есть подтверждение
      const existingItem = result[duplicateIndex];
      if (item.photos.length > existingItem.photos.length) {
        existingItem.photos = Array.from(new Set([...existingItem.photos, ...item.photos]));
      }
      if (item.verifiedOwner) {
        existingItem.verifiedOwner = true;
      }
    } else {
      result.push(item);
    }
  }

  return { merged: result, duplicatesCount };
}
