"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  Terminal,
} from "lucide-react";
import {
  CHECKLIST_ITEMS,
  ChecklistItem,
  ChecklistStatus,
  PRODUCTS,
  ProductId,
} from "@/data/benchmarkData";

type CategoryFilter = "All" | ChecklistItem["category"];
type OutcomeFilter = "all" | "has_fail" | "all_pass";

const CATEGORIES: CategoryFilter[] = [
  "All",
  "AI Capability & Nuance",
  "Transparency & Grounding",
  "Interaction & Latency",
  "Pricing & Enterprise",
];

function StatusBadge({ status }: { status: ChecklistStatus }) {
  if (status === "pass") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
        Pass
      </span>
    );
  }
  if (status === "partial") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Partial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700">
      <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
      Fail
    </span>
  );
}

export function ChecklistTable() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [outcomeFilter, setOutcomeFilter] = useState<OutcomeFilter>("all");
  const [query, setQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "chk-01": true,
    "chk-04": true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    filteredItems.forEach((item) => {
      next[item.id] = true;
    });
    setExpandedIds(next);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CHECKLIST_ITEMS.filter((item) => {
      if (category !== "All" && item.category !== category) return false;

      if (outcomeFilter === "has_fail") {
        const hasFail = Object.values(item.results).some(
          (r) => r.status === "fail"
        );
        if (!hasFail) return false;
      } else if (outcomeFilter === "all_pass") {
        const allPass = Object.values(item.results).every(
          (r) => r.status === "pass"
        );
        if (!allPass) return false;
      }

      if (!q) return true;
      return (
        item.criterion.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.failureExample.scenario.toLowerCase().includes(q) ||
        item.failureExample.observedOutput.toLowerCase().includes(q) ||
        Object.values(item.results).some((r) =>
          r.note.toLowerCase().includes(q)
        )
      );
    });
  }, [category, outcomeFilter, query]);

  const tallies = useMemo(() => {
    const map: Record<ProductId, { pass: number; partial: number; fail: number }> = {
      notion: { pass: 0, partial: 0, fail: 0 },
      perplexity: { pass: 0, partial: 0, fail: 0 },
      elevenlabs: { pass: 0, partial: 0, fail: 0 },
    };
    CHECKLIST_ITEMS.forEach((item) => {
      (Object.keys(map) as ProductId[]).forEach((pid) => {
        map[pid][item.results[pid].status] += 1;
      });
    });
    return map;
  }, []);

  return (
    <section id="checklist" className="scroll-mt-20">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            03 · Granular Capability Boundary Audit
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-950">
            15-Point AI Capability &amp; UX Checklist
          </h2>
        </div>

        {/* Product Pass/Partial/Fail Summary Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {PRODUCTS.map((p) => {
            const t = tallies[p.id];
            return (
              <div
                key={p.id}
                className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px]"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: p.accentHex }}
                />
                <span className="font-semibold text-zinc-900">
                  {p.name.split(" ")[0]}
                </span>
                <span className="font-mono tabular-nums text-emerald-700">
                  {t.pass}P
                </span>
                <span className="text-zinc-300">/</span>
                <span className="font-mono tabular-nums text-amber-700">
                  {t.partial}M
                </span>
                <span className="text-zinc-300">/</span>
                <span className="font-mono tabular-nums text-rose-700">
                  {t.fail}F
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="rounded-xl border border-zinc-200/90 bg-white">
        <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  category === cat
                    ? "bg-zinc-950 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Status Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-56 sm:flex-none">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter criteria or failure logs..."
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50/70 py-1.5 pr-3 pl-8 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50/70 px-2 py-1 text-xs">
              <Filter className="h-3 w-3 text-zinc-400" />
              <select
                aria-label="Filter by outcome"
                value={outcomeFilter}
                onChange={(e) =>
                  setOutcomeFilter(e.target.value as OutcomeFilter)
                }
                className="bg-transparent pr-1 text-xs font-medium text-zinc-700 focus:outline-none"
              >
                <option value="all">All Outcomes (15)</option>
                <option value="has_fail">Contains Fail Only</option>
                <option value="all_pass">Universal Pass</option>
              </select>
            </div>

            <div className="flex items-center gap-1 text-[11px]">
              <button
                type="button"
                onClick={expandAll}
                className="rounded px-2 py-1 font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              >
                Expand all
              </button>
              <span className="text-zinc-300">|</span>
              <button
                type="button"
                onClick={collapseAll}
                className="rounded px-2 py-1 font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/80 text-[11px] font-semibold text-zinc-600">
                <th className="w-10 px-4 py-3">#</th>
                <th className="px-4 py-3">Evaluation Criterion</th>
                <th className="hidden px-4 py-3 md:table-cell">Category</th>
                {PRODUCTS.map((p) => (
                  <th key={p.id} className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: p.accentHex }}
                      />
                      {p.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-xs text-zinc-500"
                  >
                    No evaluation criteria match the active filter.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isExpanded = Boolean(expandedIds[item.id]);
                  const failProduct = PRODUCTS.find(
                    (p) => p.id === item.failureExample.productId
                  );

                  return (
                    <React.Fragment key={item.id}>
                      <tr
                        onClick={() => toggleExpand(item.id)}
                        className={`cursor-pointer transition-colors ${
                          isExpanded ? "bg-zinc-50/90" : "hover:bg-zinc-50/60"
                        }`}
                      >
                        <td className="px-4 py-3.5 font-mono text-[11px] text-zinc-400">
                          <div className="flex items-center gap-1">
                            {isExpanded ? (
                              <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                            )}
                            {String(item.index).padStart(2, "0")}
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-zinc-950">
                            {item.criterion}
                          </div>
                          <div className="mt-0.5 max-w-md text-[11px] text-zinc-500">
                            {item.description}
                          </div>
                        </td>
                        <td className="hidden px-4 py-3.5 md:table-cell">
                          <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-600">
                            {item.category}
                          </span>
                        </td>
                        {PRODUCTS.map((p) => (
                          <td
                            key={`${item.id}-${p.id}`}
                            className="px-4 py-3.5 text-center"
                          >
                            <StatusBadge status={item.results[p.id].status} />
                          </td>
                        ))}
                      </tr>

                      {isExpanded && (
                        <tr className="bg-zinc-50/70">
                          <td colSpan={6} className="px-5 pt-1 pb-4">
                            <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                              {/* Per-product concise evaluation notes */}
                              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:col-span-7">
                                {PRODUCTS.map((p) => (
                                  <div
                                    key={`note-${item.id}-${p.id}`}
                                    className="rounded-lg border border-zinc-200/80 bg-white p-3"
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-900">
                                        <span
                                          className="h-2 w-2 rounded-full"
                                          style={{
                                            backgroundColor: p.accentHex,
                                          }}
                                        />
                                        {p.name}
                                      </span>
                                      <StatusBadge
                                        status={item.results[p.id].status}
                                      />
                                    </div>
                                    <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
                                      {item.results[p.id].note}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              {/* Concrete Observed Failure Evidence */}
                              <div className="rounded-lg border border-zinc-200 bg-zinc-950 p-3.5 text-zinc-100 lg:col-span-5">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                                    <Terminal className="h-3 w-3 text-rose-400" />
                                    Observed Failure Evidence
                                  </span>
                                  {failProduct && (
                                    <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-200">
                                      {failProduct.name}
                                    </span>
                                  )}
                                </div>
                                <p className="mt-2 text-[11px] leading-relaxed text-zinc-300">
                                  <span className="font-semibold text-white">
                                    Test Case:{" "}
                                  </span>
                                  {item.failureExample.scenario}
                                </p>
                                <p className="mt-1.5 border-l-2 border-rose-500/80 pl-2.5 font-mono text-[11px] leading-relaxed text-rose-200">
                                  {item.failureExample.observedOutput}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50/50 px-5 py-2.5 text-[11px] text-zinc-500">
          <span>
            Showing{" "}
            <strong className="font-semibold text-zinc-900">
              {filteredItems.length}
            </strong>{" "}
            of {CHECKLIST_ITEMS.length} criteria
          </span>
          <span>Click any row to inspect per-product notes &amp; failure trace</span>
        </div>
      </div>
    </section>
  );
}
