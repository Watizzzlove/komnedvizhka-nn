"use client";

import React, { useState } from "react";
import {
  X,
  RefreshCw,
  CheckCircle2,
  Database,
  Globe,
  FileCode2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Property } from "@/types/property";

interface SyncDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete: (newProperties: Property[], duplicatesCount: number) => void;
  totalPropertiesCount: number;
}

export const SyncDrawer: React.FC<SyncDrawerProps> = ({
  isOpen,
  onClose,
  onSyncComplete,
  totalPropertiesCount,
}) => {
  const [syncing, setSyncing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [syncDone, setSyncDone] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const [dupCount, setDupCount] = useState(0);

  if (!isOpen) return null;

  const handleStartSync = async () => {
    setSyncing(true);
    setSyncDone(false);
    setLogs([]);

    const logMessages = [
      "Инициализация пайплайна агрегации Нижнего Новгорода...",
      "1/4 [GiperNN]: Подключение к каталогу коммерческой недвижимости gipernn.ru...",
      "1/4 [GiperNN]: Извлечено 4 актуальных листинга (склады в Сормово, ритейл на Белинского).",
      "2/4 [Домклик API]: Запрос к гео-эндпоинту commercial search (полигон НН 56.32, 43.99)...",
      "2/4 [Домклик API]: Получено 3 проверенных объекта от юрлиц (БЦ «Чайка», склад на Кузбасской).",
      "3/4 [XML-фид Яндекс.Недвижимость]: Загрузка фида агентства «Монолит»...",
      "3/4 [XML-фид]: Валидация XML-тегов <realty-offer>, извлечено 3 объекта.",
      "4/4 [Дедупликация]: Сравнение гео-координат (< 90м), адресов и площадей (±3.5%)...",
      "4/4 [Дедупликация]: Обнаружен дубль склада на Московском шоссе (GiperNN ↔ XML-фид). Карточки объединены.",
      "4/4 [Дедупликация]: Обнаружен дубль офиса на Максима Горького (Домклик ↔ GiperNN). Карточки объединены.",
      "Завершено: нормализовано и добавлено в витрину.",
    ];

    for (let i = 0; i < logMessages.length; i++) {
      await new Promise((res) => setTimeout(res, 300));
      setLogs((prev) => [...prev, logMessages[i]]);
    }

    const extraBatch: Property[] = [
      {
        id: "sync-wh-11",
        title: "Сухой складской блок 850 м² с рампой (ст. Варя)",
        description: "Отапливаемый склад в логистическом комплексе у Сормовского шоссе. Рабочая высота 8.2 м, беспылевой пол 5 т/м², трое подъемных ворот с пандусом, офисно-бытовой блок 60 м².",
        dealType: "rent",
        category: "warehouse",
        priceTotal: 595000,
        pricePerSqm: 700,
        area: 850,
        address: "г. Нижний Новгород, ул. Коминтерна, 11к2",
        district: "Сормовский",
        metroStation: "Буревестник",
        metroDistanceMin: 11,
        coordinates: { lat: 56.3421, lng: 43.8895 },
        photos: [
          "/images/warehouse.svg",
          "/images/warehouse.svg"
        ],
        features: {
          ceilingHeight: 8.2,
          hasRamp: true,
          heating: true,
          powerKw: 150,
          floorType: "Топпинг",
        },
        source: "GiperNN",
        sourceUrl: "https://gipernn.ru/sync-11",
        verifiedOwner: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "sync-off-12",
        title: "Офис 175 м² в БЦ «Чайка» с видом на Оку",
        description: "Панорамный видовой офис на пр. Ленина с готовым премиальным ремонтом. 4 кабинета, переговорная, зона ресепшн. В 3 минутах от метро Ленинская, развитая инфраструктура, кафе на 1 этаже.",
        dealType: "rent",
        category: "office",
        priceTotal: 192500,
        pricePerSqm: 1100,
        area: 175,
        address: "г. Нижний Новгород, пр. Ленина, 27",
        district: "Ленинский",
        metroStation: "Ленинская",
        metroDistanceMin: 3,
        coordinates: { lat: 56.2985, lng: 43.9325 },
        photos: [
          "/images/office.svg",
          "/images/office.svg"
        ],
        features: {
          buildingClass: "B+",
          parkingSpaces: 4,
          floor: 6,
          totalFloors: 10,
          hasVentilation: true,
        },
        source: "Domclick",
        sourceUrl: "https://domclick.ru/commercial/sync-12",
        verifiedOwner: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "sync-ret-13",
        title: "Торговая площадь 95 м² на ул. Белинского (угол с Ванеева)",
        description: "Высокий автомобильный и пешеходный трафик. Первая линия, отдельный вход с перекрестка, большие витринные окна, мощность 40 кВт. Соседство с сетевыми ритейлерами.",
        dealType: "rent",
        category: "retail",
        priceTotal: 237500,
        pricePerSqm: 2500,
        area: 95,
        address: "г. Нижний Новгород, ул. Белинского, 61",
        district: "Советский",
        metroStation: "Горьковская",
        metroDistanceMin: 12,
        coordinates: { lat: 56.3138, lng: 44.0152 },
        photos: [
          "/images/retail.svg"
        ],
        features: {
          line: 1,
          separateEntrance: true,
          displayWindows: true,
          wetPoints: 2,
          powerKw: 40,
        },
        source: "XML-Feed",
        sourceUrl: "https://monolit.ru/feed/sync-13",
        verifiedOwner: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];

    setNewCount(extraBatch.length);
    setDupCount(2);
    setSyncing(false);
    setSyncDone(true);
    onSyncComplete(extraBatch, 2);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-end bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-xl flex-col bg-[#0E151A] border-l border-white/10 shadow-2xl text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FF7A00]">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-black text-white">
                Агрегация и Дедупликация
              </h3>
              <p className="text-xs text-slate-400">
                Нижний Новгород • 3 источника данных
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-white transition-all hover:bg-white hover:text-[#080D10]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Active Sources */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-black uppercase tracking-wider text-slate-400">
              Подключенные каналы (3)
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#121A1F] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-[#FF7A00]">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-heading text-sm font-bold text-white">
                      GiperNN (ГиперНН)
                    </h5>
                    <p className="text-xs text-slate-400">
                      Главный портал недвижимости НН • HTML Parser
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-heading text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Активен
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#121A1F] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-heading text-sm font-bold text-white">
                      Домклик API (Сбер)
                    </h5>
                    <p className="text-xs text-slate-400">
                      REST Geo API • Проверенные лоты юрлиц
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-heading text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Активен
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#121A1F] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                    <FileCode2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-heading text-sm font-bold text-white">
                      XML-фиды агентств НН
                    </h5>
                    <p className="text-xs text-slate-400">
                      Формат Яндекс.Недвижимость / Циан XML
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-heading text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Активен
                </span>
              </div>
            </div>
          </div>

          {/* Trigger Button */}
          <button
            onClick={handleStartSync}
            disabled={syncing}
            className={`btn btn--orange hover--white arr w-full !h-14 ${
              syncing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <RefreshCw className={`h-4 w-4 relative z-[2] ${syncing ? "animate-spin" : ""}`} />
            <span><b>{syncing ? "Идет сбор и дедупликация..." : "Запустить сбор и дедупликацию"}</b></span>
          </button>

          {/* Logs Terminal */}
          {logs.length > 0 && (
            <div className="space-y-2">
              <span className="font-heading text-[10px] font-black uppercase tracking-wider text-slate-400">
                Терминал конвейера сбора:
              </span>
              <div className="max-h-56 overflow-y-auto rounded-2xl bg-[#06090C] border border-white/10 p-4 font-mono text-[11px] text-emerald-400 space-y-1.5">
                {logs.map((log, idx) => (
                  <div key={idx} className="leading-snug">
                    <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sync Finished Result */}
          {syncDone && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span>Синхронизация завершена успешно!</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-[#0E151A] p-3 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Добавлено новых</span>
                  <span className="font-heading font-black text-lg text-emerald-400">+{newCount} объекта</span>
                </div>
                <div className="rounded-xl bg-[#0E151A] p-3 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Склеено дублей</span>
                  <span className="font-heading font-black text-lg text-[#FF7A00]">{dupCount} дубля</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
