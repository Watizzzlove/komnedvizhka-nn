"use client";

import React, { useEffect, useRef } from "react";
import { Property } from "@/types/property";
import { NIZHNY_NOVGOROD_METRO } from "@/data/metro-stations";

interface MapPaneProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  hoveredPropertyId: string | null;
  onHoverProperty: (id: string | null) => void;
}

export const MapPane: React.FC<MapPaneProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  hoveredPropertyId,
  onHoverProperty,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const metroLayerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    const container = mapContainerRef.current;
    if (!container) return;

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      if (!mapInstanceRef.current && container) {
        // Init map centered on Nizhny Novgorod
        const map = L.map(container, {
          center: [56.3269, 43.9984], // Кремль / Стрелка
          zoom: 12,
          zoomControl: false,
        });

        // Add sleek zoom control on bottom right
        L.control.zoom({ position: "bottomright" }).addTo(map);

        // High-contrast dark styled OpenStreetMap (no API key required, pure dark mode)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        markersLayerRef.current = L.layerGroup().addTo(map);
        metroLayerRef.current = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;

        // Render Metro stations of Nizhny Novgorod
        NIZHNY_NOVGOROD_METRO.forEach((station) => {
          const isBlue = station.line === "Сормовско-Мещерская";
          const metroIcon = L.divIcon({
            className: "custom-metro-marker",
            html: `<div class="metro-station-pin ${isBlue ? "blue" : ""}" title="ст. м. ${station.name}">М</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });

          L.marker([station.lat, station.lng], { icon: metroIcon })
            .bindTooltip(`ст. м. ${station.name} (${station.line} ветка)`, {
              direction: "top",
              offset: [0, -10],
            })
            .addTo(metroLayerRef.current);
        });
      }

      // Re-render property markers
      if (markersLayerRef.current && mapInstanceRef.current) {
        markersLayerRef.current.clearLayers();

        properties.forEach((prop) => {
          const isActive = hoveredPropertyId === prop.id || selectedProperty?.id === prop.id;

          let priceLabel = "";
          if (prop.dealType === "rent") {
            if (prop.priceTotal >= 1000000) {
              priceLabel = `${(prop.priceTotal / 1000000).toFixed(1)} млн ₽`;
            } else {
              priceLabel = `${Math.round(prop.priceTotal / 1000)} тыс. ₽`;
            }
          } else {
            priceLabel = `${(prop.priceTotal / 1000000).toFixed(1)} млн ₽`;
          }

          const priceIcon = L.divIcon({
            className: "custom-price-wrapper",
            html: `<div class="custom-price-pin ${isActive ? "active" : ""}">
              <span>${priceLabel}</span>
            </div>`,
            iconSize: [84, 30],
            iconAnchor: [42, 15],
          });

          const marker = L.marker([prop.coordinates.lat, prop.coordinates.lng], {
            icon: priceIcon,
            zIndexOffset: isActive ? 1000 : 10,
          });

          marker.on("click", () => {
            onSelectProperty(prop);
          });

          marker.on("mouseover", () => {
            onHoverProperty(prop.id);
          });

          marker.on("mouseout", () => {
            onHoverProperty(null);
          });

          marker.addTo(markersLayerRef.current);
        });
      }
    });
  }, [properties, hoveredPropertyId, selectedProperty]);

  // Center map when selectedProperty changes
  useEffect(() => {
    if (selectedProperty && mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [selectedProperty.coordinates.lat, selectedProperty.coordinates.lng],
        14,
        { animate: true, duration: 0.8 }
      );
    }
  }, [selectedProperty]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#080D10]">
      <div ref={mapContainerRef} className="h-full w-full" />

      {/* Dark Map Legend */}
      <div className="font-heading absolute left-4 top-4 z-[400] flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#0E151A]/95 p-3.5 shadow-2xl backdrop-blur-md">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Карта Н. Новгорода
        </span>
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white">
            М
          </span>
          <span>Автозаводская линия</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white">
            М
          </span>
          <span>Сормовская линия</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF7A00]"></span>
          <span>Лоты на карте ({properties.length})</span>
        </div>
      </div>
    </div>
  );
};
