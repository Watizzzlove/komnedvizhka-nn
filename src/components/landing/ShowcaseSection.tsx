"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Property, PropertyCategory } from "@/types/property";
import { formatPrice } from "@/lib/utils";
import { assetPath } from "@/lib/asset-path";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";

interface ShowcaseSectionProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenCatalog: () => void;
  isUnsticky?: boolean;
}

const TABS: { id: PropertyCategory | "all"; label: string }[] = [
  { id: "all", label: "Все категории" },
  { id: "warehouse", label: "Склады и логистика" },
  { id: "office", label: "Офисы" },
  { id: "retail", label: "Ритейл" },
  { id: "free_purpose", label: "Свободное назначение" },
  { id: "manufacturing", label: "Производство" },
];

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  properties,
  onSelectProperty,
  onOpenCatalog,
  isUnsticky = false,
}) => {
  const [activeTab, setActiveTab] = useState<PropertyCategory | "all">("all");

  const showcaseItems = useMemo(() => {
    if (activeTab === "all") {
      const specificIds = ["nn-wh-01", "nn-off-02", "nn-ret-03", "nn-fp-09"];
      const found = specificIds
        .map((id) => properties.find((p) => p.id === id))
        .filter(Boolean) as Property[];
      if (found.length === 4) return found;
      return properties.slice(0, 4);
    }
    return properties.filter((p) => p.category === activeTab).slice(0, 4);
  }, [properties, activeTab]);

  return (
    <section
      id="showcase-section"
      className={`showcase-curtain ${
        isUnsticky ? "unsticky" : ""
      } bg-[#F7F8FA] text-[#080D10] pt-36 pb-24 md:pt-48 md:pb-36`}
    >
      <div className="ph-container">
        {/* Caption & Title in Phenomenon Scale */}
        <div className="space-y-4 mb-12">
          <div className="txt--caption-m text-slate-500">
            Отобранные лоты Нижнего Новгорода
          </div>
          <h2 className="title--xl text-[#080D10]">
            Флагманские объекты коммерции
          </h2>
          <p className="txt--lead !text-slate-600 max-w-4xl">
            Ключевые складские комплексы с пандусами, видовые офисы в центре, стрит-ритейл на Большой Покровской и помещения на площади Лядова с подтвержденным правом собственности.
          </p>
        </div>

        {/* Minimalist Tabs in Phenomenon Studio serv_base style */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 border-b border-black/[0.08] pb-4 mb-12 overflow-x-auto">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-heading text-sm sm:text-base font-semibold transition-all relative pb-4 whitespace-nowrap ${
                  isActive ? "text-[#080D10]" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF7A00] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* 2-Column Phenomenon Case Cards with Unfolding Hover Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {showcaseItems.map((prop) => (
            <div
              key={prop.id}
              onClick={() => onSelectProperty(prop)}
              className="ph-case-card group cursor-pointer p-4 sm:p-5 flex flex-col justify-between"
            >
              {/* Real Photography with subtle zoom on hover */}
              <div className="main-image relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-slate-200">
                <Image
                  src={assetPath(prop.photos[0])}
                  alt={prop.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badges on Top of Photo */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="bg-[#080D10]/85 px-3 py-1 rounded-md font-heading text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {prop.source}
                  </span>
                  {prop.verifiedOwner && (
                    <span className="bg-emerald-600/90 px-3 py-1 rounded-md font-heading text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>ЕГРН проверен</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 bg-[#080D10]/85 px-3 py-1.5 rounded-md font-heading text-xs font-bold text-white backdrop-blur-md z-10">
                  {prop.area.toLocaleString("ru-RU")} м²
                </div>
              </div>

              {/* Card Content Row (Z-Index 10 above unfolding ::before) */}
              <div className="card-content pt-6 pb-2 px-2 flex flex-col justify-between flex-1 space-y-6">
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-heading text-2xl sm:text-3xl font-bold text-[#080D10] group-hover:text-white transition-colors duration-300">
                      {formatPrice(prop.priceTotal)}{prop.dealType === "rent" ? " / мес" : ""}
                    </span>
                    <span className="font-heading text-xs font-bold text-[#FF7A00] tracking-wide">
                      {prop.pricePerSqm.toLocaleString("ru-RU")} ₽ / м²
                    </span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-medium text-[#080D10] group-hover:text-white transition-colors duration-300 leading-snug line-clamp-2">
                    {prop.title}
                  </h3>
                </div>

                <div className="pt-5 border-t border-black/[0.08] group-hover:border-white/[0.15] transition-colors duration-300 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-300">
                  <div className="flex items-center gap-2 truncate pr-4">
                    <MapPin className="h-4 w-4 text-[#FF7A00] shrink-0" />
                    <span className="truncate">{prop.address}</span>
                    {prop.metroStation && (
                      <span className="shrink-0 font-heading font-medium text-slate-700 group-hover:text-slate-200 transition-colors">
                        • м. {prop.metroStation}
                      </span>
                    )}
                  </div>

                  <div className="shrink-0 text-[#080D10] group-hover:text-[#FF7A00] transition-colors pl-2">
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Catalog CTA Banner in Phenomenon Style */}
        <div className="mt-16 sm:mt-20 rounded-2xl bg-[#080D10] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-xl">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="txt--caption-m text-[#FF7A00]">
              Интерактивная карта Нижнего Новгорода
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal text-white leading-tight">
              Ищете объект в определенном районе или у конкретной станции метро?
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              Откройте полный каталог с фильтрацией по грузоподъемности пандусов, классам офисов и пешей доступности до станций метро.
            </p>
          </div>

          <button
            onClick={onOpenCatalog}
            className="btn btn--orange hover--white btn--lg-desk arr arr-right shrink-0"
          >
            <span><b>Открыть карту и фильтры</b></span>
          </button>
        </div>
      </div>
    </section>
  );
};
