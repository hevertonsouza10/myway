"use client";

import { useRef } from "react";
import { useDragScroll } from "@/lib/use-drag-scroll";

type HorizontalPhotoRailProps = { children: React.ReactNode };

export function HorizontalPhotoRail({ children }: HorizontalPhotoRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  useDragScroll(railRef);

  return (
    <div className="training-photo-scroll">
      <div ref={railRef} className="training-photo-carousel" tabIndex={0} aria-label="Galeria de fotos do treinamento Performa">
        {children}
      </div>
    </div>
  );
}
