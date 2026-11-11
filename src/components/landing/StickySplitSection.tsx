"use client";

import React from "react";
import { assetPath } from "@/lib/asset-path";
import { ArrowRight, Play, CheckCircle2, Warehouse, Briefcase, Store } from "lucide-react";

export const StickySplitSection: React.FC = () => {
  return (
    <section className="relative bg-[#121A1F] py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Caption & Title */}
        <div className="space-y-4 mb-16">
          <div className="txt--caption-m color--white-secondary">
            Архитектура и логика маркетплейса
          </div>
          <h2 className="title--xl max-w-3xl">
            Сфокусирован на коммерции. Без жилого мусора.
          </h2>
          <p className="txt--lead max-w-2xl">
            Мы не превращаем поиск коммерции в доску объявлений обо всем подряд. Каждая категория получает строгий набор параметров, который действительно важен бизнесу.
          </p>
        </div>

        {/* 4-Column Grid in Phenomenon Studio Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {/* Column 1: Video / Visual Preview Card */}
          <div className="relative overflow-hidden rounded-xl bg-[#121A1F] aspect-[4/5] flex flex-col justify-between p-6 group">
            {/* Background subtle architectural photography */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('${assetPath("/images/office.svg")}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D10] via-[#080D10]/40 to-transparent" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white bg-white/[0.1] px-2.5 py-1 rounded">
                Нижний Новгород
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#080D10] transition-transform duration-300 group-hover:scale-110">
                <Play className="h-4 w-4 fill-current ml-0.5" />
              </div>
            </div>

            <div className="relative z-10 space-y-1">
              <div className="text-xs text-slate-400 font-medium">Видео-тур и обзоры</div>
              <div className="font-heading text-base font-medium text-white leading-snug">
                Осмотр складских и офисных узлов в 4K
              </div>
            </div>
          </div>

          {/* Column 2: Pillar 1 (Warehouses & Specs) */}
          <div className="flex flex-col justify-between rounded-xl bg-[#080D10] p-7 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF7A00]">
                01 • Склады и Цеха
              </span>
              <h3 className="font-heading text-xl font-medium text-white leading-snug">
                Пандусы, доклевеллеры и потолки от 8 до 14 м.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Отдельные фильтры под логистику: наличие антипылевых полов, кран-балок нужной грузоподъемности и ж/д веток.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs font-semibold uppercase tracking-[2.1px] text-slate-400 flex items-center gap-2">
              <span>Складские лоты</span>
              <ArrowRight className="h-3 w-3 text-[#FF7A00]" />
            </div>
          </div>

          {/* Column 3: Pillar 2 (Offices & Street Retail) */}
          <div className="flex flex-col justify-between rounded-xl bg-[#080D10] p-7 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF7A00]">
                02 • Офисы и Ритейл
              </span>
              <h3 className="font-heading text-xl font-medium text-white leading-snug">
                Класс здания A/B+, паркинг и витринные фасады.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Фильтрация бизнес-центров по машиноместам, системе вентиляции и этажности. Фасады на 1-й линии для флагманов.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs font-semibold uppercase tracking-[2.1px] text-slate-400 flex items-center gap-2">
              <span>Офисные блоки</span>
              <ArrowRight className="h-3 w-3 text-[#FF7A00]" />
            </div>
          </div>

          {/* Column 4: Pillar 3 (Aggregation & Deduplication) */}
          <div className="flex flex-col justify-between rounded-xl bg-[#080D10] p-7 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF7A00]">
                03 • Сбор данных
              </span>
              <h3 className="font-heading text-xl font-medium text-white leading-snug">
                Склейка дублей: радиус 90 м и площадь ±3.5%.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Слияние листингов из GiperNN, Домклик и XML-фидов. Платформа убирает повторные карточки одного и того же объекта.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs font-semibold uppercase tracking-[2.1px] text-slate-400 flex items-center gap-2">
              <span>Пайплайн сбора</span>
              <ArrowRight className="h-3 w-3 text-[#FF7A00]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
