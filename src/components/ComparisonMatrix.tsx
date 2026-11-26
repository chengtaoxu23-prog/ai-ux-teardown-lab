"use client";

import React, { useState } from "react";
import { BarChart3, Radar } from "lucide-react";
import {
  DIMENSIONS,
  DimensionKey,
  PRODUCTS,
  ProductId,
  getProductCompositeScore,
} from "@/data/benchmarkData";

export function ComparisonMatrix() {
  const [chartMode, setChartMode] = useState<"radar" | "bar">("radar");
  const [visibleProducts, setVisibleProducts] = useState<
    Record<ProductId, boolean>
  >({
    notion: true,
    perplexity: true,
    elevenlabs: true,
  });
  const [hoveredDimension, setHoveredDimension] =
    useState<DimensionKey | null>(null);

  const toggleProduct = (id: ProductId) => {
    const activeCount = Object.values(visibleProducts).filter(Boolean).length;
    if (visibleProducts[id] && activeCount === 1) return;
    setVisibleProducts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Radar SVG geometry
  const size = 340;
  const center = size / 2;
  const maxRadius = 116;
  const rings = [2, 4, 6, 8, 10];
  const angleStep = (Math.PI * 2) / DIMENSIONS.length;

  const getPoint = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 10) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getPolygonPoints = (productScores: Record<DimensionKey, number>) => {
    return DIMENSIONS.map((dim, idx) => {
      const pt = getPoint(idx, productScores[dim.key]);
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    }).join(" ");
  };

  return (
    <section id="matrix" className="scroll-mt-20">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            02 · Multi-Dimensional Evaluation
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-950">
            Executive Comparison Matrix &amp; Capability Profile
          </h2>
        </div>

        {/* Chart Mode Toggle */}
        <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => setChartMode("radar")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              chartMode === "radar"
                ? "bg-zinc-950 text-white"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <Radar className="h-3.5 w-3.5" />
            Radar View
          </button>
          <button
            type="button"
            onClick={() => setChartMode("bar")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              chartMode === "bar"
                ? "bg-zinc-950 text-white"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Bar Comparison
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Left: Interactive Radar / Bar Chart Card */}
        <div className="flex flex-col rounded-xl border border-zinc-200/90 bg-white p-5 xl:col-span-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">
                5-Dimension Capability Footprint
              </h3>
              <p className="text-[11px] text-zinc-500">
                Scale 0–10 (higher = lower friction &amp; stronger trust)
              </p>
            </div>
          </div>

          {/* Product Legend Toggles */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {PRODUCTS.map((p) => {
              const active = visibleProducts[p.id];
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggleProduct(p.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${
                    active
                      ? "border-zinc-300 bg-zinc-50 text-zinc-900"
                      : "border-zinc-200 bg-white text-zinc-400 opacity-60"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: p.accentHex }}
                  />
                  {p.name}
                </button>
              );
            })}
          </div>

          {/* Chart Body */}
          <div className="mt-4 flex flex-1 flex-col items-center justify-center">
            {chartMode === "radar" ? (
              <div className="w-full max-w-[360px]">
                <svg
                  viewBox={`0 0 ${size} ${size}`}
                  className="h-auto w-full overflow-visible"
                  role="img"
                  aria-label="5-Dimension Radar Chart comparing Notion AI, Perplexity Pro, and ElevenLabs"
                >
                  {/* Concentric pentagons */}
                  {rings.map((ring) => {
                    const pts = DIMENSIONS.map((_, idx) => {
                      const pt = getPoint(idx, ring);
                      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
                    }).join(" ");
                    return (
                      <polygon
                        key={ring}
                        points={pts}
                        fill="none"
                        stroke={ring === 10 ? "#d4d4d8" : "#e4e4e7"}
                        strokeWidth={ring === 10 ? 1.2 : 0.8}
                        strokeDasharray={ring === 10 ? undefined : "2 2"}
                      />
                    );
                  })}

                  {/* Spokes */}
                  {DIMENSIONS.map((dim, idx) => {
                    const outer = getPoint(idx, 10);
                    const isHovered = hoveredDimension === dim.key;
                    return (
                      <line
                        key={dim.key}
                        x1={center}
                        y1={center}
                        x2={outer.x}
                        y2={outer.y}
                        stroke={isHovered ? "#18181b" : "#e4e4e7"}
                        strokeWidth={isHovered ? 1.5 : 0.9}
                      />
                    );
                  })}

                  {/* Ring scale numbers */}
                  {[4, 8, 10].map((val) => (
                    <text
                      key={val}
                      x={center + 4}
                      y={center - (val / 10) * maxRadius + 3}
                      className="fill-zinc-400 font-mono text-[9px]"
                    >
                      {val}
                    </text>
                  ))}

                  {/* Product Polygons */}
                  {PRODUCTS.map((product) => {
                    if (!visibleProducts[product.id]) return null;
                    return (
                      <g key={product.id}>
                        <polygon
                          points={getPolygonPoints(product.dimensionScores)}
                          fill={product.accentHex}
                          fillOpacity={0.11}
                          stroke={product.accentHex}
                          strokeWidth={2}
                          strokeLinejoin="round"
                        />
                        {DIMENSIONS.map((dim, idx) => {
                          const pt = getPoint(
                            idx,
                            product.dimensionScores[dim.key]
                          );
                          return (
                            <circle
                              key={`${product.id}-${dim.key}`}
                              cx={pt.x}
                              cy={pt.y}
                              r={hoveredDimension === dim.key ? 4.5 : 3}
                              fill="#ffffff"
                              stroke={product.accentHex}
                              strokeWidth={2}
                            />
                          );
                        })}
                      </g>
                    );
                  })}

                  {/* Axis Labels */}
                  {DIMENSIONS.map((dim, idx) => {
                    const labelPt = getPoint(idx, 12.1);
                    const isHovered = hoveredDimension === dim.key;
                    const anchor =
                      Math.abs(labelPt.x - center) < 12
                        ? "middle"
                        : labelPt.x > center
                        ? "start"
                        : "end";

                    return (
                      <text
                        key={`lbl-${dim.key}`}
                        x={labelPt.x}
                        y={labelPt.y}
                        textAnchor={anchor}
                        dominantBaseline="middle"
                        onMouseEnter={() => setHoveredDimension(dim.key)}
                        onMouseLeave={() => setHoveredDimension(null)}
                        className={`cursor-pointer text-[11px] font-medium transition-colors ${
                          isHovered ? "fill-zinc-950 font-semibold" : "fill-zinc-600"
                        }`}
                      >
                        {dim.shortLabel}
                      </text>
                    );
                  })}
                </svg>
              </div>
            ) : (
              <div className="w-full space-y-4 py-1">
                {DIMENSIONS.map((dim) => (
                  <div
                    key={dim.key}
                    onMouseEnter={() => setHoveredDimension(dim.key)}
                    onMouseLeave={() => setHoveredDimension(null)}
                    className="rounded-lg p-1.5 transition-colors hover:bg-zinc-50"
                  >
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-900">
                        {dim.label}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {PRODUCTS.map((product) => {
                        if (!visibleProducts[product.id]) return null;
                        const score = product.dimensionScores[dim.key];
                        return (
                          <div
                            key={`${dim.key}-${product.id}`}
                            className="flex items-center gap-2.5"
                          >
                            <span className="w-24 shrink-0 truncate text-[11px] text-zinc-500">
                              {product.name}
                            </span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100">
                              <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${score * 10}%`,
                                  backgroundColor: product.accentHex,
                                }}
                              />
                            </div>
                            <span className="w-8 text-right font-mono text-[11px] font-semibold tabular-nums text-zinc-800">
                              {score.toFixed(1)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Dimension Callout */}
          <div className="mt-3 rounded-lg border border-zinc-100 bg-zinc-50/80 px-3 py-2 text-[11px] text-zinc-600">
            {hoveredDimension ? (
              <>
                <span className="font-semibold text-zinc-900">
                  {DIMENSIONS.find((d) => d.key === hoveredDimension)?.label}:{" "}
                </span>
                {
                  DIMENSIONS.find((d) => d.key === hoveredDimension)
                    ?.description
                }
              </>
            ) : (
              <span>
                Hover any dimension axis or matrix row to inspect evaluation
                criteria and spread across products.
              </span>
            )}
          </div>
        </div>

        {/* Right: Structured Executive Comparison Matrix */}
        <div className="overflow-hidden rounded-xl border border-zinc-200/90 bg-white xl:col-span-7">
          <div className="border-b border-zinc-100 px-5 py-3.5">
            <h3 className="text-sm font-semibold text-zinc-950">
              Side-by-Side Benchmark Matrix
            </h3>
            <p className="text-[11px] text-zinc-500">
              Direct score comparison across all 5 evaluation dimensions and
              executive trust indices
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/70 text-[11px] font-semibold text-zinc-600">
                  <th className="px-5 py-3">Evaluation Dimension</th>
                  {PRODUCTS.map((p) => (
                    <th key={p.id} className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: p.accentHex }}
                        />
                        {p.name}
                      </span>
                    </th>
                  ))}
                  <th className="hidden px-4 py-3 text-right sm:table-cell">
                    Leader
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {DIMENSIONS.map((dim) => {
                  const scores = PRODUCTS.map((p) => ({
                    product: p,
                    score: p.dimensionScores[dim.key],
                  }));
                  const maxScore = Math.max(...scores.map((s) => s.score));
                  const leader = scores.find((s) => s.score === maxScore)!
                    .product;
                  const isHighlighted = hoveredDimension === dim.key;

                  return (
                    <tr
                      key={dim.key}
                      onMouseEnter={() => setHoveredDimension(dim.key)}
                      onMouseLeave={() => setHoveredDimension(null)}
                      className={`transition-colors ${
                        isHighlighted ? "bg-zinc-50" : "hover:bg-zinc-50/60"
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-zinc-900">
                          {dim.label}
                        </div>
                        <div className="mt-0.5 max-w-xs text-[11px] text-zinc-500">
                          {dim.description}
                        </div>
                      </td>
                      {PRODUCTS.map((p) => {
                        const val = p.dimensionScores[dim.key];
                        const isBest = val === maxScore;
                        const isLow = val < 5.0;
                        return (
                          <td
                            key={`${dim.key}-${p.id}`}
                            className="px-4 py-3.5 text-right font-mono tabular-nums"
                          >
                            <span
                              className={`inline-flex items-center justify-end rounded-md px-2 py-0.5 text-xs font-semibold ${
                                isLow
                                  ? "bg-rose-50 text-rose-700"
                                  : isBest
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "text-zinc-800"
                              }`}
                            >
                              {val.toFixed(1)}
                            </span>
                          </td>
                        );
                      })}
                      <td className="hidden px-4 py-3.5 text-right sm:table-cell">
                        <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-700">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: leader.accentHex }}
                          />
                          {leader.name.split(" ")[0]}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {/* Composite Row */}
                <tr className="border-t-2 border-zinc-200 bg-zinc-50/90 font-semibold">
                  <td className="px-5 py-3.5 text-zinc-950">
                    5-Dimension Composite Index
                  </td>
                  {PRODUCTS.map((p) => (
                    <td
                      key={`comp-${p.id}`}
                      className="px-4 py-3.5 text-right font-mono text-sm tabular-nums text-zinc-950"
                    >
                      {getProductCompositeScore(p).toFixed(1)}
                      <span className="text-[11px] font-normal text-zinc-400">
                        /10
                      </span>
                    </td>
                  ))}
                  <td className="hidden px-4 py-3.5 text-right sm:table-cell">
                    <span className="rounded-full bg-teal-600 px-2.5 py-0.5 text-[11px] font-medium text-white">
                      Perplexity
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
