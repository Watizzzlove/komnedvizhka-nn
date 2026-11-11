"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import {
  ChevronDown,
  Warehouse,
  Building2,
  Store,
  Factory,
  ArrowRight,
} from "lucide-react";

interface HeaderProps {
  onOpenShowcase: () => void;
  onOpenCatalog: () => void;
  totalListingsCount: number;
  theme?: "dark" | "light";
}

export const Header: React.FC<HeaderProps> = ({
  onOpenShowcase,
  onOpenCatalog,
  theme = "dark",
}) => {
  const [activeDropdown, setActiveDropdown] = useState<"categories" | "districts" | null>(null);

  const isLight = theme === "light";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 backdrop-blur-md ${
        isLight
          ? "bg-white/95 border-b border-black/[0.08] text-[#080D10]"
          : "bg-[#080D10]/95 border-b border-transparent text-white"
      }`}
    >
      <div className="ph-container flex h-24 items-center justify-between gap-4">
        {/* Brand Logo with Phenomenon asterisk style */}
        <div className="flex items-center gap-6 xl:gap-10 min-w-0">
          <Link href="/" className="flex items-center gap-2 group shrink-0 whitespace-nowrap">
            <span className="font-heading text-xl text-[#FF7A00] font-black leading-none select-none">
              ✱
            </span>
            <span
              className={`font-heading text-lg xl:text-xl font-bold tracking-[0.02em] transition-colors duration-300 ${
                isLight ? "text-[#080D10]" : "text-white"
              }`}
            >
              комнедвижка<span className={`ml-0.5 ${isLight ? "text-slate-400" : "text-slate-500"}`}>.нн</span>
            </span>
          </Link>

          {/* Navigation Links with Phenomenon-style Mega Dropdowns */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {/* 1. Категории Mega-Menu */}
            <div
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown("categories")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 font-heading text-[11px] xl:text-xs font-semibold uppercase tracking-[0.06em] whitespace-nowrap transition-colors ${
                  isLight
                    ? "text-[#080D10] hover:text-[#FF7A00]"
                    : "text-white hover:text-white/80"
                }`}
              >
                <span>Категории</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    activeDropdown === "categories" ? "rotate-180 text-[#FF7A00]" : "opacity-60"
                  }`}
                />
              </button>

              {activeDropdown === "categories" && (
                <div className="absolute left-0 top-[76px] w-[860px] animate-fadeIn pointer-events-auto">
                  <div className="rounded-2xl bg-white p-7 shadow-2xl border border-black/[0.06] text-[#080D10] grid grid-cols-12 gap-6">
                    {/* Col 1: Main Category Links */}
                    <div className="col-span-4 border-r border-slate-100 pr-4 space-y-2">
                      <div className="font-heading text-[11px] font-bold uppercase tracking-[2px] text-slate-400 mb-3">
                        Направления
                      </div>

                      <div
                        onClick={onOpenCatalog}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <Warehouse className="h-5 w-5 text-[#FF7A00] mt-0.5" />
                        <div>
                          <div className="font-heading text-sm font-semibold text-[#080D10] group-hover:text-[#FF7A00] transition-colors">
                            Склады и логистика
                          </div>
                          <div className="text-xs text-slate-500">Пандусы, доклевеллеры, от 8м</div>
                        </div>
                      </div>

                      <div
                        onClick={onOpenCatalog}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <Building2 className="h-5 w-5 text-[#FF7A00] mt-0.5" />
                        <div>
                          <div className="font-heading text-sm font-semibold text-[#080D10] group-hover:text-[#FF7A00] transition-colors">
                            Офисные центры
                          </div>
                          <div className="text-xs text-slate-500">Классы A / B+, подземный паркинг</div>
                        </div>
                      </div>

                      <div
                        onClick={onOpenCatalog}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <Store className="h-5 w-5 text-[#FF7A00] mt-0.5" />
                        <div>
                          <div className="font-heading text-sm font-semibold text-[#080D10] group-hover:text-[#FF7A00] transition-colors">
                            Стрит-ритейл
                          </div>
                          <div className="text-xs text-slate-500">1-я линия, витрины, пешеходный трафик</div>
                        </div>
                      </div>

                      <div
                        onClick={onOpenCatalog}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <Factory className="h-5 w-5 text-[#FF7A00] mt-0.5" />
                        <div>
                          <div className="font-heading text-sm font-semibold text-[#080D10] group-hover:text-[#FF7A00] transition-colors">
                            Производственные цеха
                          </div>
                          <div className="text-xs text-slate-500">Кран-балки, до 1.5 МВт, ж/д ветка</div>
                        </div>
                      </div>
                    </div>

                    {/* Col 2: Sub-filters / Key parameters */}
                    <div className="col-span-4 border-r border-slate-100 pr-4 space-y-2">
                      <div className="font-heading text-[11px] font-bold uppercase tracking-[2px] text-slate-400 mb-3">
                        Быстрые фильтры
                      </div>

                      <ul className="space-y-1.5 font-heading text-xs text-slate-600 font-medium">
                        <li>
                          <button onClick={onOpenCatalog} className="w-full text-left p-2 rounded-lg hover:bg-slate-50 hover:text-[#FF7A00] transition-colors flex items-center justify-between">
                            <span>Склад класса А с пандусом</span>
                            <ArrowRight className="h-3 w-3 text-slate-400" />
                          </button>
                        </li>
                        <li>
                          <button onClick={onOpenCatalog} className="w-full text-left p-2 rounded-lg hover:bg-slate-50 hover:text-[#FF7A00] transition-colors flex items-center justify-between">
                            <span>Офис в центре с паркингом</span>
                            <ArrowRight className="h-3 w-3 text-slate-400" />
                          </button>
                        </li>
                        <li>
                          <button onClick={onOpenCatalog} className="w-full text-left p-2 rounded-lg hover:bg-slate-50 hover:text-[#FF7A00] transition-colors flex items-center justify-between">
                            <span>Помещение под супермаркет</span>
                            <ArrowRight className="h-3 w-3 text-slate-400" />
                          </button>
                        </li>
                        <li>
                          <button onClick={onOpenCatalog} className="w-full text-left p-2 rounded-lg hover:bg-slate-50 hover:text-[#FF7A00] transition-colors flex items-center justify-between">
                            <span>Цех с ж/д тупиком</span>
                            <ArrowRight className="h-3 w-3 text-slate-400" />
                          </button>
                        </li>
                        <li>
                          <button onClick={onOpenCatalog} className="w-full text-left p-2 rounded-lg hover:bg-slate-50 hover:text-[#FF7A00] transition-colors flex items-center justify-between">
                            <span>ПСН на пл. Лядова / Горького</span>
                            <ArrowRight className="h-3 w-3 text-slate-400" />
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Col 3: Phenomenon Promo Banner */}
                    <div className="col-span-4 flex flex-col justify-between rounded-xl bg-slate-50 p-4 border border-slate-100">
                      <div className="space-y-2">
                        <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-slate-200">
                          <Image
                            src={assetPath("/images/properties/office.jpg")}
                            alt="Подбор под ТЗ"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-heading text-xs font-bold text-[#080D10] pt-1">
                          Индивидуальный подбор лотов
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          Бесплатная выгрузка проверенных объектов с прямыми контактами за 15 минут.
                        </p>
                      </div>

                      <button
                        onClick={onOpenCatalog}
                        className="mt-3 w-full btn btn--orange hover--dark arr !h-12 !text-xs"
                      >
                        <span><b>Подобрать объект</b></span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Районы НН Mega-Menu */}
            <div
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown("districts")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 font-heading text-[11px] xl:text-xs font-semibold uppercase tracking-[0.06em] whitespace-nowrap transition-colors ${
                  isLight
                    ? "text-[#080D10] hover:text-[#FF7A00]"
                    : "text-white hover:text-white/80"
                }`}
              >
                <span>Районы НН</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    activeDropdown === "districts" ? "rotate-180 text-[#FF7A00]" : "opacity-60"
                  }`}
                />
              </button>

              {activeDropdown === "districts" && (
                <div className="absolute left-0 top-[76px] w-[720px] animate-fadeIn pointer-events-auto">
                  <div className="rounded-2xl bg-white p-7 shadow-2xl border border-black/[0.06] text-[#080D10] grid grid-cols-2 gap-8">
                    {/* Нагорная часть */}
                    <div className="space-y-3">
                      <div className="font-heading text-[11px] font-bold uppercase tracking-[2px] text-slate-400">
                        Нагорная часть (Центр)
                      </div>
                      <div className="space-y-1">
                        <div onClick={onOpenCatalog} className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between">
                          <span className="font-heading text-xs font-semibold">Нижегородский район</span>
                          <span className="text-[10px] text-slate-400">Кремль, Б. Покровская, Горького</span>
                        </div>
                        <div onClick={onOpenCatalog} className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between">
                          <span className="font-heading text-xs font-semibold">Советский район</span>
                          <span className="text-[10px] text-slate-400">Пл. Лядова, Белинского, Ванеева</span>
                        </div>
                        <div onClick={onOpenCatalog} className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between">
                          <span className="font-heading text-xs font-semibold">Приокский район</span>
                          <span className="text-[10px] text-slate-400">Пр. Гагарина, Щербинки</span>
                        </div>
                      </div>
                    </div>

                    {/* Заречная часть */}
                    <div className="space-y-3">
                      <div className="font-heading text-[11px] font-bold uppercase tracking-[2px] text-slate-400">
                        Заречная часть (Пром & Логистика)
                      </div>
                      <div className="space-y-1">
                        <div onClick={onOpenCatalog} className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between">
                          <span className="font-heading text-xs font-semibold">Канавинский район</span>
                          <span className="text-[10px] text-slate-400">Московское шоссе, Стрелка</span>
                        </div>
                        <div onClick={onOpenCatalog} className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between">
                          <span className="font-heading text-xs font-semibold">Московский & Сормовский</span>
                          <span className="text-[10px] text-slate-400">Сормовское ш., Коминтерна</span>
                        </div>
                        <div onClick={onOpenCatalog} className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between">
                          <span className="font-heading text-xs font-semibold">Автозаводский & Ленинский</span>
                          <span className="text-[10px] text-slate-400">Пр. Ленина, ст. м. Пролетарская</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Links */}
            <button
              onClick={onOpenShowcase}
              className={`font-heading text-[11px] xl:text-xs font-semibold uppercase tracking-[0.06em] whitespace-nowrap transition-colors ${
                isLight
                  ? "text-[#080D10] hover:text-[#FF7A00]"
                  : "text-white hover:text-white/80"
              }`}
            >
              Флагманы
            </button>

            <button
              onClick={onOpenCatalog}
              className={`font-heading text-[11px] xl:text-xs font-semibold uppercase tracking-[0.06em] whitespace-nowrap transition-colors ${
                isLight
                  ? "text-[#080D10] hover:text-[#FF7A00]"
                  : "text-white hover:text-white/80"
              }`}
            >
              Каталог и карта
            </button>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Exact Phenomenon Header Button: White on dark hero, Black on light theme; Orange circle fills from center on hover */}
          <button
            onClick={onOpenCatalog}
            className={`btn arr hover--orange ${
              isLight ? "btn--dark" : "btn--white"
            }`}
          >
            <span><b>Поиск объектов</b></span>
          </button>
        </div>
      </div>
    </header>
  );
};
