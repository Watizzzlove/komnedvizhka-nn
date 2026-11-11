"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Property } from "@/types/property";
import { formatPrice, formatNumber } from "@/lib/utils";
import { assetPath } from "@/lib/asset-path";
import {
  X,
  MapPin,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [booked, setBooked] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("2026-11-12");
  const [bookingTime, setBookingTime] = useState("14:00");
  const overlayRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!property) return;
    setPhotoIndex(0);
    setBooked(false);
    if (overlayRef.current) {
      overlayRef.current.scrollTop = 0;
    }
  }, [property]);

  useEffect(() => {
    if (!property) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [property !== null]);

  if (!property) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % property.photos.length);
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + property.photos.length) % property.photos.length);
  };

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-sm animate-fadeIn"
    >
      <div className="flex min-h-full justify-center p-4 sm:p-8">
        <div
          className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-[#121A1F] shadow-2xl text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть карточку"
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#080D10]"
          >
            <X className="h-5 w-5" />
          </button>

          <div>
            {/* Gallery Header */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#080D10]">
            <Image
              src={assetPath(property.photos[photoIndex] || property.photos[0])}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />

            {property.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/90"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/90"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="absolute left-4 top-4 flex items-center gap-2 font-heading">
              <span className="rounded bg-[#080D10]/80 px-2.5 py-1 text-xs font-semibold uppercase text-white backdrop-blur-md">
                {property.source}
              </span>
              {property.verifiedOwner && (
                <span className="rounded bg-emerald-500/90 px-2.5 py-1 text-xs font-semibold uppercase text-white backdrop-blur-md">
                  Проверено собственником
                </span>
              )}
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-7">
            {/* Title, Address & Price */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between border-b border-white/[0.08] pb-6">
              <div className="space-y-2">
                <span className="font-heading rounded bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase text-[#FF7A00]">
                  {property.category === "warehouse" && "Складской комплекс"}
                  {property.category === "office" && "Офисное помещение"}
                  {property.category === "retail" && "Торговая площадь"}
                  {property.category === "manufacturing" && "Производство"}
                  {property.category === "land" && "Земля"}
                  {property.category === "free_purpose" && "Свободное назначение"}
                  {" • "}{property.dealType === "rent" ? "Аренда" : "Продажа"}
                </span>

                <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl leading-snug">
                  {property.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-[#FF7A00]" />
                    <span>{property.address}</span>
                  </span>
                  {property.metroStation && (
                    <span className="font-heading text-white">
                      • ст. м. {property.metroStation} ({property.metroDistanceMin} мин)
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="flex sm:flex-col sm:items-end justify-between bg-[#0E151A] p-4 rounded-xl shrink-0">
                <div className="font-heading text-2xl font-bold text-white">
                  {formatPrice(property.priceTotal)}
                  <span className="text-xs font-normal text-slate-400">
                    {property.dealType === "rent" ? " / мес" : ""}
                  </span>
                </div>
                <div className="font-heading text-xs font-semibold text-[#FF7A00] mt-1">
                  {formatPrice(property.pricePerSqm)} / м²
                </div>
                <div className="font-heading text-xs text-slate-300 mt-2">
                  Площадь: {formatNumber(property.area)} м²
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="font-heading text-base font-semibold text-white mb-3">
                Характеристики помещения
              </h3>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 text-xs">
                <div className="rounded-lg bg-[#0E151A] p-3">
                  <span className="text-slate-400 block text-[11px]">Площадь</span>
                  <span className="font-heading text-base font-bold text-white">{formatNumber(property.area)} м²</span>
                </div>

                {property.features.ceilingHeight && (
                  <div className="rounded-lg bg-[#0E151A] p-3">
                    <span className="text-slate-400 block text-[11px]">Высота потолков</span>
                    <span className="font-heading text-base font-bold text-white">{property.features.ceilingHeight} м</span>
                  </div>
                )}

                {property.features.buildingClass && (
                  <div className="rounded-lg bg-[#0E151A] p-3">
                    <span className="text-slate-400 block text-[11px]">Класс здания</span>
                    <span className="font-heading text-base font-bold text-white">Класс {property.features.buildingClass}</span>
                  </div>
                )}

                {property.features.powerKw && (
                  <div className="rounded-lg bg-[#0E151A] p-3">
                    <span className="text-slate-400 block text-[11px]">Эл. мощность</span>
                    <span className="font-heading text-base font-bold text-white">{property.features.powerKw} кВт</span>
                  </div>
                )}

                {property.features.hasRamp !== undefined && (
                  <div className="rounded-lg bg-[#0E151A] p-3">
                    <span className="text-slate-400 block text-[11px]">Пандус / Док</span>
                    <span className="font-heading text-base font-bold text-white">{property.features.hasRamp ? "Есть" : "Нет"}</span>
                  </div>
                )}

                {property.features.hasRailway !== undefined && (
                  <div className="rounded-lg bg-[#0E151A] p-3">
                    <span className="text-slate-400 block text-[11px]">Ж/Д ветка</span>
                    <span className="font-heading text-base font-bold text-white">{property.features.hasRailway ? "Есть" : "Нет"}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h3 className="font-heading text-base font-semibold text-white">
                Описание объекта
              </h3>
              <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Booking Form in Exact Phenomenon Style */}
            <div className="rounded-xl bg-[#0E151A] p-6">
              {booked ? (
                <div className="flex flex-col items-center justify-center py-4 text-center space-y-2 animate-fadeIn">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  <h4 className="font-heading text-lg font-bold text-white">
                    Заявка на просмотр отправлена!
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md">
                    Встреча назначена на {bookingDate} в {bookingTime}. Собственник свяжется с вами по номеру {userPhone}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#FF7A00]" />
                    <h4 className="font-heading text-base font-bold text-white">
                      Записаться на просмотр
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-4 text-xs">
                    <div>
                      <label className="font-heading text-[11px] text-slate-400 block mb-1">Дата</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full rounded-lg bg-[#162027] px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-heading text-[11px] text-slate-400 block mb-1">Время</label>
                      <input
                        type="time"
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full rounded-lg bg-[#162027] px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-heading text-[11px] text-slate-400 block mb-1">Имя</label>
                      <input
                        type="text"
                        placeholder="Константин"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full rounded-lg bg-[#162027] px-3 py-2 text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-heading text-[11px] text-slate-400 block mb-1">Телефон</label>
                      <input
                        type="tel"
                        placeholder="+7 (900) 000-00-00"
                        required
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full rounded-lg bg-[#162027] px-3 py-2 text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn--orange hover--white arr w-full !h-12 !text-xs mt-2"
                  >
                    <span><b>Подтвердить запись на просмотр</b></span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
