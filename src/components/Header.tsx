"use client";

import React from "react";
import { Check, Copy, FileText, Layers } from "lucide-react";

interface HeaderProps {
  copied: boolean;
  onCopyMarkdown: () => void;
  onOpenPreview: () => void;
}

const NAV_LINKS = [
  { href: "#overview", label: "Scorecards" },
  { href: "#matrix", label: "Comparison Matrix" },
  { href: "#checklist", label: "15-Point Audit" },
  { href: "#walkthrough", label: "Before → After" },
];

export function Header({
  copied,
  onCopyMarkdown,
  onOpenPreview,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/90 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white shadow-xs">
            <Layers className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-zinc-950">
                AI UX &amp; Capability Teardown Lab
              </span>
              <span className="hidden rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-600 sm:inline-block">
                2026 BENCHMARK
              </span>
            </div>
            <p className="hidden text-xs text-zinc-500 md:block">
              Independent UX &amp; AI Evaluation Benchmark
            </p>
          </div>
        </div>

        <nav
          aria-label="Report sections"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPreview}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
            title="Preview Executive Summary Markdown"
          >
            <FileText className="h-3.5 w-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Preview MD</span>
          </button>

          <button
            type="button"
            onClick={onCopyMarkdown}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              copied
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-zinc-950 text-white shadow-xs hover:bg-zinc-800"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied Markdown</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Executive Summary (Markdown)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
