"use client";

import React from "react";
import {
  ArrowRight,
  Microscope,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  PRODUCTS,
  ProductId,
  WALKTHROUGH_ITEMS,
} from "@/data/benchmarkData";

interface UsabilityWalkthroughProps {
  selectedProduct: ProductId | "all";
  onSelectProduct: (id: ProductId | "all") => void;
}

export function UsabilityWalkthrough({
  selectedProduct,
  onSelectProduct,
}: UsabilityWalkthroughProps) {
  const items =
    selectedProduct === "all"
      ? WALKTHROUGH_ITEMS
      : WALKTHROUGH_ITEMS.filter((w) => w.productId === selectedProduct);

  return (
    <section id="walkthrough" className="scroll-mt-20">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            04 · Usability Walkthrough &amp; Product Strategy
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-950">
            Redesign Recommendations (Before → After)
          </h2>
        </div>

        {/* Product Filter Tabs */}
        <div className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-zinc-200 bg-white p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => onSelectProduct("all")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedProduct === "all"
                ? "bg-zinc-950 text-white"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
            }`}
          >
            All Products ({WALKTHROUGH_ITEMS.length})
          </button>
          {PRODUCTS.map((p) => {
            const count = WALKTHROUGH_ITEMS.filter(
              (w) => w.productId === p.id
            ).length;
            const active = selectedProduct === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProduct(p.id)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: active ? "#ffffff" : p.accentHex,
                  }}
                />
                {p.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-5">
        {items.map((item) => {
          const product = PRODUCTS.find((p) => p.id === item.productId)!;

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-2xs"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 bg-zinc-50/70 px-5 py-3.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${product.badgeBg} ${product.badgeText}`}
                  >
                    {product.name}
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight text-zinc-950 sm:text-base">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-600">
                    {item.frictionArea}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase ${
                      item.severity === "Critical"
                        ? "border border-rose-200 bg-rose-50 text-rose-700"
                        : "border border-amber-200 bg-amber-50 text-amber-800"
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>
              </div>

              {/* Before -> After Visual Flow Comparison */}
              <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-11 lg:items-stretch">
                {/* BEFORE */}
                <div className="flex flex-col rounded-lg border border-rose-200/70 bg-rose-50/30 p-4 lg:col-span-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-rose-700">
                      {item.beforeState.label}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-700">
                    {item.beforeState.userExperience}
                  </p>
                  <div className="mt-3 flex-1 rounded-md border border-rose-200/80 bg-white p-3">
                    <div className="font-mono text-[10px] font-semibold text-zinc-500">
                      {item.beforeState.uiSnippetTitle}
                    </div>
                    <ul className="mt-1.5 space-y-1 font-mono text-[11px] text-zinc-700">
                      {item.beforeState.uiSnippetLines.map((line, i) => (
                        <li key={i} className="leading-snug">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow Separator */}
                <div className="flex items-center justify-center lg:col-span-1">
                  <div className="flex h-8 w-8 rotate-90 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-600 lg:rotate-0">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* AFTER */}
                <div className="flex flex-col rounded-lg border border-emerald-200/80 bg-emerald-50/30 p-4 lg:col-span-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
                      {item.afterState.label}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-700">
                    {item.afterState.userExperience}
                  </p>
                  <div className="mt-3 flex-1 rounded-md border border-emerald-200/80 bg-white p-3">
                    <div className="font-mono text-[10px] font-semibold text-emerald-800">
                      {item.afterState.uiSnippetTitle}
                    </div>
                    <ul className="mt-1.5 space-y-1 font-mono text-[11px] text-zinc-800">
                      {item.afterState.uiSnippetLines.map((line, i) => (
                        <li key={i} className="leading-snug">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Structured Analysis Footer: Root Cause / Product Fix / Impact Metric */}
              <div className="grid grid-cols-1 divide-y divide-zinc-100 border-t border-zinc-100 bg-zinc-50/40 md:grid-cols-3 md:divide-x md:divide-y-0">
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    <Microscope className="h-3.5 w-3.5 text-zinc-700" />
                    Root Cause (User Research Lens)
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-700">
                    {item.rootCause}
                  </p>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                    Actionable Product / Prompt Fix (AI PM Lens)
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-700">
                    {item.productFix}
                  </p>
                </div>

                <div className="flex flex-col justify-between bg-white p-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      Expected Impact Metric
                    </div>
                    <div className="mt-2 inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                      {item.impactMetric}
                    </div>
                  </div>
                  <p className="mt-2.5 text-[11px] leading-relaxed text-zinc-600">
                    {item.impactDetail}
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
