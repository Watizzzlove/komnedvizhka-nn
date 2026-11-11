"use client";

import React from "react";
import Image from "next/image";
import { Property } from "@/types/property";
import { formatPrice, formatNumber } from "@/lib/utils";
import { assetPath } from "@/lib/asset-path";
import { MapPin } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  isHovered?: boolean;
  onHover?: (isHovered: boolean) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  isHovered = false,
  onHover,
}) => {
  return (
    <div
      onClick={() => onSelect(property)}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className={`group cursor-pointer rounded-xl bg-[#121A1F] p-4 sm:p-5 transition-all duration-300 ${
        isHovered
          ? "bg-[#18232B] -translate-y-1"
          : "hover:bg-[#162027] hover:-translate-y-1"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#080D10]">
        <Image
          src={assetPath(property.photos[0])}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-104"
        />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 font-heading">
          <span className="rounded bg-[#080D10]/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            {property.source}
          </span>
          {property.verifiedOwner && (
            <span className="rounded bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              Проверено
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 rounded bg-[#080D10]/80 px-2.5 py-1 font-heading text-xs font-semibold text-white backdrop-blur-md">
          {formatNumber(property.area)} м²
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="font-heading text-lg font-bold text-white">
              {formatPrice(property.priceTotal)}
            </span>
            <span className="font-heading text-xs text-slate-400 font-normal">
              {property.dealType === "rent" ? " / мес" : ""}
            </span>
          </div>
          <div className="font-heading text-xs font-semibold text-[#FF7A00]">
            {formatPrice(property.pricePerSqm)} / м²
          </div>
        </div>

        <h3 className="font-heading text-sm font-medium text-white transition-colors duration-200 group-hover:text-[#FF7A00] line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 text-xs text-slate-400">
          <MapPin className="h-3 w-3 text-[#FF7A00] shrink-0" />
          <span className="truncate">{property.address}</span>
        </div>

        {property.metroStation && (
          <div className="flex items-center gap-1.5 font-heading text-xs text-white">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 text-[9px] font-black text-white">
              М
            </span>
            <span>ст. {property.metroStation}</span>
            {property.metroDistanceMin && (
              <span className="text-slate-400 font-sans">({property.metroDistanceMin} мин)</span>
            )}
          </div>
        )}

        {/* Minimal Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 font-heading">
          {property.features.ceilingHeight && (
            <span className="rounded bg-[#080D10] px-2 py-0.5 text-[10px] text-slate-300">
              Потолки {property.features.ceilingHeight} м
            </span>
          )}
          {property.features.hasRamp && (
            <span className="rounded bg-[#080D10] px-2 py-0.5 text-[10px] text-slate-300">
              Пандус
            </span>
          )}
          {property.features.buildingClass && (
            <span className="rounded bg-[#080D10] px-2 py-0.5 text-[10px] text-slate-300">
              Класс {property.features.buildingClass}
            </span>
          )}
          {property.features.powerKw && (
            <span className="rounded bg-[#080D10] px-2 py-0.5 text-[10px] text-slate-300">
              {property.features.powerKw} кВт
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
