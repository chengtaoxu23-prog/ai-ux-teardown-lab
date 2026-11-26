"use client";

import React, { useMemo, useState } from "react";
import { ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { OverviewCards } from "@/components/OverviewCards";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { ChecklistTable } from "@/components/ChecklistTable";
import { UsabilityWalkthrough } from "@/components/UsabilityWalkthrough";
import { MarkdownModal } from "@/components/MarkdownModal";
import {
  ProductId,
  generateExecutiveSummaryMarkdown,
} from "@/data/benchmarkData";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductId | "all">(
    "all"
  );
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const summaryMarkdown = useMemo(() => generateExecutiveSummaryMarkdown(), []);

  const handleCopyMarkdown = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summaryMarkdown);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = summaryMarkdown;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setPreviewOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950">
      <Header
        copied={copied}
        onCopyMarkdown={handleCopyMarkdown}
        onOpenPreview={() => setPreviewOpen(true)}
      />

      {/* Editorial Hero Banner */}
      <div className="editorial-grid border-b border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 font-mono text-[11px] font-medium text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                INDEPENDENT UX &amp; AI EVALUATION BENCHMARK · Q4 2026
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                AI UX &amp; Capability Teardown Lab
              </h1>

              <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Comparative field evaluation of{" "}
                <span className="font-medium text-zinc-900">Notion AI</span>,{" "}
                <span className="font-medium text-zinc-900">
                  Perplexity Pro
                </span>
                , and{" "}
                <span className="font-medium text-zinc-900">ElevenLabs</span>{" "}
                across{" "}
                <strong className="font-semibold text-zinc-900">
                  Usability Friction
                </strong>
                ,{" "}
                <strong className="font-semibold text-zinc-900">
                  AI Capability Boundaries
                </strong>
                , and{" "}
                <strong className="font-semibold text-zinc-900">
                  Cross-Cultural Trust
                </strong>
                .
              </p>
            </div>

            {/* Compact Benchmark Metadata Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:w-[390px]">
              <div className="rounded-lg border border-zinc-200/90 bg-zinc-50/80 px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <SlidersHorizontal className="h-3 w-3" />
                  Dimensions
                </div>
                <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-zinc-950">
                  5 Core
                </div>
              </div>
              <div className="rounded-lg border border-zinc-200/90 bg-zinc-50/80 px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <ShieldCheck className="h-3 w-3" />
                  Audit Criteria
                </div>
                <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-zinc-950">
                  15 Tests
                </div>
              </div>
              <div className="rounded-lg border border-zinc-200/90 bg-zinc-50/80 px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <Sparkles className="h-3 w-3" />
                  UX Fixes
                </div>
                <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-zinc-950">
                  6 Specs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Report Content */}
      <main className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <OverviewCards
          selectedProduct={selectedProduct}
          onSelectProduct={setSelectedProduct}
        />

        <ComparisonMatrix />

        <ChecklistTable />

        <UsabilityWalkthrough
          selectedProduct={selectedProduct}
          onSelectProduct={setSelectedProduct}
        />
      </main>

      {/* Editorial Footer */}
      <footer className="mt-8 border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <span className="font-semibold text-zinc-900">
              AI UX &amp; Capability Teardown Lab
            </span>{" "}
            · Independent UX &amp; AI Product Benchmark (2026 Edition)
          </div>
          <div className="font-mono text-[11px] text-zinc-400">
            Methodology: Task-based heuristic teardown · Cross-lingual &amp;
            noisy-audio stress probes
          </div>
        </div>
      </footer>

      <MarkdownModal
        isOpen={previewOpen}
        markdown={summaryMarkdown}
        copied={copied}
        onClose={() => setPreviewOpen(false)}
        onCopy={handleCopyMarkdown}
      />
    </div>
  );
}
