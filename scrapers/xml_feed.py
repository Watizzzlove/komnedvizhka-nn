"""
Yandex Realty & Cian XML Feed Parser
Парсер стандартных агентских XML-фидов коммерческой недвижимости
"""

import sys
import os
import json
import xml.etree.ElementTree as ET
from typing import List, Dict, Any

def parse_xml_feed(file_path: str) -> List[Dict[str, Any]]:
    print(f"[XML Feed Parser] Чтение и валидация XML-фида: {file_path}", file=sys.stderr)
    
    if not os.path.exists(file_path):
        print(f"[XML Feed Parser] Ошибка: файл не найден {file_path}", file=sys.stderr)
        return []

    tree = ET.parse(file_path)
    root = tree.getroot()
    
    # Снимаем XML namespace если есть
    ns = ""
    if root.tag.startswith("{"):
        ns = root.tag.split("}")[0] + "}"

    results = []
    
    for offer in root.findall(f"{ns}offer"):
        offer_id = offer.attrib.get("internal-id", "xml-unknown")
        
        # Тип сделки
        deal_type_raw = offer.findtext(f"{ns}type", "аренда").lower()
        deal_type = "rent" if "аренд" in deal_type_raw else "sale"
        
        # Категория
        cat_raw = offer.findtext(f"{ns}category", "помещение свободного назначения").lower()
        category = "free_purpose"
        if "склад" in cat_raw:
            category = "warehouse"
        elif "офис" in cat_raw:
            category = "office"
        elif "торгов" in cat_raw or "ритейл" in cat_raw:
            category = "retail"
        elif "производ" in cat_raw:
            category = "manufacturing"
        elif "земл" in cat_raw or "участ" in cat_raw:
            category = "land"
            
        # Локация
        loc = offer.find(f"{ns}location")
        address = "г. Нижний Новгород"
        district = "Нижегородский"
        lat, lng = 56.3269, 43.9984
        metro_name = None
        metro_dist = None
        
        if loc is not None:
            address = loc.findtext(f"{ns}address", address)
            district = loc.findtext(f"{ns}sub-locality-name", district)
            try:
                lat = float(loc.findtext(f"{ns}latitude", str(lat)))
                lng = float(loc.findtext(f"{ns}longitude", str(lng)))
            except ValueError:
                pass
            
            metro_elem = loc.find(f"{ns}metro")
            if metro_elem is not None:
                metro_name = metro_elem.findtext(f"{ns}name")
                dist_str = metro_elem.findtext(f"{ns}time-on-foot") or metro_elem.findtext(f"{ns}time-on-transport")
                if dist_str:
                    try:
                        metro_dist = int(dist_str)
                    except ValueError:
                        pass

        # Цена и площадь
        price_val = 0
        price_elem = offer.find(f"{ns}price/{ns}value")
        if price_elem is not None:
            try:
                price_val = int(float(price_elem.text or "0"))
            except ValueError:
                pass
                
        area_val = 0
        area_elem = offer.find(f"{ns}area/{ns}value")
        if area_elem is not None:
            try:
                area_val = int(float(area_elem.text or "0"))
            except ValueError:
                pass

        price_per_sqm = int(price_val / area_val) if area_val > 0 else 0

        # Описание и фото
        desc = offer.findtext(f"{ns}description", "")
        images = [img.text for img in offer.findall(f"{ns}image") if img.text]
        if not images:
            images = ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"]

        # Динамические характеристики
        features = {}
        cf = offer.find(f"{ns}commercial-features")
        if cf is not None:
            ceiling = cf.findtext(f"{ns}ceiling-height")
            if ceiling:
                try:
                    features["ceilingHeight"] = float(ceiling)
                except ValueError:
                    pass
            features["hasRamp"] = cf.findtext(f"{ns}ramp", "").lower() == "true"
            features["heating"] = cf.findtext(f"{ns}heating", "").lower() == "true"
            b_class = cf.findtext(f"{ns}building-class")
            if b_class:
                features["buildingClass"] = b_class
            power = cf.findtext(f"{ns}electric-power")
            if power:
                try:
                    features["powerKw"] = int(power)
                except ValueError:
                    pass

        results.append({
            "id": offer_id,
            "title": f"{cat_raw.capitalize()} {area_val} м² в {district} районе",
            "description": desc,
            "dealType": deal_type,
            "category": category,
            "priceTotal": price_val,
            "pricePerSqm": price_per_sqm,
            "area": area_val,
            "address": address,
            "district": district,
            "metroStation": metro_name,
            "metroDistanceMin": metro_dist,
            "coordinates": {"lat": lat, "lng": lng},
            "photos": images,
            "features": features,
            "source": "XML-Feed",
            "sourceUrl": "https://agency-feed.ru/offer/" + offer_id,
            "verifiedOwner": True
        })

    return results

if __name__ == "__main__":
    feed_file = os.path.join(os.path.dirname(__file__), "sample_agency_feed.xml")
    items = parse_xml_feed(feed_file)
    print(json.dumps(items, ensure_ascii=False, indent=2))
