"use client";

import { useEffect, type RefObject } from "react";

/** Lets a mouse drag a horizontal scroll container; touch keeps native swipe. */
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startX = 0;
    let startLeft = 0;
    let pointerId: number | null = null;
    let moved = false;

    const handleDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if ((event.target as HTMLElement).closest("iframe, video, input")) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startLeft = element.scrollLeft;
      moved = false;
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const delta = event.clientX - startX;
      if (!moved && Math.abs(delta) < 4) return;
      if (!moved) {
        moved = true;
        element.setPointerCapture(event.pointerId);
        element.dataset.dragging = "true";
      }
      element.scrollLeft = startLeft - delta;
    };

    const handleUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      delete element.dataset.dragging;
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    };

    const handleClick = (event: MouseEvent) => {
      if (!moved) return;
      moved = false;
      event.preventDefault();
      event.stopPropagation();
    };

    const preventImageDrag = (event: DragEvent) => event.preventDefault();

    element.addEventListener("pointerdown", handleDown);
    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerup", handleUp);
    element.addEventListener("pointercancel", handleUp);
    element.addEventListener("click", handleClick, true);
    element.addEventListener("dragstart", preventImageDrag);

    return () => {
      element.removeEventListener("pointerdown", handleDown);
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerup", handleUp);
      element.removeEventListener("pointercancel", handleUp);
      element.removeEventListener("click", handleClick, true);
      element.removeEventListener("dragstart", preventImageDrag);
    };
  }, [ref]);
}
