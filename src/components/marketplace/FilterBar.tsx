"use client";

import React from "react";
import { PropertyCategory, DealType } from "@/types/property";
import { NN_DISTRICTS, NIZHNY_NOVGOROD_METRO } from "@/data/metro-stations";
import { X, Columns2, List, Map } from "lucide-react";

export interface FilterState {
  category: PropertyCategory | "all";
  district: string;
  metro: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;
  verifiedOnly: boolean;
  warehouseRamp: boolean;
  warehouseRailway: boolean;
  warehouseHeating: boolean;
  minCeiling: string;
  officeClass: string;
  officeParking: boolean;
  retailFirstLine: boolean;
  retailSeparateEntrance: boolean;
}

interface FilterBarProps {
  dealType: DealType;
  onDealTypeChange: (type: DealType) => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  viewMode: "split" | "list" | "map";
  onViewModeChange: (mode: "split" | "list" | "map") => void;
  resultsCount: number;
}

const CATEGORIES: { id: PropertyCategory | "all"; label: string }[] = [
  { id: "all", label: "Все категории" },
  { id: "warehouse", label: "Склады" },
  { id: "office", label: "Офисы" },
  { id: "retail", label: "Ритейл" },
  { id: "free_purpose", label: "ПСН" },
  { id: "manufacturing", label: "Производство" },
  { id: "land", label: "Земля" },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  dealType,
  onDealTypeChange,
  filters,
  onChange,
  viewMode,
  onViewModeChange,
  resultsCount,
}) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onChange({
      category: "all",
      district: "Все районы",
      metro: "Все станции",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
      verifiedOnly: false,
      warehouseRamp: false,
      warehouseRailway: false,
      warehouseHeating: false,
      minCeiling: "",
      officeClass: "all",
      officeParking: false,
      retailFirstLine: false,
      retailSeparateEntrance: false,
    });
  };

  return (
    <div className="bg-[#080D10] border-b border-white/[0.08] py-5">
      <div className="ph-container space-y-4">
        {/* Row 1: Deal Type Switcher + Minimal Category Badges + View Modes */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Deal Type Switcher */}
            <div className="inline-flex items-center rounded-lg bg-[#121A1F] p-1 border border-white/[0.05] font-heading">
              <button
                onClick={() => onDealTypeChange("rent")}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  dealType === "rent"
                    ? "bg-[#FF7A00] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Аренда
              </button>
              <button
                onClick={() => onDealTypeChange("sale")}
                className={`rounded-md px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  dealType === "sale"
                    ? "bg-[#FF7A00] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Продажа
              </button>
            </div>

            {/* Category Pills (Minimalist Phenomenon Style) */}
            <div className="flex flex-wrap items-center gap-1.5 font-heading">
              {CATEGORIES.map((cat) => {
                const isActive = filters.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => updateFilter("category", cat.id)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-white text-[#080D10] font-semibold shadow-sm"
                        : "bg-[#121A1F] text-slate-300 hover:bg-[#18232A] hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="inline-flex items-center rounded-lg bg-[#121A1F] p-1 border border-white/[0.05] font-heading">
            <button
              onClick={() => onViewModeChange("split")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === "split"
                  ? "bg-white text-[#080D10] font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Columns2 className="h-3.5 w-3.5" />
              <span>Сплит</span>
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === "list"
                  ? "bg-white text-[#080D10] font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Список</span>
            </button>
            <button
              onClick={() => onViewModeChange("map")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === "map"
                  ? "bg-white text-[#080D10] font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Map className="h-3.5 w-3.5" />
              <span>Карта</span>
            </button>
          </div>
        </div>

        {/* Row 2: Sleek Minimal Search Controls */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 pt-1">
          <select
            value={filters.district}
            onChange={(e) => updateFilter("district", e.target.value)}
            className="rounded-lg bg-[#121A1F] px-3 py-2.5 font-heading text-xs text-white focus:outline-none border-none cursor-pointer"
          >
            {NN_DISTRICTS.map((d) => (
              <option key={d} value={d} className="bg-[#121A1F] text-white">
                {d}
              </option>
            ))}
          </select>

          <select
            value={filters.metro}
            onChange={(e) => updateFilter("metro", e.target.value)}
            className="rounded-lg bg-[#121A1F] px-3 py-2.5 font-heading text-xs text-white focus:outline-none border-none cursor-pointer"
          >
            <option value="Все станции" className="bg-[#121A1F] text-white">
              Метро (Все станции)
            </option>
            {NIZHNY_NOVGOROD_METRO.map((m) => (
              <option key={m.name} value={m.name} className="bg-[#121A1F] text-white">
                м. {m.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1">
            <input
              type="number"
              placeholder="Цена от, ₽"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              className="w-1/2 rounded-lg bg-[#121A1F] px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none border-none"
            />
            <input
              type="number"
              placeholder="до"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              className="w-1/2 rounded-lg bg-[#121A1F] px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none border-none"
            />
          </div>

          <div className="flex items-center gap-1">
            <input
              type="number"
              placeholder="Площадь от"
              value={filters.minArea}
              onChange={(e) => updateFilter("minArea", e.target.value)}
              className="w-1/2 rounded-lg bg-[#121A1F] px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none border-none"
            />
            <input
              type="number"
              placeholder="до м²"
              value={filters.maxArea}
              onChange={(e) => updateFilter("maxArea", e.target.value)}
              className="w-1/2 rounded-lg bg-[#121A1F] px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none border-none"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#121A1F] px-3 py-2.5 font-heading text-xs font-medium text-slate-300">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => updateFilter("verifiedOnly", e.target.checked)}
              className="rounded bg-transparent text-[#FF7A00] focus:ring-0"
            />
            <span>Проверено ЕГРН</span>
          </label>

          <div className="flex items-center justify-between px-2 font-heading">
            <span className="text-xs text-slate-400">
              Лотов: <span className="text-[#FF7A00] font-bold">{resultsCount}</span>
            </span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-3 w-3" />
              <span>Сбросить</span>
            </button>
          </div>
        </div>

        {/* Dynamic Category Specific Filters */}
        {filters.category === "warehouse" && (
          <div className="flex flex-wrap items-center gap-4 rounded-lg bg-[#121A1F] p-3 font-heading text-xs">
            <span className="text-[#FF7A00] font-semibold uppercase tracking-wider text-[11px]">
              Склад:
            </span>
            <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.warehouseRamp}
                onChange={(e) => updateFilter("warehouseRamp", e.target.checked)}
                className="text-[#FF7A00] rounded focus:ring-0"
              />
              <span>Пандус</span>
            </label>
            <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.warehouseRailway}
                onChange={(e) => updateFilter("warehouseRailway", e.target.checked)}
                className="text-[#FF7A00] rounded focus:ring-0"
              />
              <span>Ж/Д ветка</span>
            </label>
            <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.warehouseHeating}
                onChange={(e) => updateFilter("warehouseHeating", e.target.checked)}
                className="text-[#FF7A00] rounded focus:ring-0"
              />
              <span>Отопление</span>
            </label>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span>Потолки:</span>
              <select
                value={filters.minCeiling}
                onChange={(e) => updateFilter("minCeiling", e.target.value)}
                className="bg-[#080D10] text-white rounded px-2 py-0.5 border-none font-heading"
              >
                <option value="">Любые</option>
                <option value="6">от 6 м</option>
                <option value="8">от 8 м</option>
                <option value="10">от 10 м</option>
              </select>
            </div>
          </div>
        )}

        {filters.category === "office" && (
          <div className="flex flex-wrap items-center gap-4 rounded-lg bg-[#121A1F] p-3 font-heading text-xs">
            <span className="text-[#FF7A00] font-semibold uppercase tracking-wider text-[11px]">
              Офис:
            </span>
            <select
              value={filters.officeClass}
              onChange={(e) => updateFilter("officeClass", e.target.value)}
              className="bg-[#080D10] text-white rounded px-2 py-0.5 border-none font-heading"
            >
              <option value="all">Все классы</option>
              <option value="A">Класс A</option>
              <option value="B+">Класс B+</option>
              <option value="B">Класс B</option>
            </select>
            <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.officeParking}
                onChange={(e) => updateFilter("officeParking", e.target.checked)}
                className="text-[#FF7A00] rounded focus:ring-0"
              />
              <span>Паркинг</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
