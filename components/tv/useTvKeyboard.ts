"use client";

import { useEffect } from "react";
import type { ChannelNumber } from "@/lib/channels";
import { TV_CHANNEL_COUNT, isValidChannelDigit } from "@/lib/channels";

type UseTvKeyboardOptions = {
  enabled: boolean;
  isTransitioning: boolean;
  onPrevChannel: () => void;
  onNextChannel: () => void;
  onSelectChannel: (ch: ChannelNumber) => void;
  onSignalLost: () => void;
};

export function useTvKeyboard({
  enabled,
  isTransitioning,
  onPrevChannel,
  onNextChannel,
  onSelectChannel,
  onSignalLost,
}: UseTvKeyboardOptions) {
  useEffect(() => {
    if (!enabled) return;

    const onKey = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      switch (e.code) {
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          e.stopPropagation();
          onPrevChannel();
          break;
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          e.stopPropagation();
          onNextChannel();
          break;
        case "Digit0":
          e.preventDefault();
          e.stopPropagation();
          onSignalLost();
          break;
        case "Digit9":
          e.preventDefault();
          e.stopPropagation();
          onSignalLost();
          break;
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5":
        case "Digit6":
        case "Digit7":
        case "Digit8": {
          const n = Number(e.code.replace("Digit", "")) as ChannelNumber;
          if (isValidChannelDigit(n)) {
            e.preventDefault();
            e.stopPropagation();
            onSelectChannel(n);
          }
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [
    enabled,
    isTransitioning,
    onNextChannel,
    onPrevChannel,
    onSelectChannel,
    onSignalLost,
  ]);
}

export function channelIndexFromDigit(d: ChannelNumber): number {
  return d - 1;
}

export function wrapChannelIndex(i: number): number {
  return ((i % TV_CHANNEL_COUNT) + TV_CHANNEL_COUNT) % TV_CHANNEL_COUNT;
}
