"use client";

import React from "react";
import { AlertTriangle, CheckCircle2, Globe2 } from "lucide-react";
import {
  PRODUCTS,
  ProductId,
  getProductCompositeScore,
} from "@/data/benchmarkData";

interface OverviewCardsProps {
  selectedProduct: ProductId | "all";
  onSelectProduct: (id: ProductId | "all") => void;
}

function scoreTone(score: number): string {
  if (score >= 8.0) return "text-emerald-700";
  if (score >= 6.5) return "text-zinc-900";
  return "text-rose-700";
}

function barTone(score: number): string {
  if (score >= 8.0) return "bg-emerald-600";
  if (score >= 6.5) return "bg-zinc-800";
  return "bg-rose-600";
}

export function OverviewCards({
  selectedProduct,
  onSelectProduct,
}: OverviewCardsProps) {
  return (
    <section id="overview" className="scroll-mt-20">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            01 · 3-Way Overseas AI Product Benchmark
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-950">
            Executive Product Scorecards
          </h2>
        </div>
        <p className="text-xs text-zinc-500">
          Click a product card to filter recommendations below
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {PRODUCTS.map((product) => {
          const composite = getProductCompositeScore(product);
          const isSelected = selectedProduct === product.id;

          return (
            <article
              key={product.id}
              onClick={() =>
                onSelectProduct(isSelected ? "all" : product.id)
              }
              className={`group cursor-pointer rounded-xl border bg-white p-5 transition-all ${
                isSelected
                  ? "border-zinc-950 ring-1 ring-zinc-950 shadow-sm"
                  : "border-zinc-200/90 hover:border-zinc-300 hover:shadow-xs"
              }`}
            >
              {/* Top Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: product.accentHex }}
                    />
                    <h3 className="text-base font-semibold tracking-tight text-zinc-950">
                      {product.name}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-zinc-600">
                    {product.subtitle}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    Composite
                  </div>
                  <div className="font-mono text-lg font-semibold tabular-nums text-zinc-950">
                    {composite.toFixed(1)}
                    <span className="text-xs font-normal text-zinc-400">
                      /10
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Headline Metrics */}
              <div className="mt-5 grid grid-cols-3 gap-2.5 border-y border-zinc-100 py-3.5">
                {[
                  {
                    label: "Usability",
                    value: product.headlineScores.usability,
                  },
                  {
                    label: "AI Transparency",
                    value: product.headlineScores.transparency,
                  },
                  {
                    label: "Pricing Trust",
                    value: product.headlineScores.pricingTrust,
                  },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="text-[11px] text-zinc-500">
                      {metric.label}
                    </div>
                    <div
                      className={`mt-1 font-mono text-base font-semibold tabular-nums ${scoreTone(
                        metric.value
                      )}`}
                    >
                      {metric.value.toFixed(1)}
                      <span className="text-[11px] font-normal text-zinc-400">
                        /10
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className={`h-full rounded-full ${barTone(
                          metric.value
                        )}`}
                        style={{ width: `${metric.value * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Friction & Cross-Cultural Risk */}
              <div className="mt-4 space-y-2.5 text-xs leading-relaxed">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                  <p className="text-zinc-700">
                    <span className="font-semibold text-zinc-900">
                      Key Friction:{" "}
                    </span>
                    {product.keyFriction}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <p className="text-zinc-600">
                    <span className="font-medium text-zinc-800">
                      Core Edge:{" "}
                    </span>
                    {product.primaryStrength}
                  </p>
                </div>

                <div className="flex items-start gap-2 rounded-lg border border-zinc-100 bg-zinc-50/80 px-2.5 py-2">
                  <Globe2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" />
                  <p className="text-[11px] text-zinc-600">
                    <span className="font-semibold text-zinc-800">
                      Cross-Cultural Signal:{" "}
                    </span>
                    {product.crossCulturalRisk}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
