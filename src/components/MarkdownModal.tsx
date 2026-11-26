"use client";

import React from "react";
import { Check, Copy, X } from "lucide-react";

interface MarkdownModalProps {
  isOpen: boolean;
  markdown: string;
  copied: boolean;
  onClose: () => void;
  onCopy: () => void;
}

export function MarkdownModal({
  isOpen,
  markdown,
  copied,
  onClose,
  onCopy,
}: MarkdownModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Executive Summary Markdown Export"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3.5">
          <div>
            <h3 className="text-sm font-semibold text-zinc-950">
              Executive Summary Export (Markdown)
            </h3>
            <p className="text-xs text-zinc-500">
              Ready to paste into Notion, Linear, Slack, or executive review docs
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCopy}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-950 text-white hover:bg-zinc-800"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy Markdown
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto bg-zinc-50 p-5">
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-zinc-800">
            {markdown}
          </pre>
        </div>
      </div>
    </div>
  );
}
