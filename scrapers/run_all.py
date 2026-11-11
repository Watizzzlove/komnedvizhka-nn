"""
Universal Multi-Source Pipeline Runner & Deduplicator
Оркестратор сбора данных из GiperNN, Домклик API и XML-фидов с дедупликацией
"""

import sys
import os
import json
import math
from gipernn import fetch_gipernn_listings
from domclick import fetch_domclick_listings
from xml_feed import parse_xml_feed

def get_distance_meters(lat1, lon1, lat2, lon2):
    R = 6371e3
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = (math.sin(delta_phi / 2) ** 2 +
         math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def run_pipeline():
    print("=" * 60, file=sys.stderr)
    print("Запуск универсального пайплайна агрегации Нижнего Новгорода", file=sys.stderr)
    print("=" * 60, file=sys.stderr)

    # 1. GiperNN
    gipernn_items = fetch_gipernn_listings()
    print(f"-> GiperNN: получено {len(gipernn_items)} объектов", file=sys.stderr)

    # 2. Домклик
    domclick_items = fetch_domclick_listings()
    print(f"-> Домклик API: получено {len(domclick_items)} объектов", file=sys.stderr)

    # 3. XML Feed
    feed_path = os.path.join(os.path.dirname(__file__), "sample_agency_feed.xml")
    xml_items = parse_xml_feed(feed_path)
    print(f"-> XML-фид: получено {len(xml_items)} объектов", file=sys.stderr)

    all_raw = gipernn_items + domclick_items + xml_items
    print(f"\nВсего сырых объектов: {len(all_raw)}", file=sys.stderr)

    # 4. Движок дедупликации
    unique_items = []
    duplicates_merged = 0

    for item in all_raw:
        is_dup = False
        for existing in unique_items:
            dist = get_distance_meters(
                item["coordinates"]["lat"], item["coordinates"]["lng"],
                existing["coordinates"]["lat"], existing["coordinates"]["lng"]
            )
            area_diff = abs(item["area"] - existing["area"]) / existing["area"] if existing["area"] > 0 else 1.0
            
            # Критерий дубликата: дистанция < 90м И категория совпадает И дельта площади < 3.5%
            if (dist < 90 or item["address"].strip().lower() == existing["address"].strip().lower()) and \
               item["category"] == existing["category"] and area_diff <= 0.035:
                is_dup = True
                duplicates_merged += 1
                # Склеиваем фото
                existing["photos"] = list(dict.fromkeys(existing["photos"] + item["photos"]))
                break
        
        if not is_dup:
            unique_items.append(item)

    print(f"-> Алгоритм дедупликации: склеено {duplicates_merged} дублей.", file=sys.stderr)
    print(f"-> Итог: {len(unique_items)} уникальных объектов готово к загрузке в витрину.", file=sys.stderr)
    print("=" * 60, file=sys.stderr)

    return unique_items

if __name__ == "__main__":
    result = run_pipeline()
    print(json.dumps(result, ensure_ascii=False, indent=2))
