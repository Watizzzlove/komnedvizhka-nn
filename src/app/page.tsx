"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ShowcaseSection } from "@/components/landing/ShowcaseSection";
import { FilterBar, FilterState } from "@/components/marketplace/FilterBar";
import { PropertyCard } from "@/components/marketplace/PropertyCard";
import { PropertyModal } from "@/components/marketplace/PropertyModal";
import { INITIAL_PROPERTIES } from "@/data/mock-properties";
import { Property, DealType } from "@/types/property";
import { Frown } from "lucide-react";

const MapPane = dynamic(
  () => import("@/components/marketplace/MapPane").then((mod) => mod.MapPane),
  { ssr: false }
);

export default function Home() {
  const [properties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [dealType, setDealType] = useState<DealType>("rent");
  const [viewMode, setViewMode] = useState<"split" | "list" | "map">("split");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [headerTheme, setHeaderTheme] = useState<"dark" | "light">("dark");
  const [showcaseUnsticky, setShowcaseUnsticky] = useState(false);

  const catalogRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<FilterState>({
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

  // Phenomenon Studio Exact Curtain Reveal + Dynamic Header Theme Switching
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-section");
      const catalog = document.getElementById("catalog");

      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        // Exact match to Phenomenon animatedSections(): unstick once Hero curtain passes top
        if (heroRect.bottom <= 0) {
          setShowcaseUnsticky(true);
        } else {
          setShowcaseUnsticky(false);
        }

        const catRect = catalog ? catalog.getBoundingClientRect() : null;
        // Switch header to light when Hero has risen past header AND Catalog hasn't reached header
        if (heroRect.bottom <= 80 && (!catRect || catRect.top > 80)) {
          setHeaderTheme("light");
        } else {
          setHeaderTheme("dark");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToShowcase = () => {
    const heroEl = document.getElementById("hero-section");
    if (heroEl) {
      window.scrollTo({
        top: heroEl.offsetTop + heroEl.offsetHeight,
        behavior: "smooth",
      });
    } else {
      document.getElementById("showcase-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      if (prop.dealType !== dealType) return false;
      if (filters.category !== "all" && prop.category !== filters.category) return false;
      if (filters.district !== "Все районы" && prop.district !== filters.district) return false;
      if (filters.metro !== "Все станции" && prop.metroStation !== filters.metro) return false;
      if (filters.minPrice && prop.priceTotal < Number(filters.minPrice)) return false;
      if (filters.maxPrice && prop.priceTotal > Number(filters.maxPrice)) return false;
      if (filters.minArea && prop.area < Number(filters.minArea)) return false;
      if (filters.maxArea && prop.area > Number(filters.maxArea)) return false;
      if (filters.verifiedOnly && !prop.verifiedOwner) return false;

      if (filters.category === "warehouse") {
        if (filters.warehouseRamp && !prop.features.hasRamp) return false;
        if (filters.warehouseRailway && !prop.features.hasRailway) return false;
        if (filters.warehouseHeating && !prop.features.heating) return false;
        if (
          filters.minCeiling &&
          (!prop.features.ceilingHeight || prop.features.ceilingHeight < Number(filters.minCeiling))
        ) {
          return false;
        }
      }

      if (filters.category === "office") {
        if (filters.officeClass !== "all" && prop.features.buildingClass !== filters.officeClass) return false;
        if (filters.officeParking && !prop.features.parkingSpaces) return false;
      }

      if (filters.category === "retail") {
        if (filters.retailFirstLine && prop.features.line !== 1) return false;
        if (filters.retailSeparateEntrance && !prop.features.separateEntrance) return false;
      }

      return true;
    });
  }, [properties, dealType, filters]);

  return (
    <div className="min-h-screen bg-[#080D10] text-white flex flex-col font-sans selection:bg-[#FF7A00] selection:text-white">
      {/* 1. Header with Dynamic Dark/Light Theme and Phenomenon Studio Mega Navigation */}
      <Header
        onOpenShowcase={scrollToShowcase}
        onOpenCatalog={scrollToCatalog}
        totalListingsCount={properties.length}
        theme={headerTheme}
      />

      {/* 2. Hero Section Curtain (Full bleed, 4K Showreel, Real Metrics, Dual Mounds Clipped Bottom) */}
      <HeroSection
        onOpenCatalog={scrollToCatalog}
        onOpenShowcase={scrollToShowcase}
        totalProperties={properties.length}
        isUnstickyFollowing={showcaseUnsticky}
      />

      {/* 3. Showcase Section (Fixed underneath Hero curtain, Light Mode #F7F8FA, Unfolding Case Cards) */}
      <ShowcaseSection
        properties={properties}
        onSelectProperty={setSelectedProperty}
        onOpenCatalog={scrollToCatalog}
        isUnsticky={showcaseUnsticky}
      />

      {/* 4. Full Interactive Catalog & Map Screen */}
      <section ref={catalogRef} id="catalog" className="relative z-[2] border-t border-white/[0.08] bg-[#080D10]">
        <div className="ph-container py-14 md:py-20">
          <div className="space-y-3">
            <span className="txt--caption-m text-slate-400">
              Поиск по городу
            </span>
            <h2 className="title--l text-white">
              Каталог и карта коммерческой недвижимости
            </h2>
          </div>
        </div>

        {/* Minimalist Filter Bar */}
        <FilterBar
          dealType={dealType}
          onDealTypeChange={setDealType}
          filters={filters}
          onChange={setFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultsCount={filteredProperties.length}
        />

        {/* Split Catalog View */}
        <div className="bg-[#080D10]">
          {viewMode === "split" && (
            <div className="ph-container flex h-[820px] overflow-hidden border-b border-white/[0.08] !px-0">
              {/* Left Column: Cards List */}
              <div className="w-full lg:w-[50%] h-full overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
                {filteredProperties.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center space-y-2">
                    <Frown className="h-10 w-10 text-slate-500" />
                    <h3 className="font-heading text-lg font-medium text-white">
                      По вашим критериям объектов не найдено
                    </h3>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {filteredProperties.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        onSelect={setSelectedProperty}
                        isHovered={hoveredPropertyId === prop.id}
                        onHover={(h) => setHoveredPropertyId(h ? prop.id : null)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Dark Interactive Map */}
              <div className="hidden lg:block lg:w-[50%] h-full border-l border-white/[0.08]">
                <MapPane
                  properties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onSelectProperty={setSelectedProperty}
                  hoveredPropertyId={hoveredPropertyId}
                  onHoverProperty={setHoveredPropertyId}
                />
              </div>
            </div>
          )}

          {viewMode === "list" && (
            <div className="ph-container py-10 border-b border-white/[0.08]">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onSelect={setSelectedProperty}
                    isHovered={hoveredPropertyId === prop.id}
                    onHover={(h) => setHoveredPropertyId(h ? prop.id : null)}
                  />
                ))}
              </div>
            </div>
          )}

          {viewMode === "map" && (
            <div className="h-[800px] w-full border-b border-white/[0.08]">
              <MapPane
                properties={filteredProperties}
                selectedProperty={selectedProperty}
                onSelectProperty={setSelectedProperty}
                hoveredPropertyId={hoveredPropertyId}
                onHoverProperty={setHoveredPropertyId}
              />
            </div>
          )}
        </div>
      </section>

      {/* 5. Footer in Phenomenon Studio Style */}
      <footer className="relative z-[2] border-t border-white/[0.08] bg-[#080D10] py-16">
        <div className="ph-container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-heading text-lg font-bold text-white flex items-center gap-1.5 justify-center md:justify-start">
              <span className="text-[#FF7A00]">✱</span>
              <span>комнедвижка.нн</span>
            </div>
            <p className="text-xs text-slate-400">
              Коммерческая недвижимость Нижнего Новгорода и области.
            </p>
          </div>

          <div className="flex items-center gap-6 font-heading text-xs font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={scrollToCatalog}>
              Каталог
            </span>
            <span className="hover:text-white cursor-pointer transition-colors" onClick={scrollToShowcase}>
              Флагманы
            </span>
          </div>

          <div className="font-heading text-xs text-slate-500">
            © 2026 КомНедвижка НН
          </div>
        </div>
      </footer>

      {/* 6. Property Detail Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
}
