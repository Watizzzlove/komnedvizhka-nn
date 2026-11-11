"use client";

import React from "react";
import { Play } from "lucide-react";

interface HeroSectionProps {
  onOpenCatalog: () => void;
  onOpenShowcase: () => void;
  totalProperties: number;
  isUnstickyFollowing?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCatalog,
  onOpenShowcase,
  totalProperties,
  isUnstickyFollowing = false,
}) => {
  return (
    <section
      id="hero-section"
      className={`next_block_sticky ${
        isUnstickyFollowing ? "hero-unsticky-following" : ""
      } text-white pt-32 pb-28 md:pt-44 md:pb-44`}
    >
      <div
        aria-hidden="true"
        className="hero-clipped-bottom bg-[#080D10] pointer-events-none"
      />
      <div className="ph-container relative z-10">
        {/* Caption Row with Red Dot Style Badge (Phenomenon Hero Pattern) */}
        <div className="flex flex-wrap items-center gap-4 mb-6 md:mb-8">
          <div className="txt--caption-m text-[#94A3B8]">
            Платформа коммерческой недвижимости
          </div>

          <div className="ph-badge inline-flex items-center gap-2 bg-white/[0.06] px-3.5 py-2 rounded">
            <span className="text-[#FF7A00] text-xs leading-none">●</span>
            <span className="font-heading text-xs font-semibold uppercase tracking-[1.5px] text-white">
              Нижний Новгород • 2026
            </span>
          </div>
        </div>

        {/* Hero Title (Exact Phenomenon Scale .title--xxl) */}
        <div className="max-w-[92vw] lg:max-w-[84vw] space-y-6">
          <h1 className="title--xxl text-white">
            Коммерческая недвижимость Нижнего Новгорода в едином окне.
          </h1>
        </div>

        {/* Exact Phenomenon Hero Buttons (.btn--orange hover--white & .btn--white-light hover--white) */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 md:gap-4">
          <button
            onClick={onOpenCatalog}
            className="btn btn--orange hover--white btn--lg-desk arr arr-right"
          >
            <span><b>Смотреть объекты ({totalProperties})</b></span>
          </button>

          <button
            onClick={onOpenShowcase}
            className="btn btn--white-light arr arr-right hover--white btn--lg-desk"
          >
            <span><b>Флагманские лоты</b></span>
          </button>
        </div>

        {/* 2-Column Split: Sticky 4K Showreel on Left & Editorial Copy + Numbers Grid on Right */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Sticky Video Container (Aggregator Showreel) */}
          <div className="lg:col-span-6 sticky-media-col relative rounded-2xl overflow-hidden bg-[#121A1F] aspect-[4/3] group">
            <video
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://phenomenonstudio.com/wp-content/uploads/2026/04/showreel_homepage_2_tiny-2.mp4"
              autoPlay
              playsInline
              muted
              loop
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D10]/85 via-[#080D10]/20 to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="bg-[#080D10]/80 text-white txt--caption-s px-3 py-1.5 rounded backdrop-blur-md">
                Агрегатор площадок НН • 4K Обзор
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="txt--caption-s text-[#FF7A00]">
                  Сбор данных в реальном времени
                </div>
                <div className="font-sans text-sm sm:text-base font-medium text-white leading-snug">
                  GiperNN, Домклик и XML-фиды брокеров объединяются в чистый каталог без дублей
                </div>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#080D10] transition-transform duration-300 group-hover:scale-110">
                <Play className="h-4 w-4 fill-current ml-0.5" />
              </div>
            </div>
          </div>

          {/* Right: Phenomenon Editorial Copy & Minimalist Numbers Table */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-12 pt-2">
            <div className="space-y-5">
              <p className="txt--lead text-white">
                Мы агрегируем данные со всех площадок города — склады с пандусами, офисы A/B+, стрит-ритейл и базы — чтобы вам не приходилось вручную перебирать десятки вкладок.
              </p>
              <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
                Система автоматически сопоставляет координаты, площади и кадастровые номера, склеивает дубли и проверяет собственников по данным ЕГРН.
              </p>
            </div>

            {/* Minimalist Architectural 2x2 Metrics Grid (Phenomenon values_wrap style) */}
            <div>
              <div className="txt--caption-m text-slate-400 mb-6">
                Ключевые показатели платформы
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-white/[0.08]">
                <div className="py-8 sm:pr-8 border-b sm:border-r border-white/[0.08] flex flex-col items-start justify-center space-y-2">
                  <div className="title--l text-white">100%</div>
                  <div className="font-heading text-sm font-medium text-white">Рынок НН в едином окне</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Все актуальные коммерческие лоты города без повторного мониторинга десятков сайтов
                  </div>
                </div>

                <div className="py-8 sm:pl-8 border-b border-white/[0.08] flex flex-col items-start justify-center space-y-2">
                  <div className="title--l text-[#FF7A00]">0 дублей</div>
                  <div className="font-heading text-sm font-medium text-white">Умная дедупликация</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Склейка копий по координатам и площади экономит до 4 часов на подборе объекта
                  </div>
                </div>

                <div className="py-8 sm:pr-8 border-b sm:border-b-0 sm:border-r border-white/[0.08] flex flex-col items-start justify-center space-y-2">
                  <div className="title--l text-white">ЕГРН</div>
                  <div className="font-heading text-sm font-medium text-white">Проверенные собственники</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Прямые контакты правообладателей и подтвержденная кадастровая привязка
                  </div>
                </div>

                <div className="py-8 sm:pl-8 flex flex-col items-start justify-center space-y-2">
                  <div className="title--l text-[#FF7A00]">15 станций</div>
                  <div className="font-heading text-sm font-medium text-white">Обе ветки метро НН</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Точные радиусы пешей доступности и оценка трафика рядом со входами метро
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
